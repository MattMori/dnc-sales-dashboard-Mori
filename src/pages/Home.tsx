import { CardComponent, Header } from '@/components'
import { Container } from '@mui/material'

function Home() {
    return (
        <>
            <Header />
            <Container>
                <CardComponent> CARD</CardComponent>
            </Container>
        </>
    )
}

export default Home
