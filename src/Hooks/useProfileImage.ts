import { useState, useEffect } from 'react'

export const useProfileImage = (initialImage: string | null = null) => {
    const [profileImage, setProfileImage] = useState<string | null>(initialImage)

    // Persistir a imagem no localStorage
    useEffect(() => {
        if (profileImage) {
            localStorage.setItem('profileImage', profileImage)
        }
    }, [profileImage])

    // Recuperar a imagem do localStorage ao montar o componente
    useEffect(() => {
        const savedImage = localStorage.getItem('profileImage')
        if (savedImage && !profileImage) {
            setProfileImage(savedImage)
        }
    }, [])

    return [profileImage, setProfileImage] as const
} 