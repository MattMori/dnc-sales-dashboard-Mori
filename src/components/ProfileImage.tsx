import { useState, useEffect } from 'react'
import { useProfileImage } from '@/Hooks/useProfileImage'

interface ProfileImageProps {
  initialImage: string | null
  alt?: string
  style?: React.CSSProperties
  size?: 'small' | 'large'
}

const defaultImage = '/path/to/default-avatar.png'

const defaultStyles = {
  small: {
    width: '40px',
    height: '40px',
  },
  large: {
    width: '150px',
    height: '150px',
  },
}

export const ProfileImage = ({
  initialImage,
  alt = 'Profile',
  style,
  size = 'large',
}: ProfileImageProps) => {
  const [profileImage, setProfileImage] = useProfileImage(initialImage)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (initialImage && initialImage !== profileImage) {
      setProfileImage(initialImage)
    }
  }, [initialImage])

  const imageStyle = {
    objectFit: 'cover',
    borderRadius: '50%',
    width: size === 'large' ? '150px' : '40px',
    height: size === 'large' ? '150px' : '40px',
  }

  return (
    <img
      src={imageError ? defaultImage : profileImage || defaultImage}
      alt={alt}
      style={{
        ...imageStyle,
        ...style,
      }}
      onError={() => setImageError(true)}
    />
  )
}
