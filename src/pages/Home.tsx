import { CardComponent, Header, AvatarList, CustomTable } from '@/components'
import { Container } from '@mui/material'
import { currencyConverter } from '@/utils'

function Home() {
    const mockListData = [
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

    const mockTableData = {

        Headers: ['Name', 'Email', 'Actions'],
        rows: [
            [
                <span>John Doe</span>,
                <span>johnDoe@email.com</span>,
                <button>Action</button>
            ],
            [
                <span>Maria</span>,
                <span>maria@email.com</span>,
                <button>Action</button>
            ],
            [
                <span>Joao</span>,
                <span>joao@email.com</span>,
                <button>Action</button>
            ],
        ]
    }

    return (
        <>
            <Header />
            <Container>
                <CardComponent> CARD</CardComponent>
                <CardComponent>
                    <AvatarList listData={mockListData} />
                    <CustomTable headers={mockTableData.Headers} rows={mockTableData.rows} />
                </CardComponent>
            </Container>
        </>
    )
}

export default Home
