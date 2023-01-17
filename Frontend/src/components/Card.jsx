import styled from 'styled-components';
import { useState, useContext } from 'react';
import fontStyle from '../utils/styles/fontStyle';
import colors from '../utils/styles/colors';
import { SelectionContext } from '../utils/styles/Contexte';
import {MAX_HOBBIES} from '../components/VariableGlobal'

const StyledCard = styled.div`
    height: 100px;
    width:130px;    
    border: ${({isSelect})=>(isSelect)? `solid 3px ${colors.primary}` : `3px solid #000000`};
    border-radius: 10px;
    background: url(${(props)=>props.imgUrl}); 
    background-size:cover;
    display: flex;
    flex-direction:column;
    justify-content:space-between ;
    align-items:center;
  }
`;

const StyledTitle = styled.h1`
    ${fontStyle.Body};
    color : #FFFFFF;
    text-align: center;
    
`;
const TitleWrapper = styled.div`
  width:100%;
  border: 1px solid #000000;
  border-radius:0 0 10px 10px;
  display:flex;
  justify-content :center;
  padding: O 3px;
  background-color: ${({isSelect})=> (isSelect) ? `rgba(53,106,237,0.7)` : `rgba(0 ,0 ,0 , 0.5)`};
`;


const Card = ({imgUrl,title,id}) => {
  const [isSelect, setSelect] = useState(false);
  const {selections,saveSelection,deleteSelection} = useContext(SelectionContext);
  const saveReply=(ide) =>{
    let verifie = false;
        selections.map((val,index)=>{
          if(val === ide){
            deleteSelection(index);
            verifie = true;
          }
          return 0 ;
        })
        if(!verifie  && selections.length < MAX_HOBBIES){
          saveSelection(ide);
        }
  }

  return (
    <StyledCard isSelect={isSelect}  imgUrl={imgUrl}>
      <input type="checkbox" />
      <TitleWrapper isSelect={isSelect} onClick={()=>{setSelect(selections.length < MAX_HOBBIES && !isSelect); saveReply(id)}}><StyledTitle>{title}</StyledTitle></TitleWrapper>
    </StyledCard>
  )
}

export default Card;