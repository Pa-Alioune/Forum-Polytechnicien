import styled from "styled-components";
import colors from "../utils/styles/colors";
import userPhoto from "../assets/user.png";
import userPhoto1 from "../assets/user1.png";
import fontStyle from "../utils/styles/fontStyle";
import { FaShare } from "react-icons/fa";
import {MdClose, MdOutlineAddReaction, MdOutlineComment } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import QuestionNew from "./QuestionNew";
import { MyQuestion } from "../utils/styles/Contexte";
import { useContext } from "react";


const QuestionWrapper = styled.div`
    background: ${colors.colorLight};
    border-radius:7px; 
    padding:20px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const InputHeadStyle = styled.input`
    outline:none;
    border:1px solid #D9D9D9;
    width: 440px;
    height:35px;
    border-radius: 30px;
    background: #EDEDED;
    padding: 0 10px;
    &::focus{
        background: #FFFFFFF;
    }
`;

const MiniUSerImg = styled.img`
    width: 40px;
    height:40px;
    border-radius: 50%;
    cursor:pointer;
`;

const UserPubImg = styled.img`
    width: 50px;
    height:50px;
    border-radius: 50%;
    cursor:pointer;
`;

const InputWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    align-items:center;
`;

const PubProfil = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    gap:10px;
`;

const PubHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
`;

const UserName= styled.h1`
    ${fontStyle.BodyHighLight}
    margin-bottom:0;
`;

const DatePub = styled.p`
    ${fontStyle.Body};
    color: ${colors.backgroundDark};
    font-size: 12px;
    margin-top:0;
`;

const PubOption = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    align-self: flex-start;
`;

const StyledOptionButton = styled.button`
    border:none;
    background: none;
    color: ${colors.secondary};
    cursor: pointer;
`;

const TextWrapper = styled.div`
    margin: 10px 0;
    max-height: 300px;
    display:flex;
    flex-direction: column;
    gap: 15px;
`;

const TextTitle = styled.div`
    ${fontStyle.BodyHighLight};
`;

const TextBody= styled.div`
    ${fontStyle.body};
`;

const DetailPubWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    color: ${colors.secondary};
    font-size: 10px;
    ${fontStyle.Body};    
`;

const MiniMenu =styled.div`
    display:flex;
    justify-content:space-between;
    padding: 10px;
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
    color: ${colors.secondary};
    margin-bottom: 20px;
    ${fontStyle.BodyHighLight};
`;


const StyledButton = styled.button`
    border:none;
    background:none;
    color: ${colors.secondary};
    cursor:pointer;
    display:flex;
    justify-content: center;
    align-items:center;
    gap:5px;
    padding: 10px 25px;
    &:hover{
        background: rgba(0, 0, 0, 0.05);
        border-radius:5px;
    }
`;

const StyledMdOutlineComment = styled(MdOutlineComment)`
    font-size : 20px;
`;
const StyledMdOutlineAddReaction = styled(MdOutlineAddReaction)`
    font-size : 20px;
`;
const StyledFaShare = styled(FaShare)`
    font-size : 20px;
`;

const StyledSlOptions = styled(SlOptions)`
    font-size : 20px;
`;

const StyledMdClose = styled(MdClose)`
    font-size : 25px;
`;


function Question(){
    const {myQuestion} = useContext(MyQuestion);
    console.log(myQuestion);
    return(
        <QuestionWrapper>
            <PubHead>
                <PubProfil>
                    <div><UserPubImg src={userPhoto1} alt="user" /></div>
                    <div>
                        <UserName>Haby SOW</UserName>
                        <DatePub>14 Décembre 2023, 20h 17</DatePub>
                    </div>
                </PubProfil>
                <PubOption>
                    <StyledOptionButton><StyledSlOptions/></StyledOptionButton>
                    <StyledOptionButton><StyledMdClose/></StyledOptionButton>
                </PubOption>
            </PubHead>
            <TextWrapper>
                <TextTitle>QU’EST CE QUE L’INTELLIGENCE ARTIFICIELLE ?</TextTitle>
                <TextBody>
                    {myQuestion.text}
                </TextBody>
            </TextWrapper>
            <DetailPubWrapper>
                <p>Moustapha DIOP et 50 autres ont réagit ...</p>
                <p>15 partages et 50  commentaires</p>
            </DetailPubWrapper>
            <MiniMenu>
                <StyledButton><StyledMdOutlineAddReaction/><span>Réagir</span></StyledButton>
                <StyledButton><StyledMdOutlineComment/><span>Répondre</span></StyledButton>
                <StyledButton><StyledFaShare/><span>Partager</span></StyledButton>
            </MiniMenu>
            <InputWrapper>
                <div><MiniUSerImg src={userPhoto} alt="user" /></div>                
                <div><InputHeadStyle type="text" placeholder="Ecrivez un commentaire..."/></div>
            </InputWrapper>
        </QuestionWrapper>
    );
}

export default Question;