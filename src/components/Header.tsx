import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Logo } from '@/components'
import { Box, Container, Typography } from '@mui/material'
import { pxToRem } from '@/utils'
import { useProfileImage } from '@/Hooks/useProfileImage'
import { useGet } from '@/Hooks'
import { ProfileData } from '@/types'
import { ProfileImage } from './ProfileImage'
import PersonIcon from '@mui/icons-material/Person'

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.appBackground};
  border-bottom: ${pxToRem(1)} solid ${(props) => props.theme.appDefaultStroke};
  margin-bottom: ${pxToRem(37)};
  width: 100%;
`

export const Header = () => {
  const [profileImage] = useProfileImage()
  const { data: profileData } = useGet<ProfileData>('/usuario/dados')
  const userName = profileData?.resposta?.name || ''

  return (
    <StyledHeader>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: pxToRem(64),
          }}
        >
          <Link to="/home">
            <Logo height={30} width={73} />
          </Link>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Link to="/perfil">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ccc',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                {profileImage ? (
                  <ProfileImage initialImage={profileImage} size="small" />
                ) : (
                  <PersonIcon sx={{ fontSize: 24, color: '#ccc' }} />
                )}
              </Box>
            </Link>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'text.primaryColor',
                fontWeight: 500,
              }}
            >
              {userName}
            </Typography>
          </Box>
        </Box>
      </Container>
    </StyledHeader>
  )
}

export default Header
