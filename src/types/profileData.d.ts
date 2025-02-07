export interface ProfileEditableData {
  name: string
  phone: string
}

export interface ProfileData extends ProfileEditableData {
  email: string
}

export interface CreateProfileData extends ProfileEditableData {
  name: string
  email: string
  phone: string
  password: string
  message?: string | null
}

export interface CreateProfileResponse {
  'x-auth-token': string;
  message?: string | null;
}
