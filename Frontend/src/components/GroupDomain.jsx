import React from 'react';
import styled from 'styled-components';
import fontStyle from '../utils/styles/fontStyle';
import colors from '../utils/styles/colors';
import Card from './Card';

const GroupDomainStyled = styled.div`
    display: flex;
    postion:absolute;
    flex-direction:column;
    margin: 0 20px;
`;

const StyledTitleDomain = styled.h1`
    ${fontStyle.Title1};
    color: ${colors.primary};
    margin:20px 0;
`;
const CardWrapper = styled.div`
    display:flex;
    gap:10px;
    flex-wrap: wrap;
`;



function GroupDomain({domain,data}){


  return (
    <div>
        <GroupDomainStyled>
                        <div>
                            <StyledTitleDomain>{domain}</StyledTitleDomain>
                        </div>
                        <CardWrapper>
                            {data.map((val)=>(val.categorie=== domain) && (<Card key={`${val.id}cle2`} id={val.id} imgUrl={val.picture} title={val.title} />))}
                        </CardWrapper>
        </GroupDomainStyled>
    </div>
  )
}


export default GroupDomain;