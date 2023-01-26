import styled from "styled-components";
import colors from "../utils/styles/colors";
import userPhoto from "../assets/user.png";
import userPhoto1 from "../assets/user1.png";
import fontStyle from "../utils/styles/fontStyle";
import ImagePost from "../assets/ImagePost.png";
import { AiFillHome } from "react-icons/ai";
import { FaEdit, FaShare } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import {
  MdGroups,
  MdNotifications,
  MdClose,
  MdOutlineAddReaction,
} from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";

const PublicationWrapper = styled.div`
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

const TextTitle = styled.div`
  ${fontStyle.BodyHighLight};
`;

const TextBody = styled.div`
  ${fontStyle.body};
`;

const ImageWrapper = styled.div`
  max-width: 35em;
  max-height: 40em;
  display: flex;
  overflow: hidden;
`;

const StyledImage = styled.img`
  max-width: 100%;
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

const StyledMdOutlineComment = styled(BiComment)`
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

function Publication({ pub, owner, user }) {
  return (
    <PublicationWrapper>
      <PubHead>
        <PubProfil>
          <div>
            <UserPubImg
              src={`http://localhost:8000${owner.profile_photo}`}
              alt="user"
            />
          </div>
          <div>
            <UserName>{owner.name}</UserName>
            <DatePub>04 Décembre 2022, 20h 17</DatePub>
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
        {/* <TextTitle>QU’EST CE QUE L’INTELLIGENCE ARTIFICIELLE ?</TextTitle> */}
        <TextBody dangerouslySetInnerHTML={{ __html: pub.contents }} />
      </TextWrapper>
      <ImageWrapper>
        <StyledImage
          src={`http://localhost:8000${pub.images[0].image}`}
          alt="ImagePost"
        />
      </ImageWrapper>
      <DetailPubWrapper>
        <p>Moustapha DIOP et 50 autres ont réagit ...</p>
        <p>15 partages et 50 commentaires</p>
      </DetailPubWrapper>
      <MiniMenu>
        <StyledButton>
          <StyledMdOutlineAddReaction />
          <span>Réagir</span>
        </StyledButton>
        <StyledButton>
          <StyledMdOutlineComment />
          <span>Commenter</span>
        </StyledButton>
        <StyledButton>
          <StyledFaShare />
          <span>Partager</span>
        </StyledButton>
      </MiniMenu>
      <InputWrapper>
        <div>
          <MiniUSerImg src={user.profile_photo} alt="user" />
        </div>
        <div>
          <InputHeadStyle type="text" placeholder="Ecrivez un commentaire..." />
        </div>
      </InputWrapper>
    </PublicationWrapper>
  );
}

export default Publication;
