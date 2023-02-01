import styled from "styled-components";
import colors from "../utils/styles/colors";
import fontStyle from "../utils/styles/fontStyle";
import photoUser from "../assets/user.png";


const Container = styled.div`
    width: 100%;
`;
const MoreComment = styled.button`
    background:none;
    border:none;
    color: ${colors.secondary};
    &:hover {
        text-decoration: underline;
    }
`;

const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Comment = styled.div`
   
`;

const CommentGroup = styled.div`
    display: flex;
    gap: 20px;
    margin: 10px 0;
    padding-right: 20px;
`;

const CommentAuthor = styled.button`
    ${fontStyle.BodyHighLight};
    background:none;
    border:none;
    margin: 5px 0;
    padding:0;
`;

const MiniUSerImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const CommentBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #EEEEEE;
    border-radius: 20px;
    padding:10px;
`;

const CommentOptions = styled.div`
    display: flex;
`;

const ButtonOption = styled.button`
    background:none;
    border:none;
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



function CommentPost(){
   return(
    <Container>
        <MoreComment>Voir plus de commentaires</MoreComment>
        <CommentsContainer>
            <CommentGroup>
            <MiniUSerImg
                src={photoUser}
                alt="Image"
            />
            <Comment>
                <CommentBody>                
                    <CommentAuthor>Halimatou Sadiya Ndiaye</CommentAuthor>
                    <CommentText>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </CommentText> 
                </CommentBody>
                <CommentOptions>
                    <div><ButtonOption>Réagir</ButtonOption></div>
                    <div><ButtonOption>Répondre</ButtonOption></div>
                    <div><ButtonOption>20H</ButtonOption></div>
                </CommentOptions> 
            </Comment>
            </CommentGroup>
            <CommentGroup>
            <MiniUSerImg
                src={photoUser}
                alt="Image"
            />
            <Comment>
                <CommentBody>
                    <CommentAuthor>Halimatou Sadiya Ndiaye</CommentAuthor>
                    <CommentText>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </CommentText> 
                </CommentBody>
                <CommentOptions>
                    <div><ButtonOption>Réagir</ButtonOption></div>
                    <div><ButtonOption>Répondre</ButtonOption></div>
                    <div><ButtonOption>20H</ButtonOption></div>
                </CommentOptions> 
            </Comment>
            </CommentGroup>
        </CommentsContainer>
    </Container>
   )
}

export default CommentPost;