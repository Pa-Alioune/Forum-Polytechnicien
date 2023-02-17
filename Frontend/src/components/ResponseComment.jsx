import styled from "styled-components";
import colors from "../utils/styles/colors";
import fontStyle from "../utils/styles/fontStyle";
import DateAffiche from "../utils/functions/DateAffiche";

const Container = styled.div`
  width: 100%;
`;
const MoreComment = styled.button`
  background: none;
  border: none;
  color: ${colors.secondary};
  &:hover {
    text-decoration: underline;
  }
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Comment = styled.div``;

const CommentGroup = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px 0;
  padding-right: 20px;
`;

const CommentAuthor = styled.button`
  ${fontStyle.BodyHighLight};
  background: none;
  border: none;
  margin: 5px 0;
  padding: 0;
`;

const MiniUSerImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: #eeeeee;
  border-radius: 10px;
  padding: 2px 10px;
`;

const CommentOptions = styled.div`
  display: flex;
`;

const ButtonOption = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: ${colors.secondary};
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const CommentText = styled.p`
  ${fontStyle.Body};
  margin: 0;
`;

function ResponseComment({ commentaires, handleResponseClick }) {
  const handleResponse = (commentaire) => {
    handleResponseClick({
      id: commentaire.comment,
      text: commentaire.answerer.name,
      type: "reponse",
    });
  };
  return (
    <Container>
      <CommentsContainer>
        {commentaires.length > 0
          ? commentaires.map((commentaire, index) => {
              if (index < 100) {
                return (
                  <CommentGroup key={index}>
                    <MiniUSerImg
                      src={`http://localhost:8000${commentaire.answerer.profile_photo}`}
                      alt="Image"
                    />
                    <Comment>
                      <CommentBody>
                        <CommentAuthor>
                          {commentaire.answerer.name}
                        </CommentAuthor>
                        <CommentText>{commentaire.contents}</CommentText>
                      </CommentBody>
                      <CommentOptions>
                        <div>
                          <ButtonOption>Réagir</ButtonOption>
                        </div>
                        <div>
                          <ButtonOption
                            onClick={() => {
                              handleResponse(commentaire);
                            }}
                          >
                            Répondre
                          </ButtonOption>
                        </div>
                        <div>
                          <ButtonOption>
                            {DateAffiche(commentaire.created_at)}
                          </ButtonOption>
                        </div>
                      </CommentOptions>
                    </Comment>
                  </CommentGroup>
                );
              }
            })
          : ""}
      </CommentsContainer>
      {commentaires.length > 0 ? (
        <MoreComment>Voir plus de réponses</MoreComment>
      ) : (
        ""
      )}
    </Container>
  );
}

export default ResponseComment;
