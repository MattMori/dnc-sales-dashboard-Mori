import styled from "styled-components";

const LoginArea = styled.div`
    background: #999;
`
const LoginImage = styled.img`
    background-image: url(/login-image.svg);
    background-size: cover;
    width: 50vw;
    height: 100vh;

`
function Login() {
    return (
        <>
            <LoginArea> LOGIN </LoginArea>
            <LoginImage />
        </>
    )
}

export default Login