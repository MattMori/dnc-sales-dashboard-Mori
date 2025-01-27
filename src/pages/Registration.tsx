import { ChangeEvent, useEffect } from 'react'
import { pxToRem } from '@/utils'
import { Box, Container, Grid } from '@mui/material'
import { BannerImage, FormComponent, Logo, StyledH1, StyledP, StyledUl } from '@/components'
import { useFormValidation, usePost } from '@/Hooks'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { setMessage, setProfileData } from '@/redux/slices/createProfile'
import { CreateProfileData, inputProps } from '@/types'
import { useNavigate } from 'react-router-dom'

function Registration() {

  const Dispatch = useDispatch()
  const navigate = useNavigate()
  const { email } = useSelector((state: RootState) => state.createProfile)

  const {
    data,
    loading,
    error,
    postData,
  } = usePost<String, CreateProfileData>('profile/create')

  //Form Step 1

  const step1Inputs: inputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]

  const HandleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    Dispatch(
      setProfileData({
        email: String(step1FormValues[1]),
      }))
  }

  const {
    formValues: step1FormValues,
    formValid: step1FormValid,
    handleChange: step1FormHandleChange
  } = useFormValidation(step1Inputs);

  //Form Step 2
  const step2Inputs: inputProps[] = [
    { type: 'password', placeholder: 'Senha' },
  ]

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
    handleChange: step2FormHandleChange
  } = useFormValidation(step2Inputs);

  const handleStepInputs = email ? step2Inputs : step1Inputs


  useEffect(() => {
    if (data !== null) {
      Dispatch(setMessage('Cadastro realizado com sucesso!'))
      navigate('/')
    } else if (error !== null) {
      alert
        (`Não foi possível realizar a operação, entre em contato com o suporte. ${error}`)
    }
  }, [data, error, navigate])

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
                {email ? 'Defina sua senha' : 'Faça seu cadastro'}
              </StyledH1>
              <StyledP>
                {email ? ' Sua senha deve ter:' : 'primeiro, diga-nos quem você é'}
              </StyledP>
              {
                email && (
                  <>
                    <StyledUl>
                      <li>Entre 8 e 16 caracteres;</li>
                      <li>Pelo menos uma letra maiúscula;</li>
                      <li>Pelo menos um caractere especial.</li>
                      <li>Pelo menos um número</li>
                    </StyledUl>
                  </>
                )
              }

            </Box>
            <FormComponent
              inputs={handleStepInputs.map((input, index) => ({
                type: input.type,
                placeholder: input.placeholder,
                value:
                  email
                    ? step2FormValues[index] || ''
                    : step1FormValues[index] || '',
                onChange: (e: ChangeEvent<HTMLInputElement>) =>
                  email
                    ? step2FormHandleChange(index, (e.target as HTMLInputElement).value)
                    : step1FormHandleChange(index, (e.target as HTMLInputElement).value),
              }))}
              buttons={[
                {
                  className: 'primary',
                  disabled: email
                    ? !step2FormValid
                    || loading
                    : !step1FormValid,
                  onClick: email ? HandleStep2 : HandleStep1,
                  type: 'submit',
                  children: email ? 'Enviar' : 'Próximo',
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
