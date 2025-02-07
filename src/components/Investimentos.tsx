import React from "react";
import { Card, CardContent, Typography, Grid, List, ListItem } from "@mui/material";

interface Investimento {
    _id: string;
    nomeAtivo: string;
    tipoInvestimento: string;
    valorInvestido: number;
    plataforma: string;
}

interface InvestimentosProps {
    investimentos: Investimento[];
}

const Investimentos: React.FC<InvestimentosProps> = ({ investimentos }) => {
    return (
        <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6">Investimentos</Typography>
                <List>
                    {investimentos.map((investimento) => (
                        <ListItem key={investimento._id}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Typography>{investimento.nomeAtivo}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{investimento.tipoInvestimento}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>R$ {investimento.valorInvestido}</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{investimento.plataforma}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default Investimentos;
