import { createGlobalStyle } from "styled-components";
import colors from "./colors";
import fontStyle from "./fontStyle";

const StyledGlobalStyle = createGlobalStyle`
    *{
        ${fontStyle.Body};
    }

    body{
        box-sizing: border-box;
        margin: 0;
        padding:0;  
    }

    ::-webkit-scrollbar{
        width:7px;
        height: 50%;
    }

    ::-webkit-scrollbar-thumb{
        background-color: ${colors.primary};
        border-radius: 10px;
    }
    
` 
export default StyledGlobalStyle;