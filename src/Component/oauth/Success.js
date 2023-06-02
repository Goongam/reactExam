import { useEffect } from "react";

const REST_API_KEY = '9b9e1082c6bd8be0a791b869466da3a4';
const REDIRECT_URI = 'http://localhost:3000/success';
const CLIENT_SECRET = 'NIU1vnfe0hE9sdcaM0GJd8sFqDk0YKS7';

export default function Success(){
    

    useEffect(()=>{
        //받아온 query의 code추출
        const current = decodeURI(window.location.href);
        const search = current.split("?")[1];
        const params = new URLSearchParams(search);
        const code = params.get('code');

        console.log('code',code);

        //code를 통해 accessToken과 refreshToken 받아옴
        async function getToken(){
            const res = await fetch('https://kauth.kakao.com/oauth/token',{
                method: 'post',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`
            });

            const token = await res.json();
            console.log('token',token);
            
            //받아온 토큰으로 사용자 정보 불러오기 (cors에러, 백에서 진행)
            const userRes = await fetch('https://kapi.kakao.com',{
                method: 'post',
                headers: {'Authorization': `Bearer ${token.access_token}`}
            });
            const userData = userRes.json();
            console.log(userData);
        }

        getToken();
    },[]);

    return (<>

    </>);
}