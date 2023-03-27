import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../utils/styles/colors";

import fontStyle from "../utils/styles/fontStyle";
import { FaShare } from "react-icons/fa";
import {
  MdClose,
  MdOutlineAddReaction,
  MdOutlineComment,
} from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import PostNew from "./PostNew";
import { MyQuestion, ConnectedUser } from "../utils/styles/Contexte";
import { useContext, useState, useEffect } from "react";
import DateAffiche from "../utils/functions/DateAffiche";

const QuestionWrapper = styled.div`
  background: ${colors.colorLight};
  border-radius: 7px;
  padding: 20px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const InputHeadStyle = styled.input`
  outline: none;
  border: 1px solid #d9d9d9;
  width: 440px;
  height: 35px;
  border-radius: 30px;
  background: #ededed;
  padding: 0 10px;
  &::focus {
    background: #FFFFFFF;
  }
`;

const MiniUSerImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const UserPubImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PubProfil = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PubHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.h1`
  ${fontStyle.BodyHighLight}
  margin-bottom:0;
`;

const Follow = styled.button`
  ${fontStyle.BodyHighLight}
  display :  ${({ suivi }) => suivi  ? 'none' : 'flex'};
  margin-bottom:0;
  background : none;
  border : none;
  position : relative;
  top : -5.5px;
  left : -10px;
  font-size : 0.9em;
  color : ${colors.primary};
  cursor: pointer ;
`;


const DatePub = styled.p`
  ${fontStyle.Body};
  color: ${colors.backgroundDark};
  font-size: 12px;
  margin-top: 0;
`;

const PubOption = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  align-self: flex-start;
`;

const StyledOptionButton = styled.button`
  border: none;
  background: none;
  color: ${colors.secondary};
  cursor: pointer;
`;

const TextWrapper = styled.div`
  margin: 10px 0;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TextTitle = styled(Link)`
  color: #000000;
  ${fontStyle.BodyHighLight};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const DetailPubWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.secondary};
  font-size: 10px;
  ${fontStyle.Body};
`;

const MiniMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  color: ${colors.secondary};
  margin-bottom: 20px;
  ${fontStyle.BodyHighLight};
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  color: ${colors.secondary};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px 25px;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
  }
`;

const StyledMdOutlineComment = styled(MdOutlineComment)`
  font-size: 20px;
`;
const StyledMdOutlineAddReaction = styled(MdOutlineAddReaction)`
  font-size: 20px;
`;
const StyledFaShare = styled(FaShare)`
  font-size: 20px;
`;

const StyledSlOptions = styled(SlOptions)`
  font-size: 20px;
`;

const StyledMdClose = styled(MdClose)`
  font-size: 25px;
`;

function Question({ question, owner }) {
  const { myQuestion } = useContext(MyQuestion);
  const userContext = useContext(ConnectedUser);
  const [user, setUser] = useState(userContext);
  useEffect(() => {
    setUser(userContext);
  }, [userContext]);
  const [showModalPost, setShowModalPost] = useState(false);
  const [showModalHobbie, setShowModalHobbie] = useState(false);

  const handleQuestionClick = () => {
    setShowModalPost(true);
  };
  const handleOverlayClick = () => {
    setShowModalPost(false);
    setShowModalHobbie(false);
  };
  const handleCloseClick = () => {
    setShowModalPost(false);
  };

  const handleHobbieClick = () => {
    setShowModalPost(false);
    setShowModalHobbie(true);
  };
  return (
    <QuestionWrapper>
      <PubHead>
        {showModalPost && (
          <PostNew
            onOverlayClick={handleOverlayClick}
            onCloselayClick={handleCloseClick}
            onHobbieClick={handleHobbieClick}
            myQuestion={question}
          />
        )}
        <PubProfil>
          <div>
            <UserPubImg
              src={`http://localhost:8000${owner.profile_photo}`}
              alt={owner.name}
            />
          </div>
          <div>
            <UserName>{owner.name}</UserName>
            <DatePub>{DateAffiche(question.created_at)}</DatePub>
          </div>
          <div>
            <Follow suivi={false}>suivre</Follow>
          </div>
        </PubProfil>
        <PubOption>
          <StyledOptionButton>
            <StyledSlOptions />
          </StyledOptionButton>
          <StyledOptionButton>
            <StyledMdClose />
          </StyledOptionButton>
        </PubOption>
      </PubHead>
      <TextWrapper>
        <TextTitle to={`/question/${question.slug}`}>
          {question.contents}
        </TextTitle>
      </TextWrapper>
      <DetailPubWrapper>
        <p>Moustapha DIOP et 50 autres ont réagit ...</p>
        <p>15 partages et 50 commentaires</p>
      </DetailPubWrapper>
      <MiniMenu>
        <StyledButton>
          <StyledMdOutlineAddReaction />
          <span>Réagir</span>
        </StyledButton>
        <StyledButton onClick={handleQuestionClick}>
          <StyledMdOutlineComment />
          <span>Répondre</span>
        </StyledButton>
        <StyledButton>
          <StyledFaShare />
          <span>Partager</span>
        </StyledButton>
      </MiniMenu>
      <InputWrapper>
        <div>
          <MiniUSerImg src={user.profile_photo} alt={user.name} />
        </div>
        <div>
          <InputHeadStyle type="text" placeholder="Ecrivez un commentaire..." />
        </div>
      </InputWrapper>
    </QuestionWrapper>
  );
}

export default Question;
