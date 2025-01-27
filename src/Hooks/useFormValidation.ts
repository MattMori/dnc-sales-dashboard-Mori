import {useState, useEffect} from 'react';
import { inputProps } from "@/types"

export const useFormValidation =(inputs: inputProps[]) => {
    const [formValues, setFormValues] = useState(inputs.map((input) => input.value || '')); 
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
      const allFieldsValid = inputs.every((input, index) => {
        const value = formValues[index];

        if (input.required && !value){
          return false;
        }

        if (input.type === 'email') {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formValues[index]));
        }

        if (input.type === 'password') {
          const password = String(value)
          const hasCorrectLength = password.length >= 8 && password.length <= 16;
          const hasUpperCase = /[A-Z]/.test(password);
          const hasLowerCase = /[a-z]/.test(password);
          const hasNumber = /[0-9]/.test(password);
          const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
          return hasCorrectLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
        }
        return true;
      });
      
      setFormValid(allFieldsValid);
    },[formValues, inputs]);

    const handleChange = (index: number, value: string) => {
      setFormValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = value;
        return newValues;
      });
    }

    return {formValues, formValid, handleChange}
}
    