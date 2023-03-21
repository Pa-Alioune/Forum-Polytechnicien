import styled from "styled-components";
import fontStyle from "../utils/styles/fontStyle";
import image from "../assets/userImg/user1.png";
import colors from "../utils/styles/colors";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { MdOutlineAddReaction } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import DateAffiche from "../utils/functions/DateAffiche";
import { useState, useEffect } from "react";

function CardQuestion({ questionParam }) {
  const Container = styled.div`
        background: #FFFFFF;
        display: flex;
        flex-direction: column;s
        justify-content: center;
        align-items: center;
        padding : 20px;
        gap: 20px;
        border-radius: 20px;
    `;
  const CardHeader = styled.div``;
  const ProfilWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  const UserPubImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  `;
  const Username = styled.h1`
    ${fontStyle.BodyHighLight}
    margin-top:10px;
  `;

  const DatePost = styled.p`
    ${fontStyle.Body};
    color: ${colors.backgroundDark};
    font-size: 12px;
    margin-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const TextQuestion = styled.div`
    color: #000000;
    ${fontStyle.BodyHighLight};
    text-decoration: none;
  `;
  const ButtonGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  const ButtonSup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
  `;
  const ButtonInf = styled.div`
    display: flex;
    justify-content: center;
    alig-items: center;
    gap: 30px;
  `;
  const SubButton = styled.div`
    font-size: 12px;
    color: #000000;
  `;
  const LikeWrapper = styled.div`
    border: none;
    background: #d9d9d9;
    color: ${colors.secondary};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 7px;
    width: 100px;
    height: 20px;
    border-radius: 5px;
  `;
  const DislikeWrapper = styled.div`
    border: none;
    background: #d9d9d9;
    color: ${colors.secondary};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 7px;
    width: 100px;
    height: 20px;
    border-radius: 5px;
  `;
  const AnswerWrapper = styled.div`
    border: none;
    background: #d9d9d9;
    color: ${colors.secondary};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 7px;
    width: 100px;
    height: 20px;
    border-radius: 5px;
  `;
  const ShareWrapper = styled.div`
    border: none;
    background: #d9d9d9;
    color: ${colors.secondary};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 7px;
    width: 100px;
    height: 20px;
    border-radius: 5px;
  `;

  const StyledBiComment = styled(BiComment)`
    font-size: 15px;
    color: ${colors.secondary};
    padding: 3px;
    background: #ffffff;
    border-radius: 50px;
    cursor: pointer;
  `;
  const StyledFaShare = styled(FaShare)`
    font-size: 15px;
    color: ${colors.secondary};
    padding: 3px;
    background: #ffffff;
    border-radius: 50px;
    cursor: pointer;
  `;
  const StyledAiFillLike = styled(AiFillLike)`
    font-size: 15px;
    color: #ffffff;
    padding: 3px;
    background: ${colors.primary};
    border-radius: 50px;
    cursor: pointer;
  `;
  const StyledAiFillDislike = styled(AiFillDislike)`
    font-size: 15px;
    color: #ffffff;
    padding: 3px;
    background: #fc2659;
    border-radius: 50px;
    cursor: pointer;
  `;
  const [question, setQuestion] = useState(null);
  useEffect(() => {
    setQuestion(questionParam);
  }, [questionParam]);
  console.log(question);
  return (
    question && (
      <div>
        {console.log("render child")}

        <Container>
          <CardHeader>
            <ProfilWrapper>
              <UserPubImg
                src={`http://localhost:8000/${question.owner.profile_photo}`}
                alt={image}
              />
            </ProfilWrapper>
            <Username>{question.owner.name}</Username>
            <DatePost>{DateAffiche(question.updated_at)}</DatePost>
          </CardHeader>
          <TextQuestion>{question.contents}</TextQuestion>
          <ButtonGroupWrapper>
            <ButtonSup>
              <LikeWrapper>
                <StyledAiFillLike />
                <SubButton>100 Likes</SubButton>
              </LikeWrapper>
              <DislikeWrapper>
                <StyledAiFillDislike /> <SubButton>123 Dislikes</SubButton>
              </DislikeWrapper>
            </ButtonSup>
            <ButtonInf>
              <AnswerWrapper>
                <StyledBiComment />
                <SubButton> Reponses</SubButton>
              </AnswerWrapper>
              <ShareWrapper>
                <StyledFaShare />
                <SubButton>980 Partages</SubButton>
              </ShareWrapper>
            </ButtonInf>
          </ButtonGroupWrapper>
        </Container>
      </div>
    )
  );
}

export default CardQuestion;
