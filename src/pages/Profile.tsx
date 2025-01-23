import { useContext } from "react";
import { CardComponent, Header, StyledButton } from "@/components";
import { AppThemeContext } from "@/contexts/AppThemeContext";

function Profile() {
    const themeContext = useContext(AppThemeContext);

    return (
        <div>
            <Header />
            <CardComponent>
                <StyledButton
                    className="primary"
                    onClick={themeContext?.toggleTheme}>
                    Trocar para Tema {' '}
                    {themeContext?.appTheme === 'light' ? 'escuro' : 'claro'}
                </StyledButton>
            </CardComponent>
        </div>
    );

}

export default Profile;