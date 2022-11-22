import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../utils/styles/colors";

const StyledLink = styled(Link)`
    color: ${({color})=>(color ==='light') ? colors.primary : colors.colorLight};
    text-decoration: none;
    font-size: 18px;
    border-radius: 30px; 
    background-color: ${({color})=>(color ==='light') ? colors.colorLight : colors.primary};
    padding: 10px 50px;
    box-shadow: 0 0 10px #494949 ;

    &:hover{
        transition: 0.5s;
        box-shadow: 0 0 10px #FFFFFF ;
    }
`

function MyLinkButton({type,label,to}){
    return(
        <StyledLink color={type} to={to} >{label}</StyledLink>
    )
}
export default MyLinkButton;