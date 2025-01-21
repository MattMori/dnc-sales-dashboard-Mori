import styled from "styled-components";

const RegistrationArea = styled.div`
    background: #666;
`
const RegistrationImage = styled.img`
    background-image: url(/login-image.svg);
    background-size: cover;
    width: 50vw;
    height: 100vh;

`
function Registration() {
    return (
        <>
            <RegistrationArea> Registration</RegistrationArea>
            <RegistrationImage />
        </>
    )
}

export default Registration