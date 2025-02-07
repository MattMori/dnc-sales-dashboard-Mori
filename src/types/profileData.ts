export interface ProfileData {
    status: string;
    statusMensagem: string;
    resposta: {
        name: string;
        email: string;
        phone: string;
        profileImage: string | null;
    };
}

export interface ProfileEditableData {
    name: string;
    phone: string;
}