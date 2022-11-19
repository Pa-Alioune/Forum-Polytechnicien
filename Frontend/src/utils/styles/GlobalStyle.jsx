import { createGlobalStyle } from "styled-components";
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

` 
export default StyledGlobalStyle;