export interface LoginData {
  status: string;
  statusMensagem: string;
  resposta: {
    'x-auth-token': string;
  };
}


export interface LoginError {
  status: 'ERROR';
  message: string;
}

export interface LoginPostData {
  email: string;
  password: string;
}
