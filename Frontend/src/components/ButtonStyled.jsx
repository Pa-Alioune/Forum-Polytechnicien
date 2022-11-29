import styled from "styled-components";
import colors from "../utils/styles/colors";
import fontStyle from "../utils/styles/fontStyle";

const MyButtonStyled = styled.button`
${fontStyle.Body}
color: ${({color})=>(color ==='light') ? colors.primary : colors.colorLight};
width:100%;
text-decoration: none;
border-radius: 30px; 
background-color: ${({color})=>(color ==='light') ? colors.colorLight : colors.primary};
padding: 10px 60px;
border:none;
&:hover{
        transition: 0.5s;
        box-shadow: 0 0 8px ${colors.primary}
    }
`;

function ButtonStyled ({type,label,to}){
    return(
        <MyButtonStyled color={type}>{label}</MyButtonStyled>
    )
}
export default ButtonStyled ;