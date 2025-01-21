export interface Theme {
    appBackground: string;
    appColor: string;
    AppDefaultStroke: string;
    appLogo: string;
    AppSkeletonFrom: string;
    AppSkeletonTo: string;
    buttons: {
        alert: string;
        alertColor: string;
        alertHover: string;
        disabled: string;
        disabledColor: string;
        primary: string;
        primaryColor: string;
        primaryHover: string;
    }
    card: {
        alert: string;
        background: string;
        border: string;
        sucess: string;
        warning: string;
    }

    textInput: {
        active: string;
        activeColor: string;
        borderColor: string;
        disabled: string;
        disabledBorderColor: string;
        disabledColor: string;
        placeholderColor: string;
    }

    typography: {
        error: string;
        subtitle: string;
        sucess: string;
    }
}