import { CardComponent, Header, AvatarList } from '@/components'
import { Container } from '@mui/material'
import { currencyConverter } from '@/utils'

function Home() {
    const MockListData = [
        {
            name: 'John Doe',
            avatar: '/dnc-avatar.svg',
            subtitle: currencyConverter(2000),
        },

        {
            name: 'maria',
            avatar: '/dnc-avatar.svg',
            subtitle: currencyConverter(3000),
        },

        {
            name: 'joao',
            avatar: '/dnc-avatar.svg',
            subtitle: currencyConverter(4000),
        },




    ]
    return (
        <>
            <Header />
            <Container>
                <CardComponent> CARD</CardComponent>
                <CardComponent>
                    <AvatarList listData={MockListData} />
                </CardComponent>
            </Container>
        </>
    )
}

export default Home
