import { useState } from 'react'
import axios from 'axios'
import { ServerName } from "../../../serverName";
import { s3Domain } from "../../../s3Domain";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { setUserGif } from "../../../modules/member";
import Button3 from "../../common/Button3.js";
import Base from "../../../images/base.jpg";

import './Images.css'

const App = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const FlexContainer1 = styled.div `
  display: flex;
  flex: 1;
  margin: 15px;
  justify-content: center;
`
const FlexContainer2 = styled.div `
  display: flex;
  justify-content: space-around;
`

const Content = styled.div `
  width: 100%;
  max-height: 50vh;
  display: flex;
  justify-content: center;
`

const LabelStyle = styled.label`
  display:inline-block;
  min-width: 140px;
  padding: 0px 3px ;
  border: 3px solid transparent;
  background-color: green;
  box-shadow: 0px 0px 3px #ffd200;
  -webkit-appearance:none;
  font-size: 30px;
  min-height: 15px;
  text-align: center;
  width: 25%;
  line-height:30px;
  margin-right: 30px;
  text-transform:uppercase;
  color:white;
  text-shadow:0px 0px 2px white;
  padding: 5px;
  cursor: pointer;

  transition: opacity 0.2s ease-out, border 0.2s ease-out;

  &:hover {
      opacity:1;
      border:3px solid white;
  }
`

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 400px;
  margin: 0;
  border-radius: 20px;
`

async function postImage({ image, token }) {
  const formData = new FormData();
  formData.append("image", image);
  // console.log(image)
  // console.log(formData)
  const result = await axios.post(`${ServerName}/api/gifs/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data;",
      "ACCEPT": "*/*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Max-Age": "8000",
      token: token
    },
  });
  // console.log(result)
  return result.data
}


function Images() {
  const dispatch = useDispatch();

  const token = useSelector((state) => ({
    token: state.member.member.tokenInfo.token
  }));
  const membersState = useSelector((state) => (state.member));
  const myGIF = membersState.user_gif;
  const [file, setFile] = useState("")
  const [images, setImages] = useState([])
  const [previewImg, setPreviewImg] = useState(null);

  const submit = async event => {
    event.preventDefault()
    alert("제출 완료!");
    const result = await postImage({ image: file, token: token.token });
    console.log(result.imagePath);
    dispatch(setUserGif(result.imagePath));
    setImages([result.image, ...images])
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    insertImg(event);
    // console.log(file);
    setFile(file);
    // console.log(file);
  }

  const insertImg = event => {
    const img = event.target.files[0]
    console.log(img)
    let reader = new FileReader()
    if (img) {
      reader.readAsDataURL(img)
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result

      if (previewImgUrl) {
        setPreviewImg(previewImgUrl)
      }
    }
  }

  const handleImgError = (e) => {
    e.target.src = Base;
  }

  return (
    <App>
      <Content>
        <FlexContainer1>
            <Image src={previewImg ? previewImg : `${s3Domain}${myGIF}`} onError={handleImgError}></Image>
        </FlexContainer1>
      </Content>
      <FlexContainer2>
        <form onSubmit={submit}>
          <input style={{display: "none"}} id="image" onChange={fileSelected} type="file" accept="image/*" />
        </form>
        <LabelStyle htmlFor='image'>업로드</LabelStyle>
        <Button3 type="submit" onClick={submit} style={{fontSize:"30px", minHeight: "15%", width: "25%", lineHeight:"30px"}} >저장</Button3>
      </FlexContainer2>
    </App>
  );
}

export default Images;
