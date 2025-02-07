import { ChangeEvent, useContext, useEffect, useState, useRef } from 'react'
import {
  CardComponent,
  FormComponent,
  Header,
  StyledH2,
  StyledButton,
} from '@/components'
import { AppThemeContext } from '@/contexts/AppThemeContext'
import {
  Container,
  Grid,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import { useFormValidation, useGet, useDelete, usePut, useAxios } from '@/Hooks'
import { logout } from '@/services'
import {
  ProfileData,
  ProfileEditableData,
  inputProps,
  MessageProps,
} from '@/types'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { ProfileImage } from '@/components/ProfileImage'
import { useProfileImage } from '@/Hooks/useProfileImage'

function Profile() {
  const themeContext = useContext(AppThemeContext)
  const navigate = useNavigate()

  // Hooks
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
  } = useGet<ProfileData>('/usuario/dados')

  useEffect(() => {
    if (profileError) {
      console.error('Erro ao carregar perfil:', profileError)
      setUpdateMessage({
        type: 'error',
        msg: 'Erro ao carregar dados do perfil. Por favor, faça login novamente.',
      })
    }
  }, [profileError])

  useEffect(() => {
    const token = Cookies.get('Authorization')
    if (!token) {
      console.log('Token não encontrado, redirecionando...')
      navigate('/login')
    } else {
      console.log('Token presente:', token.substring(0, 20) + '...') // Mostra apenas parte do token
    }
  }, [navigate])

  const {
    data: profileUpdateData,
    putData: profilePutData,
    loading: profileUpdateLoading,
    error: profileUpdateError,
  } = usePut<ProfileEditableData>('/usuario/atualizar')

  const { deleteData: profileDeleteData, loading: profileDeleteLoading } =
    useDelete('/usuario/deletar')

  // Adicione este estado
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profileImage, setProfileImage] = useProfileImage()

  const [showCropDialog, setShowCropDialog] = useState(false)
  const [cropConfig, setCropConfig] = useState<Crop>({
    unit: 'px',
    width: 200,
    height: 200,
    x: 0,
    y: 0,
  })
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const { axiosInstance } = useAxios()

  useEffect(() => {
    if (profileData) {
      const userData = profileData.resposta
      const newFormData = {
        name: userData?.name || '',
        email: userData?.email || '',
        phone: userData?.phone || '',
      }
      setFormData(newFormData)

      // Atualizar também os formValues
      handleChange(0, userData?.name || '')
      handleChange(1, userData?.email || '')
      handleChange(2, userData?.phone || '')

      // Atualizar a imagem do perfil
      if (userData?.profileImage) {
        setProfileImage(userData.profileImage)
      }
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
    const updatedData = {
      name: String(formValues[0]),
      phone: String(formValues[2]),
    }

    await profilePutData(updatedData)
  }

  const handleDelete = async () => {
    if (
      confirm(
        'Tem certeza que deseja excluir sua conta? Se sim, certifique-se de deletar os seus leads antes.',
      )
    ) {
      try {
        await profileDeleteData({
          headers: {
            'x-auth-token': Cookies.get('Authorization') || '',
          },
        })
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
      // Força um recarregamento dos dados do usuário
      window.location.reload()
    } else if (profileUpdateError) {
      setUpdateMessage({
        type: 'error',
        msg: 'Não foi possível realizar a operação, entre em contato com o suporte',
      })
    }
    clearMessage()
  }, [profileUpdateData, profileUpdateError])

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        setUpdateMessage({
          type: 'error',
          msg: 'Por favor, selecione apenas imagens.',
        })
        return
      }

      // Validar tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUpdateMessage({
          type: 'error',
          msg: 'A imagem deve ter no máximo 5MB.',
        })
        return
      }

      const base64Image = await convertToBase64(file)
      setPreviewUrl(base64Image)
      setShowCropDialog(true)
    } catch (error) {
      setUpdateMessage({
        type: 'error',
        msg: 'Erro ao processar a imagem.',
      })
    }
  }

  const handleCropComplete = (crop: Crop) => {
    setCropConfig(crop)
  }

  const handleImageLoaded = (image: HTMLImageElement) => {
    setImageRef(image)
  }

  const compressImage = async (
    base64String: string,
    maxWidth = 800,
  ): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.src = base64String
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = (maxWidth * height) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        ctx?.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', 0.7))
      }
    })
  }

  const handleSaveCrop = async () => {
    if (!imageRef || !cropConfig.width || !cropConfig.height) return

    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const scaleX = imageRef.naturalWidth / imageRef.width
      const scaleY = imageRef.naturalHeight / imageRef.height

      canvas.width = 400
      canvas.height = 400

      ctx?.drawImage(
        imageRef,
        cropConfig.x * scaleX,
        cropConfig.y * scaleY,
        cropConfig.width * scaleX,
        cropConfig.height * scaleY,
        0,
        0,
        400,
        400,
      )

      // Comprimir e converter para base64
      const base64Image = await compressImage(
        canvas.toDataURL('image/jpeg', 0.9),
      )

      const { data } = await axiosInstance.post(
        'usuario/upload-foto',
        {
          profileImage: base64Image,
          mimeType: 'image/jpeg',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )

      if (data.status === 'OK') {
        setProfileImage(data.resposta.profileImage)
        setUpdateMessage({
          type: 'success',
          msg: 'Foto de perfil atualizada com sucesso!',
        })
        // Força um recarregamento dos dados do usuário
        window.location.reload()
      }
    } catch (error: any) {
      console.error('Erro completo:', error)
      setUpdateMessage({
        type: 'error',
        msg:
          error.response?.data?.statusMensagem ||
          'Erro ao atualizar foto de perfil',
      })
    }
    setShowCropDialog(false)
  }

  return (
    <div>
      <Header />
      <Container className="mb-2" maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            {!profileError && (
              <CardComponent>
                {!profileLoading && profileData && (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      <Box
                        onClick={handleImageClick}
                        sx={{
                          width: 150,
                          height: 150,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: '2px solid #ccc',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': {
                            opacity: 0.8,
                          },
                        }}
                      >
                        <ProfileImage
                          initialImage={profileImage}
                          size="large"
                          alt="Foto de perfil"
                        />
                      </Box>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      <Typography variant="caption" sx={{ mt: 1 }}>
                        Clique para alterar a foto
                      </Typography>
                    </Box>
                    <StyledH2 className="mb-1">Seus Dados</StyledH2>
                    <FormComponent
                      inputs={inputs.map((input, index) => {
                        const value =
                          index === 0
                            ? formData.name
                            : index === 1
                              ? formData.email
                              : formData.phone
                        return {
                          ...input,
                          type: input.type,
                          placeholder: input.placeholder,
                          value,
                          onChange: (e: ChangeEvent<HTMLInputElement>) => {
                            const { value } = e.target
                            setFormData((prev) => ({
                              ...prev,
                              [input.name]: value,
                            }))
                            handleChange(index, value)
                          },
                        }
                      })}
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

      <Dialog open={showCropDialog} maxWidth="md" fullWidth>
        <DialogContent>
          {previewUrl && (
            <ReactCrop
              crop={cropConfig}
              onChange={(c) => setCropConfig(c)}
              onComplete={handleCropComplete}
              aspect={1}
              circularCrop
              minWidth={200}
              minHeight={200}
            >
              <img
                src={previewUrl}
                onLoad={(e) => handleImageLoaded(e.currentTarget)}
                style={{ maxWidth: '100%', maxHeight: '70vh' }}
                alt="Preview"
              />
            </ReactCrop>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCropDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleSaveCrop}
            variant="contained"
            color="primary"
            disabled={!cropConfig.width || !cropConfig.height}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Profile
