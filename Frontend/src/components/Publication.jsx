import styled from "styled-components";
import colors from "../utils/styles/colors";
import CommentPost from "./CommentPost";
import { Link } from "react-router-dom";
import fontStyle from "../utils/styles/fontStyle";

import { FaShare } from "react-icons/fa";
import { MdClose, MdOutlineAddReaction, MdSend } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

import { useState, useContext, useEffect, useRef } from "react";
import {
  AuthContext,
  ConnectedUser,
  MyQuestion,
} from "../utils/styles/Contexte";

import DateAffiche from "../utils/functions/DateAffiche";
import axios from "axios";

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

const ReactionWrapper = styled.div`
  position: relative;
`;
const colorMap = {
  like: colors.primary,
  dislike: "#FC2659",
};
const ReagirButton = styled.div`
  color: ${({ reaction }) =>
    reaction ? colorMap[reaction] : colors.secondary};
`;

const ReactButtonSelect = styled.span`
  position: absolute;
  bottom: 40px;
  z-index: 100;
  left: 8px;
  border-radius: 10px;
  width: 80px;
  height: 20px;
  padding: 5px 10px;
  background: rgb(240, 240, 240);
  display: ${({ hover }) => (hover ? `flex` : `none`)};
  justify-content: center;
  align-items: center;
  gap: 13px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const TextTitle = styled(Link)`
  color: #000000;
  ${fontStyle.BodyHighLight};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledAiFillDislike = styled(AiFillDislike)`
  font-size: 15px;
  color: #ffffff;
  padding: 3px;
  background: #fc2659;
  border-radius: 50px;
  cursor: pointer;
`;

const StyledAiFillLike = styled(AiFillLike)`
  font-size: 15px;
  color: #ffffff;
  padding: 3px;
  background: #356aed;
  border-radius: 50px;
  cursor: pointer;
`;

const SecondStyledAiFillDislike = styled(AiFillDislike)`
  font-size: 25px;
  color: #fc2659;
  cursor: pointer;
`;

const SecondStyledAiFillLike = styled(AiFillLike)`
  font-size: 25px;
  color: #356aed;
  cursor: pointer;
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

function Publication({ pub, owner, isForQuestion }) {
  const [comment, setComment] = useState("");
  const [commentaireState, setCommentaireState] = useState(pub.comments);
  const { auth } = useContext(AuthContext);
  const [date, setDate] = useState("");
  const [idComment, setIdComment] = useState(null);
  const [reaction, setReaction] = useState("");
  const [reactionHover, setReactionHover] = useState(false);
  const [nbComment, setNbComment] = useState();
  const userContext = useContext(ConnectedUser);
  const [user, setUser] = useState(userContext);
  useEffect(() => {
    setUser(userContext);
  }, [userContext]);
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
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${auth.user.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          let commentaireNext = [...commentaireState];
          let myComment = response.data;
          if (idComment !== null) {
            let index = commentaireNext.findIndex(
              (commentaire) => commentaire.id === myComment.comment
            );
            commentaireNext[index].answers.push(myComment);
          } else {
            commentaireNext.push(response.data);
          }

          setComment("");
          setCommentaireState(commentaireNext);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setDate(DateAffiche(pub.created_at));
    setNbComment(parseInt(pub.like) + parseInt(pub.dislike));
  }, [pub]);

  const handleChild = (commentaire) => {
    if (commentaire.type === "reponse") {
      inputRef.current.value = "@" + commentaire.text;
    }
    inputRef.current.focus();
    setIdComment(commentaire.id);
  };
  function liker() {
    let myFormData = new FormData();
    let url = "";
    if (reaction === "like") {
      myFormData.append("vote", 1);
      url = "http://localhost:8000/api/like-dislike/like_publication";
    } else if (reaction === "dislike") {
      myFormData.append("vote", -1);
      url = "http://localhost:8000/api/like-dislike/dislike_publication";
    } else if (reaction === "undo") {
      myFormData.append("vote", 0);
      url = "http://localhost:8000/api/like-dislike/undo_publication";
    }
    if (url !== "") {
      myFormData.append("publication", pub.id);
      axios
        .post(url, myFormData, {
          headers: {
            Authorization: `Bearer ${auth.user.accessToken}`,
          },
        })
        .then((reponse) => {
          console.log(pub);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleLikeClick = () => {
    setReaction("like");
    liker();
    setReactionHover(false);
  };
  const handleDislikeClick = () => {
    setReaction("dislike");
    liker();
    setReactionHover(false);
  };
  const HandleReaction = () => {
    console.log("paaaaaaaaaaa");
    if (reaction === "like" || reaction === "dislike") {
      setReaction("undo");
      liker();
    }
  };
  var buttonDeReaction;
  if (reaction === "like") {
    buttonDeReaction = <SecondStyledAiFillLike onClick={handleLikeClick} />;
  } else if (reaction === "dislike") {
    buttonDeReaction = (
      <SecondStyledAiFillDislike onClick={handleDislikeClick} />
    );
  } else {
    buttonDeReaction = <StyledMdOutlineAddReaction onClick={HandleReaction} />;
  }

  // console.log(pub);
  return (
    // <div>{console.log(owner)}</div>
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
        {/* <TextTitle>{pub.question_concerned.contents}</TextTitle> */}
        {!isForQuestion && (
          <TextTitle to={`/question/${pub.question_concerned.slug}`}>
            {pub.question_concerned.contents}
          </TextTitle>
        )}
        <TextBody dangerouslySetInnerHTML={{ __html: pub.contents }} />
      </TextWrapper>
      <ImageWrapper>
        <StyledImage
          src={`http://localhost:8000${pub.images[0].image}`}
          alt="ImagePost"
        />
      </ImageWrapper>
      <DetailPubWrapper>
        <p>
          {nbComment > 0
            ? `${nbComment} personnes ont réagit`
            : "Aucune réaction pour le moment"}
        </p>
        <p>{pub.nb_comment > 0 ? pub.nb_comment : 0} commentaires</p>
      </DetailPubWrapper>
      <MiniMenu>
        <ReactionWrapper
          onMouseOver={() => {
            setReactionHover(true);
          }}
          onMouseOut={() => {
            setReactionHover(false);
          }}
        >
          <ReactButtonSelect hover={reactionHover}>
            <StyledAiFillLike onClick={handleLikeClick} />
            <StyledAiFillDislike onClick={handleDislikeClick} />
          </ReactButtonSelect>
          <StyledButton
            onClick={() => {
              setReaction("undo");
            }}
          >
            {buttonDeReaction}
            <ReagirButton onClick={HandleReaction} reaction={reaction}>
              Réagir
            </ReagirButton>
          </StyledButton>
        </ReactionWrapper>
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
      <form onSubmit={handleCommentSubmit}>
        <InputWrapper>
          <div>
            <MiniUSerImg
              src={`http://localhost:8000${user.profile_photo}`}
              alt={`Profile de ${user.profile_photo}`}
            />
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
