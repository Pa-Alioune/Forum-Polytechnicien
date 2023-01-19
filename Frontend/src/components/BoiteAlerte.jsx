import React from "react";
import styled from "styled-components";

const BoiteAlertStyle = styled.div`
  background-color: #f8d7da;
  border: solid 3px #f5c6cb;
  padding: 5px 25px;
  display: ${({ erreur }) => (erreur ? "flex " : "none")};
  position: relative;
  right: 20px;
  top: 0px;
  justify-content: center;
  align-items: center;
  width: 500px;
  border-radius: 5px;
  color: #721c24;
  z-index: 1000;
  height: 2.5em;
`;

const BoiteAlerte = ({ erreur }) => {
  return (
    <div>
      <BoiteAlertStyle erreur={erreur}>{erreur}</BoiteAlertStyle>
    </div>
  );
};

export default BoiteAlerte;
