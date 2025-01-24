import {useState, useEffect} from 'react';
import { inputProps } from "@/types"

export const useFormValidation =(inputs: inputProps[]) => {
    const [formValues, setFormValues] = useState(inputs.map((input) => input.value || '')); 
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
      const allFieldsValid = inputs.every((input, index) => {
        if (input.type === 'email') {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(formValues[index]));
        }
        if (input.type === 'password') {
        return String(formValues[index]).length > 7;
        }
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
    