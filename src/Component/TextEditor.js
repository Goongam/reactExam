import ReactQuill from "react-quill";
import { useState, useRef, useMemo, createElement } from "react";

import 'react-quill/dist/quill.snow.css';
import './css/textEditor.css';


function TextEditor(){
    
    

    const QuillRef = useRef();
    const [contents, setContents] = useState("");
    

    const handler = ()=>{
      const input = document.createElement("input");
      const formData = new FormData();
      let url = "";
  
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async ()=>{

        const file = input.files;

        if (file !== null) {
            formData.append("image", file[0]);
            console.log(file[0]);  
        //   url = "http://localhost:3001/imgs";
       
            url = await fetch('http://localhost:3001/uploadImage',{
                method: 'POST',
                body: formData,
            }).then((data)=>data.json())
            .then((json)=>json.imgURL);
            // console.log(url);


            const range = QuillRef.current?.getEditor().getSelection()?.index;
            if (range !== null && range !== undefined) {
                let quill = QuillRef.current?.getEditor();

                quill?.setSelection(range, 1);

                quill?.clipboard.dangerouslyPasteHTML(
                    range,
                    `<img src=${url}/>`
                );
            }
            return ;
        }
      }

    }
    const modules = useMemo(
        () => ({
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ size: ["small", false, "large", "huge"] }, { color: [] }],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] },
              ],
              ["image", "video"],
            ],
            handlers: {
              image: handler,
            },
          },
        }),
        []
      );

    // 이미지를 업로드 하기 위한 함수
    // const imageHandler = () => {
    //     // 파일을 업로드 하기 위한 input 태그 생성
    //   const input = document.createElement("input");
    //   const formData = new FormData();
    //   let url = "";
  
    //   input.setAttribute("type", "file");
    //   input.setAttribute("accept", "image/*");
    //   input.click();
  
    //   // 파일이 input 태그에 담기면 실행 될 함수 
    //   input.onchange = async () => {
    //     const file = input.files;
    //     if (file !== null) {
    //       formData.append("image", file[0]);
  
    //   // 저의 경우 파일 이미지를 서버에 저장했기 때문에
    //       // 백엔드 개발자분과 통신을 통해 이미지를 저장하고 불러왔습니다.
    //       try {
    //         //const res = axios를 통해 백엔드 개발자분과 통신했고, 데이터는 폼데이터로 주고받았습니다.
  
    //   // 백엔드 개발자 분이 통신 성공시에 보내주는 이미지 url을 변수에 담는다.
    //         url = res.data.url;
  
    //   // 커서의 위치를 알고 해당 위치에 이미지 태그를 넣어주는 코드 
    //       // 해당 DOM의 데이터가 필요하기에 useRef를 사용한다.
    //         const range = QuillRef.current?.getEditor().getSelection()?.index;
    //         if (range !== null && range !== undefined) {
    //           let quill = QuillRef.current?.getEditor();
  
    //           quill?.setSelection(range, 1);
  
    //           quill?.clipboard.dangerouslyPasteHTML(
    //             range,
    //             `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
    //           );
    //         }
  
    //         return { ...res, success: true };
    //       } catch (error) {
    //         const err = error as AxiosError;
    //         return { ...err.response, success: false };
    //       }
    //     }
    //   };
    // };
  
  // quill에서 사용할 모듈을 설정하는 코드 입니다.
  // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.




//전송시 이미지 url 변환
  // function createElementFromHTML(htmlString) {
  //   var div = document.createElement('div');
  //   div.innerHTML = htmlString.trim();

  //   // Change this to div.childNodes to support multiple top-level nodes.
  //   return div;
  // }

  // function DataURIToBlob(dataURI) {
  //   const splitDataURI = dataURI.split(',')
  //   const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  //   const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  //   const ia = new Uint8Array(byteString.length)
  //   for (let i = 0; i < byteString.length; i++)
  //       ia[i] = byteString.charCodeAt(i)

  //   return new Blob([ia], { type: mimeString })
  // }

  // const submit = async ()=>{
  //   let contentHTML = createElementFromHTML(contents)
  //   let imglist = contentHTML.querySelectorAll('img');
    
  //   imglist.forEach(async (node) => { //각 img src link로 변경
  //     const blob = DataURIToBlob(node.src);
  //     const formData = new FormData();
  //     const file = new File([blob], `image.${node.src.match('(?<=data:image/)(.*?)(?=;)')[0]}`,{ type: "image/png" })
  //     formData.append('image', file);
  //     // formData.append('path', 'temp/') //other param
  //     // formData.append("image", file);
      
      
  //     const url = await fetch('http://localhost:3001/uploadImage',{
  //       method: 'POST',
  //       body: formData,
  //     }).then((data)=>data.json())
  //     .then((json)=>json.imgURL);

  //     node.src = url;
  //   });

  //   //HTML내용 서버에 보내기
  //   let string = contentHTML.innerHTML;
  //   console.log(contentHTML);

    
  //     await fetch("http://localhost:3001/TestNewArticle", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         "content":contentHTML.innerHTML,})
  //     });
  // }

  const submit = async ()=>{
    console.log(contents);
    await fetch("http://localhost:3001/TestNewArticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "content":contents})
    });
  }

  return (
      <>
        <ReactQuill
                 ref={QuillRef}
                  value={contents}
                  onChange={setContents}
                  modules={modules}
                  theme="snow"
                  placeholder="내용을 입력해주세요."/>
        <button onClick={submit} className="btn">확인</button>
        
      </>
  );
}
export default TextEditor;