import { BannerImage } from "@/components";
import { Box, Container, Grid } from '@mui/material';
function Login() {
    return (
        <Box>
            <Grid container>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
                    <Container maxWidth="sm">
                        <h1>Login</h1>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <BannerImage />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Login