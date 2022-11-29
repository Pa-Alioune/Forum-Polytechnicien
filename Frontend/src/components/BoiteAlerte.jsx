import React from 'react'
import styled from 'styled-components';

const BoiteAlertStyle = styled.div`
    background-color: #f8d7da;
    border: solid 1px #f5c6cb;
    padding:5px 25px;
    display: ${({erreur})=>(erreur)? "flex ": "none"};
    position : relative;
    right:20px;
    top:0px;
    justify-content: center;
    align-items: center;
    width:500px;
    border-radius: 5px;
    color: #721c24;
    height:2.5em;
`;


const BoiteAlerte = ({erreur, text}) => {
  return (
    <div>
        <BoiteAlertStyle erreur={erreur}>{text}</BoiteAlertStyle>
    </div>
  )
}

export default BoiteAlerte;