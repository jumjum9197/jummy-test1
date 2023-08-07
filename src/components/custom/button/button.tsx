import { styled } from "@mui/material";
import { FC } from "react"
import styles from "./button.module.scss"

type Text = 'center'| 'left'| 'right'
type ButtonType = 'submit' | 'reset' | 'button' 

interface ComponentProps 
//extends React.ButtonHTMLAttributes<HTMLButtonElement> 
{
    text? : string|JSX.Element;
    marginBottom? : string;
    type?: ButtonType;
    maxWidth? : string;
    minWidth?: string
    textAlign?: Text
    className? : string;
    bg?: string;
    color?: string;
    disabled?: boolean;
    marginTop?: string;
    paddingInline?:string
    //onClick?: () => void
    onClick?: (e: any) => void;
}

export interface ButtonProps {
    marginBottom?: string;
	maxWidth?: string;
	minWidth?: string;
	textAlign?: Text;
	className?: string;
	bg?: string;
	color?: string;
	disabled?: boolean;
    marginTop?: string;
    paddingInline?: string;
}
const Button: FC<ComponentProps> = ({
    text,
    marginBottom,
    marginTop,
    type,
    maxWidth,
    minWidth,
    textAlign,
    className,
    bg,
    color,
    disabled,
    onClick,
    paddingInline,
    
}) => {
    return(
        <StyledButton
            bg={bg}
            marginBottom ={marginBottom}
            marginTop = {marginTop}
            color={color}
            className = {`${styles.button} ${className}`}
            disabled={disabled}
            onClick={onClick}
            textAlign ={textAlign}
            maxWidth={maxWidth}
            type={type}
            paddingInline={paddingInline}
           
        >
            {text}
        </StyledButton>
    )
}
export default Button

const StyledButton = styled('button')<ButtonProps>`
    position: relative;
    background: ${props => (props.bg ? props.bg : 'blue')};
    color: ${props => (props.color ? props.color : 'var(--color-main-bg)')};
    border-radius: var(--font-s-4);
    padding-inline: var(--font-s-16);
    padding-block: var(--font-s-14);
    font-style: normal;
    font-weight: 600;
    font-size: var(--font-s-16);
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: ${props => (props.minWidth ? props.minWidth : '0rem')};
    max-width: ${props => (props.maxWidth ? props.maxWidth : '17.6rem')}!important;
    width: 100%;
    margin-bottom: ${props => props.marginBottom || '0rem'};
    margin-block-start: ${props => props.marginTop || '0rem'};
    cursor: pointer;
    border: 0;
    text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
    white-space: nowrap;
    transition: opacity 0.3s ease;

    @media (max-width: 587px) {
        margin-inline: auto;
        max-width: ${props => (props.maxWidth ? props.maxWidth : "100%" )} ;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        background-color:${props => (props.bg ? props.bg : 'rgb(189, 189, 244)')};
        outline: 2px solid ${props => (props.bg ? props.bg : 'rgb(189, 189, 244)')};
        color:  var(--color-main-primary);
    }

    & svg {
        margin-right: 0.93rem;
        min-width: 18px;
        min-height: 18px;
    }
    &:disabled {
        opacity: 0.8;
        background: #CBCED2;
        color: #FFFFFF;
        cursor: not-allowed;
    }
`