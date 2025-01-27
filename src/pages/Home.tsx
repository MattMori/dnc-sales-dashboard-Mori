import { CardComponent, Header, AvatarList, CustomTable, StyledH2, StyledH3, CustomChart, StyledSpan } from '@/components'
import { Container, Grid } from '@mui/material'
import { currencyConverter, highlightTextConverter } from '@/utils'
import { useGet } from '@/Hooks'
import { NewsData, HighLightsData, StarsData, CustomChartProps } from '@/types'
import { Link } from 'react-router-dom'

function Home() {
    const {
        data: highLightsData,
        loading: highLightsLoading,
        error: highLightsError,
    } = useGet<HighLightsData[]>('sales/highlights')

    const {
        data: salesMonthData,
        loading: salesMonthLoading,
        error: salesMonthError,
    } = useGet<CustomChartProps>('sales/month')

    const {
        data: salesStarsData,
        loading: salesStarsLoading,
        error: salesStarsError,
    } = useGet<StarsData[]>('sales/stars')

    const {
        data: newsData,
        loading: NewsLoading,
        error: NewsError,
    } = useGet<NewsData[]>('news')

    const {
        data: salesYearData,
        loading: salesYearLoading,
        error: salesYearError,
    } = useGet<CustomChartProps>('sales/year')

    return (
        <>
            <Header />
            <Container className='mb-2' maxWidth='lg'>
                <Grid container spacing={4}>
                    {
                        !highLightsError && highLightsData && (
                            <>
                                <Grid item xs={12} md={4}>
                                    <CardComponent className={highLightsLoading
                                        ? 'skeleton-loading skeleton-loading-mh1' : ''
                                    }>
                                        {!highLightsLoading && highLightsData && (
                                            <>
                                                <StyledH2 className='mb-1'>Total de vendas no mês</StyledH2>
                                                <StyledH3 className='mb-1' size={40} lineheight={40}>{currencyConverter(highLightsData[0].value)}</StyledH3>
                                                <StyledSpan>{highLightsData[0].subtitle}</StyledSpan>
                                            </>
                                        )}

                                    </CardComponent>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <CardComponent className={highLightsData ? highLightsData[1].subtitle :
                                        'skeleton-loading skeleton-loading-mh1'
                                    }>
                                        {!highLightsLoading && highLightsData && (
                                            <>
                                                <StyledH2 className='mb-1' color='white'>Meta do mês</StyledH2>
                                                <StyledH3 className='mb-1' color='white' size={40} lineheight={40}>{currencyConverter(highLightsData[1].value)}</StyledH3>
                                                <StyledSpan color='white'>{highlightTextConverter(highLightsData[1].subtitle)}</StyledSpan>
                                            </>
                                        )}
                                    </CardComponent>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <CardComponent className={highLightsLoading ? 'skeleton-loading skeleton-loading-mh1' : ''}>
                                        {!highLightsLoading && highLightsData && (
                                            <>
                                                <Link to='/leads'>
                                                    <StyledH2 className='mb-1' >Leads contactados</StyledH2>
                                                    <StyledH3 className='mb-1' size={40} lineheight={40}>{highLightsData[2].value}</StyledH3>
                                                    <StyledSpan>{highLightsData[2].subtitle}</StyledSpan>
                                                </Link>
                                            </>
                                        )}
                                    </CardComponent>
                                </Grid>
                            </>
                        )}
                    <Grid item xs={12} md={7}>
                        {
                            !salesMonthError && salesMonthData && (
                                <CardComponent className={salesMonthLoading ? 'skeleton-loading skeleton-loading-mh2' : ''}>
                                    {
                                        !salesMonthLoading && salesMonthData && (
                                            <>
                                                <StyledH2 className='mb-1'>Valor de vendas no mês</StyledH2>
                                                <CustomChart
                                                    labels={salesMonthData.labels.map((label) => label)}
                                                    data={salesMonthData.data.map((data) => data)}
                                                    type={salesMonthData.type} />
                                            </>
                                        )
                                    }

                                </CardComponent>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} md={5}>
                        {
                            !salesStarsError && salesStarsData && (

                                <CardComponent className={salesStarsLoading ? 'skeleton-loading skeleton-loading-mh2' : ''}>
                                    {
                                        !salesStarsLoading && salesStarsData && (
                                            <>
                                                <StyledH2 className='mb-1'>Maiores Vendedores do Mês</StyledH2>
                                                <AvatarList listData={salesStarsData.map((star) => ({
                                                    avatar: '/dnc-avatar.svg',
                                                    name: star.name,
                                                    subtitle: currencyConverter(star.value),
                                                }))} />
                                            </>
                                        )
                                    }
                                </CardComponent>

                            )
                        }

                    </Grid>
                    <Grid item xs={12} md={5}>
                        {
                            !NewsError && newsData && (
                                <CardComponent className={NewsLoading ? 'skeleton-loading skeleton-loading-mh2' : ''}>
                                    {
                                        !NewsLoading && newsData &&
                                        <>
                                            <StyledH2 className='mb-1'>Notícias</StyledH2>
                                            <CustomTable
                                                headers={['Titulo', 'Horario']}
                                                rows={newsData.map((news) => [
                                                    <a className='ellipsis ellipsis-sm'
                                                        href={news.link}
                                                        target='_blank'>
                                                        {news.title}
                                                    </a>,
                                                    <a href={news.link} target='_blank'>
                                                        {news.date}
                                                    </a>
                                                ])} />
                                        </>
                                    }

                                </CardComponent>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} md={7}>
                        {
                            !salesYearError && salesYearData && (
                                <CardComponent className={salesYearLoading ? 'skeleton-loading skeleton-loading-mh2' : ''}>
                                    {
                                        !salesYearLoading && salesYearData && (
                                            <>
                                                <StyledH2 className='mb-1'>Valor de vendas no mês</StyledH2>
                                                <CustomChart
                                                    labels={salesYearData.labels.map((label) => label)}
                                                    data={salesYearData.data.map((data) => data)}
                                                    type={salesYearData.type} />
                                            </>
                                        )
                                    }

                                </CardComponent>
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Home
