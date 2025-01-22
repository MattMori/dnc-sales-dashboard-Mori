import { BannerImage } from "@/components";
import { Box, Container, Grid } from '@mui/material';

function Registration() {

    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
                    <Container maxWidth="sm">
                        <h1>Cadastro</h1>
                        {/* Formulário de cadastro */}
                    </Container>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <BannerImage />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Registration