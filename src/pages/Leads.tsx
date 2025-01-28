import { CardComponent, FormComponent, Header, StyledH2, StyledButton, StyledP, StyledSpan, CustomTable } from "@/components";
import { Container, Grid } from "@mui/material";
import { useFormValidation, usePost, useGet, useDelete } from "@/Hooks";
import { inputProps, LeadsData, LeadsPostData, MessageProps } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";

function Leads() {

    //Hooks:
    const {
        data: createLeadsData,
        loading: createleadsLoading,
        error: createleadsError,
        postData: createLeadsPostData,
    } = usePost<LeadsData, LeadsPostData>('leads/create', true)

    const {
        data: leadsData,
        loading: leadsLoading,
        error: leadsError,
        getData: getLeads,
    } = useGet<LeadsData[]>('leads')

    const {
        loading: leadsDeleteLoading, deleteData: deleteLeadsData
    } = useDelete<AxiosRequestConfig>('leads/delete')


    const [createMessage, setCreateMessage] = useState<MessageProps>({
        type: 'success',
        msg: ''
    });

    const clearMessage = () => {
        setTimeout(() => {
            setCreateMessage({
                type: 'success',
                msg: '',
            })
        }, 3000)
    }

    // Forms
    const inputs: inputProps[] = [
        { name: 'name', type: 'text', placeholder: 'Nome', required: true },
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
    ]

    const { formValues, formValid, handleChange } = useFormValidation(inputs);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createLeadsPostData({
            name: String(formValues[0]),
            email: String(formValues[1]),
            phone: String(formValues[2]),
        })
    }

    const handleDelete = async (id: number) => {
        if (confirm('Tem certeza que deseja excluir seu lead?')) {
            try {
                await deleteLeadsData({ params: { id: id } })
                alert('Lead deletada com sucesso!')
                getLeads()
            } catch (e) {
                alert('Não foi possível realizar a operação, entre em contato com o suporte')
            }
        }
    }

    useEffect(() => {
        if (createLeadsData?.id) {
            setCreateMessage({
                type: 'success',
                msg: 'Lead cadastrado com sucesso!'
            })
            getLeads()
            clearMessage()
        } else if (createleadsError) {
            setCreateMessage({
                type: 'error',
                msg: 'Não foi possível realizar a operação, entre em contato com o suporte',
            })
        } else {
            clearMessage()
        }
    }, [createLeadsData, createleadsError])

    return (
        <div>
            <Header />
            <Container className="mb-2" maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={7}>
                        <CardComponent className={leadsLoading
                            ? 'skeleton-loading skeleton-loading-mh2' : ''
                        }>
                            {
                                !leadsError && !leadsLoading && (
                                    <>
                                        <StyledH2
                                            id="leads-title"
                                            className="mb-1">Meus Leads</StyledH2>
                                        {
                                            leadsData?.length ? (
                                                <CustomTable
                                                    headers={['Nome', 'E-mail', 'Telefone', '']}
                                                    rows={leadsData.map((lead) => [
                                                        <StyledP>{lead.name}</StyledP>,
                                                        <StyledP>{lead.email}</StyledP>,
                                                        <StyledP>{lead.phone}</StyledP>,
                                                        <StyledButton
                                                            className="borderless-alert"
                                                            onClick={() => handleDelete(lead.id)}
                                                            disabled={leadsDeleteLoading}
                                                        >
                                                            Excluir
                                                        </StyledButton>
                                                    ])}
                                                />
                                            ) :
                                                <StyledSpan>Você ainda não possui leads cadastrados</StyledSpan>
                                        }
                                    </>
                                )

                            }

                        </CardComponent>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <CardComponent>
                            <StyledH2 className="mb-1">Cadastrar Leads</StyledH2>
                            <FormComponent
                                inputs={inputs.map((input, index) => ({
                                    ...input,
                                    type: input.type,
                                    placeholder: input.placeholder,
                                    value: formValues[index] || '',
                                    onChange: (e: ChangeEvent<HTMLInputElement>) =>
                                        handleChange(index, (e.target as HTMLInputElement).value)
                                }))}
                                buttons={[
                                    {
                                        className: 'primary',
                                        disabled: !formValid || createleadsLoading || leadsDeleteLoading,
                                        type: 'submit',
                                        onClick: handleSubmit,
                                        children: 'Cadastrar Lead',
                                    },
                                ]}
                                message={createMessage}
                            />
                        </CardComponent>

                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

export default Leads;