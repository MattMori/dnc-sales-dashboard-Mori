import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

interface ResumoProps {
    resumo: {
        receita: number;
        despesa: number;
        totalFinal: number;
    };
}

const ResumoFinanceiro: React.FC<ResumoProps> = ({ resumo }) => {
    return (
        <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6">Resumo Financeiro</Typography>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={4}>
                        <Typography variant="body1">Receita: R$ {resumo.receita}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Despesa: R$ {resumo.despesa}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">Total: R$ {resumo.totalFinal}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ResumoFinanceiro;
