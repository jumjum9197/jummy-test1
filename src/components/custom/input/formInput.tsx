import { styled, TextField } from "@mui/material";
import { padding } from "@mui/system";
import { FieldHookConfig, useField } from "formik";
import { InputHTMLAttributes, ReactElement } from "react";
import styles from "../formInput.module.scss";

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
        <section>

       <div className={styles.inputWrapper}>
            {icon && <span>{icon}</span>}
            {changePassword && <span onClick={() =>{handleChangePassword()}} className={'span'}>{text}</span>}
            {/* <TextFields 
              icon={icon} 
              label={label} 
              color={labelColor} 
              type={type} 
              width={width} 
              className={styles.inputField} 
              variant="standard" 
              sx={{ input: { color: "#11643C" , fontSize:"1.6rem", borderBottomColor: "#11643C" }, "label": { fontSize: "1.6rem"} }} 
              
              {...field} 
              {...rest}
            /> */}
  {/* <Label htmlFor={props.id || props.name}>{props.star === false ? props.label : <span>{props.label}<sup className="star">*</sup></span>}</Label> */}

  {/* props.asterisk === false ? props.label : <span>{props.label}<sup className="star">*</sup></span> */}
            <TextFields 
                icon={icon} 
                text={text}
                label={asterisk  ?  <>{label}<sup className="star">*</sup></>   : label} 
                select = {select}
                color={labelColor} 
                type={type} 
                width={width} 
                className={styles.inputField} 
                id="custom-css-outlined-input" 
                variant="outlined" 
                sx={{ input: { color: "#11643C" , fontSize:"1.6rem", borderBottomColor: "#11643C" }, "label": { color: '#011C34', fontSize: "1.9rem"} }} 
              {...field} 
              {...rest}
            > 
            {options}
            </TextFields>
       </div>
       
        {meta.touched && meta.error ? (
                <menu className={styles.errorMessage}> 
                    <span className={styles.span}>&#42;</span>
                    {meta.error}
                </menu>
            ) : null
        }
        </section>
  )
}

export default CustomFormInput

// const TextFields = styled(TextField)({
//     color: "green",
//     '& label.Mui-focused': {
//       color: 'inherit',
//     },
//     '& .MuiInput-underline:after': {
//       borderBottomColor: 'green',
//     },
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: 'red',
//         borderRadius: "10px"
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: 'green',
//       },
//       '&:hover': {
//         color: 'inherit',
//       },
//       '& .MuiInputBase-input': {
//         borderRadius: 4,
//         position: 'relative',
//         border: '1px solid #ced4da',
//         fontSize: 90,
//         width: 'auto',
//         padding: '10px 12px',
//       },
//     },
//   });


  
const TextFields = styled(TextField)({
  '& label.Mui-focused': {
    color: 'blue',
    padding: '10px 0',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#8DC467',
  },
  '& .MuiInputLabel-root.Mui-disabled': {
    color: ' blue',
    zIndex: 0,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#8DC467',
      borderTop: "none",
      borderRight : "none",
      borderLeft :"none",
      paddingLeft: "10px",
      borderRadius: "10px"
      
    },
    '&:hover fieldset': {
      borderColor: '#8DC467',
      padding: 0
    },
    '&.Mui-focused fieldset': {
      borderColor: '#8DC467',
      
    },
    '& .MuiInputBase-input': {
      padding: '10px 12px',
      paddingTop: '15px',
      paddingBottom: "8px"
    },
    '& .MuiInputBase-input selected': {
     backgroundColor: "white"
    },
  },
});
