import styled from "styled-components";
import { formComponentProps } from "@/types";
import { StyledButton, StyledInput } from "@/components";
import { pxToRem } from "@/utils";

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: ${pxToRem(16)};
`

function FormComponent(props: formComponentProps) {
    const { inputs, buttons, message } = props
    return (
        <StyledForm>
            {inputs.map((inputProps, index) => (
                <StyledInput key={index} {...inputProps} />
            ))}
            {buttons.map((buttonProps, index) => (
                <StyledButton key={index} {...buttonProps} />
            ))}
            {message && <p>{<div style={{ color: message.type === 'error' ? 'red' : 'green' }}>
                {message.msg}
            </div>}</p>}
        </StyledForm>
    )

}

export default FormComponent;