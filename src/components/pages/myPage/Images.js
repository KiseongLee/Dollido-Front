import { useState } from 'react'
import axios from 'axios'
import { ServerName } from "../../../serverName";
import { s3Domain } from "../../../s3Domain";
import styled from "styled-components";
import { useSelector } from 'react-redux';


import './Images.css'

const FlexContainer = styled.div`
  font-family: koverwatch;
`

async function postImage({image, token}) {
  const formData = new FormData();
  formData.append("image", image);
  console.log(image)
  console.log(formData)
  const result = await axios.post(`${ServerName}/api/gifs/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;",
      "ACCEPT": "*/*",
      "Access-Control-Allow-Origin": "*",
      token: token
    },
  });
  console.log(result)
  return result.data
}


function Images() {
  const token = useSelector((state) => ({
    token: state.member.member.tokenInfo.token
  }));
  const membersState = useSelector((state) => (state.member));
  const myGIF = membersState.member.user_gif;
  const [file, setFile] = useState("")
  const [images, setImages] = useState([])

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, token: token.token})
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    console.log(file)
    setFile(file)
	}

  return (
    <div className="App">
      <FlexContainer>
        <h2>나의 비장의 무기</h2>
        <img src={`${s3Domain}${myGIF}`}></img>
        <form onSubmit={submit}>
          <input onChange={fileSelected} type="file" accept="image/*"/>
          <button type="submit">Submit</button>
        </form>
      </FlexContainer>
    </div>
  );
}

export default Images;
