import styled from "styled-components";
import colors from "../utils/styles/colors";
import userPhoto from "../assets/user.png";
import { FaEdit } from "react-icons/fa";
import { MdOutlineComment } from "react-icons/md";
import { RiQuestionnaireLine } from "react-icons/ri";
import { AuthContext, ConnectedUser } from "../utils/styles/Contexte";
import { useContext } from "react";

const InputHeadStyle = styled.input`
  outline: none;
  border: 1px solid #d9d9d9;
  width: 430px;
  height: 45px;
  border-radius: 30px;
  background: #d9d9d9;
  padding: 0 10px;
  &::focus {
    background: #ffffff;
  }
`;

const MiniUSerImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 55%;
  cursor: pointer;
`;

const QuoiDeneuf = styled.div`
  height: 110px;
  background: ${colors.colorLight};
  border-radius: 7px;
  padding: 20px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50%;
`;
const MiniMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid #d9d9d9;
  color: ${colors.secondary};
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

const StyledFaEdit = styled(FaEdit)`
  font-size: 20px;
`;

const StyledRiQuestionnaireLine = styled(RiQuestionnaireLine)`
  font-size: 20px;
`;

const StyledMdOutlineComment = styled(MdOutlineComment)`
  font-size: 20px;
`;

function QuoiDeNeuf({ onQuestionClick, onPublicationClick }) {
  const user = useContext(ConnectedUser);
  return (
    <div>
      <QuoiDeneuf>
        <InputWrapper>
          <div>
            <MiniUSerImg src={user.profile_photo} alt="user" />
          </div>
          <div>
            <InputHeadStyle type="text" placeholder="Que rechercher vous ?" />
          </div>
        </InputWrapper>
        <MiniMenu>
          <StyledButton onClick={onPublicationClick}>
            <StyledFaEdit />
            <span>Publier</span>
          </StyledButton>
          <StyledButton onClick={onQuestionClick}>
            <StyledRiQuestionnaireLine />
            <span>Demander</span>
          </StyledButton>
          <StyledButton>
            <StyledMdOutlineComment />
            <span>Répondre</span>
          </StyledButton>
        </MiniMenu>
      </QuoiDeneuf>
    </div>
  );
}

export default QuoiDeNeuf;
