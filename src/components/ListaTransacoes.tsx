import React from "react";
import { Card, CardContent, Typography, Grid, List, ListItem } from "@mui/material";

interface Transacao {
    _id: string;
    description: string;
    type: string;
    value: number;
}

interface ListaTransacoesProps {
    transacoes: Transacao[];
}

const ListaTransacoes: React.FC<ListaTransacoesProps> = ({ transacoes }) => {
    return (
        <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6">Transações</Typography>
                <List>
                    {transacoes.map((transacao) => (
                        <ListItem key={transacao._id}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Typography>{transacao.description}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>{transacao.type}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography>R$ {transacao.value}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default ListaTransacoes;
