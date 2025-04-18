import { ChangeEvent, useContext, useEffect, useState } from 'react'
import {
  CardComponent,
  FormComponent,
  Header,
  StyledH2,
  StyledButton,
} from '@/components'
import { AppThemeContext } from '@/contexts/AppThemeContext'
import { Container, Grid } from '@mui/material'
import { useFormValidation, useGet, useDelete, usePut } from '@/Hooks'
import { logout } from '@/services'
import {
  ProfileData,
  ProfileEditableData,
  inputProps,
  MessageProps,
} from '@/types'
import Cookies from 'js-cookie'

function Profile() {
  const themeContext = useContext(AppThemeContext)

  //Hooks
  const [updateMessage, setUpdateMessage] = useState<MessageProps>({
    type: 'success',
    msg: '',
  })
  const clearMessage = () => {
    setTimeout(() => {
      setUpdateMessage({
        type: 'success',
        msg: '',
      })
    }, 3000)
  }

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
  } = useGet<ProfileData>('profile')

  const {
    data: profileUpdateData,
    putData: profilePutData,
    loading: profileUpdateLoading,
    error: profileUpdateError,
  } = usePut<ProfileEditableData>('profile/update')

  const { deleteData: profileDeleteData, loading: profileDeleteLoading } =
    useDelete('profile/delete')

  useEffect(() => {
    if (profileData) {
      handleChange(0, profileData.name)
      handleChange(1, profileData.email)
      handleChange(2, profileData.phone)
    }
  }, [profileData])

  // Forms
  const inputs: inputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', disabled: true },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]

  const { formValues, formValid, handleChange } = useFormValidation(inputs)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await profilePutData({
      name: String(formValues[0]),
      phone: String(formValues[2]),
    })
  }

  const handleDelete = async () => {
    if (
      confirm(
        'Tem certeza que deseja excluir sua conta? se sim, certifique-se de deletar os seus leads antes',
      )
    ) {
      try {
        await profileDeleteData()
        alert('Conta deletada com sucesso!')
        Cookies.remove('Authorization')
        window.location.href = '/'
      } catch (e) {
        alert(
          'Não foi possível realizar a operação, entre em contato com o suporte',
        )
      }
    }
  }

  useEffect(() => {
    if (profileUpdateData !== null) {
      setUpdateMessage({
        type: 'success',
        msg: 'Perfil atualizado com sucesso!',
      })
    } else if (profileUpdateError) {
      setUpdateMessage({
        type: 'error',
        msg: 'Não foi possível realizar a operação, entre em contato com o suporte',
      })
    }
    clearMessage()
  }, [profileUpdateData, profileUpdateError])

  return (
    <div>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            {!profileError && (
              <CardComponent
                className={
                  profileLoading ? 'skeleton-loading skeleton-loading-mh2' : ''
                }
              >
                {!profileLoading && profileData && (
                  <>
                    <StyledH2 className="mb-1">Seus Dados</StyledH2>
                    <FormComponent
                      inputs={inputs.map((input, index) => ({
                        ...input,
                        type: input.type,
                        placeholder: input.placeholder,
                        value: formValues[index] || '',
                        onChange: (e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(
                            index,
                            (e.target as HTMLInputElement).value,
                          ),
                      }))}
                      buttons={[
                        {
                          className: 'primary',
                          disabled: !formValid || profileUpdateLoading,
                          id: 'update-profile',
                          type: 'submit',
                          onClick: handleSubmit,
                          children: profileUpdateLoading
                            ? 'Aguarde...'
                            : 'Atualizar Meu Perfil',
                        },
                        {
                          className: 'alert',
                          disabled: profileDeleteLoading,
                          id: 'delete-profile',
                          type: 'button',
                          onClick: handleDelete,
                          children: profileDeleteLoading
                            ? 'Aguarde... '
                            : 'Excluir minha Conta',
                        },
                      ]}
                      message={updateMessage}
                    />
                  </>
                )}
              </CardComponent>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardComponent>
              <StyledH2 className="mb-1">Definições de conta</StyledH2>
              <StyledButton
                className="primary mb-1"
                id="theme-switch"
                onClick={themeContext?.toggleTheme}
              >
                Trocar para Tema{' '}
                {themeContext?.appTheme === 'light' ? 'escuro' : 'claro'}
              </StyledButton>
              <StyledButton className="alert" id="logout" onClick={logout}>
                Logout
              </StyledButton>
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Profile
