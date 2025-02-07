export * from './appThemeContext'
export * from './avatarList'
export * from './customChart'
export * from './customTable'
export * from './decodedJwt'
export * from './form-component'
export * from './highLightsData'
export * from './loginData'
export * from './newsData'
export * from './profileData'
export * from './starsData'
export * from './theme'
export * from './typographies'
export * from './leadsData'

export interface CreateProfileData {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface CreateProfileResponse {
    status: string;
    mensagem: string;
    // adicione outros campos conforme necessário
}

