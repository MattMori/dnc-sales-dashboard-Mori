import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface LimiteGastosProps {
    limiteGastos: {
        valorLimite: number;
        statusLimite: string;
        totalDespesas: number;
    };
}

const LimiteGastos: React.FC<LimiteGastosProps> = ({ limiteGastos }) => {
    return (
        <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6">Limite de Gastos</Typography>
                {limiteGastos ? (
                    <>
                        <Typography>Limite: R$ {limiteGastos.valorLimite}</Typography>
                        <Typography>Status: {limiteGastos.statusLimite}</Typography>
                        <Typography>Total de Despesas: R$ {limiteGastos.totalDespesas}</Typography>
                    </>
                ) : (
                    <Typography>Carregando...</Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default LimiteGastos;
