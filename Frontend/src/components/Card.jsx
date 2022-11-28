import styled from 'styled-components';
import { useState, useContext } from 'react';
import fontStyle from '../utils/styles/fontStyle';
import colors from '../utils/styles/colors';
import { SelectionContext } from '../utils/styles/Contexte';

const StyledCard = styled.div`
    height: 100px;
    width:130px;    
    border: ${({isSelect})=>(isSelect)? `solid 3px ${colors.primary}` : `3px solid #000000`};
    border-radius: 10px;
    background: url(${(props)=>props.imgUrl}); 
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items:flex-end;
  }
`;

const StyledTitle = styled.h1`
    ${fontStyle.Body};
    color : #FFFFFF;
    text-align: center;
    
`;
const TitleWrapper = styled.div`
  background-color: rgba(0 ,0 ,0 , 0.5);
  width:100%;
  border: 1px solid #000000;
  border-radius:0 0 10px 10px;
  display:flex;
  justify-content :center;
  padding: O 3px;
  height: ${({isSelect})=>(isSelect)? "100% ": "auto"};
  &:hover{
        border-radius:10px;
        height: 100%;
    }
`;


const Card = ({imgUrl,title,id}) => {
  const [isSelect, setSelect] = useState(false);
  const {selections,saveSelection,deleteSelection} = useContext(SelectionContext);
  const saveReply=(ide) =>{
    let verifie = false;
        selections.map((val,index)=>{
          if(val.id === ide){
            deleteSelection(index);
            verifie = true;
          }
          return 0 ;
        })
        if(!verifie){
          saveSelection({id: ide})
        }
  }

  return (
    <StyledCard isSelect={isSelect}  imgUrl={imgUrl}>
        <TitleWrapper  onClick={()=>{setSelect(!isSelect); saveReply(id)}}><StyledTitle>{title}</StyledTitle></TitleWrapper>
    </StyledCard>
  )
}

export default Card;