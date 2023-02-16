import styled from "styled-components";
import colors from "../utils/styles/colors";
import CommentPost from "./CommentPost";
import fontStyle from "../utils/styles/fontStyle";
import photoUser from "../assets/user1.png";

import { FaShare } from "react-icons/fa";
import { MdClose, MdOutlineAddReaction, MdSend } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../utils/styles/Contexte";
import axios from "axios";
import BoiteAlerte from "./BoiteAlerte";
import DateAffiche from "../utils/functions/DateAffiche";

const PublicationWrapper = styled.div`
  background: ${colors.colorLight};
  border-radius: 7px;
  padding: 20px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const InputHeadStyle = styled.input`
  outline: none;
  border: 1px solid #d9d9d9;
  width: 400px;
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

const SendButton = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  background: ${colors.primary};
  display: ${({ comment }) => (comment ? `flex` : `none`)};
  justify-content: center;
  align-items: center;
  color: ${colors.backgroundLight};
`;

const UserPubImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
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
  const [comment, setComment] = useState("");
  const [commentaireState, setCommentaireState] = useState(pub.comments);
  const { auth } = useContext(AuthContext);
  const [date, setDate] = useState("");
  const [erreur, setErreur] = useState("");
  let idComment = null;
  let type = null;
  const inputRef = useRef(null);
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("contents", comment);
    formData.append("publication", pub.id);
    let url = "http://localhost:8000/api/comments/";
    if (idComment !== null) {
      url = "http://localhost:8000/api/answers/";
      formData.append("comment", idComment);
    }
    if (idComment !== null && type === "reponse") {
      url = "http://localhost:8000/api/answers/";
      formData.append("answer", idComment);
    }
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${auth.user.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setComment("");
          let commentaireNext = [...commentaireState];
          commentaireNext.push(response.data);
          commentaireNext.reverse();
          setCommentaireState(commentaireNext);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setDate(DateAffiche(pub.created_at));
  }, [pub]);
  const handleChild = (commentaire) => {
    if (commentaire.type !== null) {
      inputRef.current.value = "@" + commentaire.text;
      type = commentaire.type;
    }

    inputRef.current.focus();

    idComment = commentaire.id;
  };

  return (
    <PublicationWrapper>
      <PubHead>
        <PubProfil>
          <div>
            <UserPubImg
              src={`http://localhost:8000${owner.profile_photo}`}
              alt={owner.name}
            />
          </div>
          <div>
            <UserName>{owner.name}</UserName>
            <DatePub>{date}</DatePub>
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
        <StyledButton
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <StyledMdOutlineComment />
          <span>Commenter</span>
        </StyledButton>
        <StyledButton>
          <StyledFaShare />
          <span>Partager</span>
        </StyledButton>
      </MiniMenu>

      <div>
        <CommentPost
          handleOnResponseClick={handleChild}
          commentaires={commentaireState}
        />
      </div>
      <BoiteAlerte erreur={erreur} />

      <form onSubmit={handleCommentSubmit}>
        <InputWrapper>
          <div>
            <MiniUSerImg src={user.profile_photo} alt="user" />
          </div>
          <div>
            <InputHeadStyle
              type="text"
              ref={inputRef}
              value={comment}
              name="text"
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ecrivez un commentaire..."
            />
          </div>
          <div>
            <SendButton comment={comment}>
              <MdSend />
            </SendButton>
          </div>
        </InputWrapper>
      </form>
    </PublicationWrapper>
  );
}

export default Publication;
