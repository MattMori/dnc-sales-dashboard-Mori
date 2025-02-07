import { ChangeEvent, useEffect, useState } from 'react'
import { pxToRem } from '@/utils'
import { Box, Container, Grid } from '@mui/material'
import {
  BannerImage,
  FormComponent,
  Logo,
  StyledH1,
  StyledP,
  StyledUl,
} from '@/components'
import { useFormValidation, usePost } from '@/Hooks'
import { useDispatch } from 'react-redux'
import { setMessage, setProfileData } from '@/redux/slices/createProfile'
import {
  CreateProfileData,
  CreateProfileResponse,
  DecodedJwt,
  inputProps,
} from '@/types'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtExpirationDateConverter } from '@/utils'
import { jwtDecode } from 'jwt-decode'

function Registration() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [registrationEmail, setRegistrationEmail] = useState('')

  const { data, loading, error, postData } = usePost<
    CreateProfileResponse,
    CreateProfileData
  >('usuario/criar', true)

  const step1Inputs: inputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]

  const HandleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    const emailValue = String(step1FormValues[1])
    setRegistrationEmail(emailValue)
    dispatch(
      setProfileData({
        email: emailValue,
      }),
    )
  }

  const {
    formValues: step1FormValues,
    formValid: step1FormValid,
    handleChange: step1FormHandleChange,
  } = useFormValidation(step1Inputs)

  const step2Inputs: inputProps[] = [{ type: 'password', placeholder: 'Senha' }]

  const HandleStep2 = (e: React.FormEvent) => {
    e.preventDefault()
    postData({
      name: String(step1FormValues[0]),
      email: String(step1FormValues[1]),
      phone: String(step1FormValues[2]),
      password: String(step2FormValues[0]),
    })
  }

  const {
    formValues: step2FormValues,
    formValid: step2FormValid,
    handleChange: step2FormHandleChange,
  } = useFormValidation(step2Inputs)

  const handleStepInputs = registrationEmail ? step2Inputs : step1Inputs

  useEffect(() => {
    if (data) {
      const xAuthToken = data['x-auth-token']
      if (xAuthToken) {
        const decoded: DecodedJwt = jwtDecode(xAuthToken)
        Cookies.set('x_auth_token', xAuthToken, {
          expires: jwtExpirationDateConverter(decoded.exp),
          secure: true,
          sameSite: 'Strict',
        })

        setTimeout(() => {
          dispatch(setMessage('Cadastro realizado com sucesso!'))
          navigate('/home')
        }, 100)
      } else {
        dispatch(
          setMessage('Cadastro realizado com sucesso! Por favor, faça login.'),
        )
        navigate('/')
      }
    } else if (error) {
      alert(
        `Não foi possível realizar a operação, entre em contato com o suporte. ${error}`,
      )
    }
  }, [data, error, navigate, dispatch])

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}
        >
          <Container maxWidth="sm">
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <Logo height={41} width={100} />
            </Box>
            <Box sx={{ marginBottom: pxToRem(24) }}>
              <StyledH1>
                {registrationEmail ? 'Defina sua senha' : 'Faça seu cadastro'}
              </StyledH1>
              <StyledP>
                {registrationEmail
                  ? ' Sua senha deve ter:'
                  : 'primeiro, diga-nos quem você é'}
              </StyledP>
              {registrationEmail && (
                <>
                  <StyledUl>
                    <li>Entre 8 e 16 caracteres;</li>
                    <li>Pelo menos uma letra maiúscula;</li>
                    <li>Pelo menos um caractere especial.</li>
                    <li>Pelo menos um número</li>
                  </StyledUl>
                </>
              )}
            </Box>
            <FormComponent
              inputs={handleStepInputs.map((input, index) => ({
                type: input.type,
                placeholder: input.placeholder,
                value: registrationEmail
                  ? step2FormValues[index] || ''
                  : step1FormValues[index] || '',
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  registrationEmail
                    ? step2FormHandleChange(
                        index,
                        (e.target as HTMLInputElement).value,
                      )
                    : step1FormHandleChange(
                        index,
                        (e.target as HTMLInputElement).value,
                      ),
              }))}
              buttons={[
                {
                  className: 'primary',
                  disabled: registrationEmail
                    ? !step2FormValid || loading
                    : !step1FormValid,
                  onClick: registrationEmail ? HandleStep2 : HandleStep1,
                  type: 'submit',
                  children: registrationEmail ? 'Enviar' : 'Próximo',
                },
              ]}
            />
          </Container>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <BannerImage />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Registration
