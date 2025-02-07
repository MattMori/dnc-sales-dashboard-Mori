import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json'
  }
});

// Adicionar um interceptor para incluir o token em todas as requisições
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('Authorization')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// Adicione um interceptor para logs
axiosInstance.interceptors.request.use(request => {
  console.log('Requisição sendo enviada:', request);
  return request;
});

axiosInstance.interceptors.response.use(
  response => {
    console.log('Resposta recebida:', response);
    return response;
  },
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

export const usePost = <T, P>(endpoint: string, withAuth?: Boolean) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const postData = async (postData: P, config?: AxiosRequestConfig) => {
    setData(null)
    setLoading(true)
    setError(null)

    try {
      const headers = withAuth
        ? {
          Authorization: `Bearer ${Cookies.get('Authorization')}`,
          'Content-Type': 'application/json',
          ...config?.headers,
        }
        : {
          'Content-Type': 'application/json',
          ...config?.headers,
        }
      const response = await axiosInstance({
        url: endpoint,
        method: 'POST',
        data: postData,
        headers: headers,
        ...config,
      })
      setData(response.data)
    } catch (e: any) {
      setError(e.response?.status ?? 500)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, postData }
}

export const useGet = <T>(endpoint: string, config?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)

  const getData = async () => {
    setLoading(true)
    setError(null)

    try {
      const token = Cookies.get('Authorization')
      if (!token) {
        console.error('Token não encontrado')
        setError('Token não encontrado')
        return
      }

      console.log('Fazendo requisição para:', `${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
      console.log('Token:', token);

      const response = await axiosInstance({
        url: endpoint,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          ...config?.headers,
        },
        ...config,
      })

      setData(response.data)
    } catch (e: any) {
      console.error('Erro completo:', e);
      console.error('Resposta do erro:', e.response?.data);
      setError(e.response?.status ?? 500)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [endpoint])

  return { data, loading, error, getData }
}

export const useDelete = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)

  const deleteData = async (config?: AxiosRequestConfig) => {
    setData(null)
    setLoading(true)

    try {
      const response = await axiosInstance({
        url: endpoint,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('Authorization')}`,
          ...config?.headers,
        },
        ...config,
      })
      setData(response.data)
    } catch (e: any) {
      throw e.response?.status ?? 500
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, deleteData }
}

export const usePut = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const putData = async (putData: T, config?: AxiosRequestConfig) => {
    setData(null)
    setLoading(true)
    setError(null)

    try {
      const response = await axiosInstance({
        url: endpoint,
        method: 'PUT',
        data: putData,
        headers: {
          Authorization: `Bearer ${Cookies.get('Authorization')}`,
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        ...config,
      })
      setData(response.data)
    } catch (e: any) {
      setError(e.response?.status ?? 500)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, putData }
}

export const useAxios = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
  })

  // Adicionar interceptor para o token
  instance.interceptors.request.use((config) => {
    const token = Cookies.get('Authorization')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  })

  return { axiosInstance: instance }
}
