import React, { useEffect, useState } from 'react'
import { Container, Box, Typography } from '@mui/material'
import ResumoFinanceiro from './../components/ResumoFinanceiro'
import ListaTransacoes from './../components/ListaTransacoes'
import LimiteGastos from './../components/LimiteGastos'
import Investimentos from './../components/Investimentos'
import { Header } from '@/components'
import Cookies from 'js-cookie'

interface Resumo {
  receita: number
  despesa: number
  totalFinal: number
}

interface Transacao {
  _id: string
  description: string
  type: string
  value: number
}

interface LimiteGastos {
  valorLimite: number
  statusLimite: string
  totalDespesas: number
}

interface Investimento {
  _id: string
  nomeAtivo: string
  tipoInvestimento: string
  valorInvestido: number
  plataforma: string
}

const Home: React.FC = () => {
  const [resumo, setResumo] = useState<Resumo | null>(null)
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [limiteGastos, setLimiteGastos] = useState<LimiteGastos | null>(null)
  const [investimentos, setInvestimentos] = useState<Investimento[]>([])

  useEffect(() => {
    fetch('/transacao/resumo-financeiro/listar', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setResumo(data))
      .catch((error) =>
        console.error('Erro ao buscar resumo financeiro:', error),
      )

    fetch('/transacao/listar', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('Authorization')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setTransacoes(data))
      .catch((error) => console.error('Erro ao buscar transações:', error))

    fetch('/limiteDeGastos/status', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setLimiteGastos(data))
      .catch((error) =>
        console.error('Erro ao buscar limite de gastos:', error),
      )

    fetch('/investimento/listar', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setInvestimentos(data))
      .catch((error) => console.error('Erro ao buscar investimentos:', error))
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Dashboard Financeiro
          </Typography>

          {/* Resumo financeiro */}
          {resumo && <ResumoFinanceiro resumo={resumo} />}

          {/* Limite de Gastos */}
          {limiteGastos && <LimiteGastos limiteGastos={limiteGastos} />}

          {/* Lista de Transações */}
          <ListaTransacoes transacoes={transacoes} />

          {/* Investimentos */}
          <Investimentos investimentos={investimentos} />
        </Box>
      </Container>
    </>
  )
}

export default Home
