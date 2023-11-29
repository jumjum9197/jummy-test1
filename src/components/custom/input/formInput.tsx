import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { FieldHookConfig, useField } from "formik";
import { InputHTMLAttributes, ReactElement } from "react";
import styles from "../formInput.module.scss"
interface InputProps{
  icon? : React.ReactNode;
  placeholder? : string;
  label? : string;
  labelColor? : string;
  type? : string;
  marginRight? : string;
  defaultValue? : any;
  width? : string;
  className: string;
  changePassword?: boolean;
  select?: boolean;
  options?: React.ReactNode;
  handleChangePassword?: () => void;
  text?:React.ReactNode;
  asterisk?:boolean;
}


const CustomFormInput: React.FC<InputProps & InputHTMLAttributes<HTMLInputElement> & FieldHookConfig<string> & any> = (props) : ReactElement => {
  const {changePassword = false, options, select = false, handleChangePassword, icon, placeholder, label, asterisk = true, labelColor, type, className, width,text, ...rest} = props;
  const [field, meta] = useField(props)

  return (
    <Box
      component="form"
      noValidate
      // sx={{
      //   display: 'grid',
      //   // gridTemplateColumns: { sm: '1fr 1fr' },
      //   gap: 2,
      // }}
      sx={{ input: {color: "#11643C" , fontSize:"1.6rem", borderBottomColor: "#11643C" }, "label": { color: '#011C34', fontSize: "1.9rem"} }} 

    >
    
      <RedditTextField
        label={label}
        defaultValue=""
        // id="reddit-input"
        variant="filled"
        select = {select}
        type={type}
        className={styles.inputField}   
        style={{ marginTop: 10, marginBottom:10,  }}
        // sx={{ input: {marginTop: 1, marginBottom:1,color: "#11643C" , fontSize:"1.6rem", borderBottomColor: "#11643C" }, "label": { color: '#011C34', fontSize: "1.9rem", marginTop: 15, marginBottom:15} }} 

      />
           {meta.touched && meta.error ? (
                <menu className={styles.errorMessage}> 
                    <span className={styles.span}>&#42;</span>
                    {meta.error}
                </menu>
            ) : null
        }
   
    </Box>
  );
}
export default CustomFormInput

const RedditTextField = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));