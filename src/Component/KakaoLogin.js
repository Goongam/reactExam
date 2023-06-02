const REST_API_KEY = '9b9e1082c6bd8be0a791b869466da3a4';
const REDIRECT_URI = 'http://localhost:3000/success';
//https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
export default function KakaoLogin(){

    //로그인 url -> 로그인 성공시 REDIRECT_URI로 이동
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const login = () => {
        window.location.href = url;
    };

    return (
    <>
        <button onClick={login}>카카오 로그인</button>
    </>
    );
}