import { useRef, useEffect, useState, useContext } from "react";
import colors from "../utils/styles/colors";
import styled from "styled-components";
import fontStyle from "../utils/styles/fontStyle";
import { MdClose } from "react-icons/md";
import userPhoto1 from "../assets/user1.png";
import { ModalHobbie } from "./ModalHobbie";
import BoiteAlerte from "./BoiteAlerte";
import {
  SelectionContext,
  MyQuestion,
  AuthContext,
} from "../utils/styles/Contexte";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1040;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const Container = styled.div`
  position: fixed;
  top: 150px;
  left: 30%;
  width: 500px;
  z-index: 1050;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: 10px;
  background: blue;
`;

const StyledModal = styled.div`
  z-index: 100;
  background: #fff;
  position: relative;
  margin: 0;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  padding: 1rem;
  height: 100%;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div``;

const Foot = styled.div``;
const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const StyledMdClose = styled(MdClose)`
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border: none;
  background: #dddddd;
  padding: 4px;
  border-radius: 50%;
`;
const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

const UserName = styled.h1`
  ${fontStyle.BodyHighLight};
  margin: 0;
`;

const Visibilite = styled.button`
  ${fontStyle.Body};
  color: ${colors.backgroundDark};
  font-size: 12px;
`;
const WrapperProfile = styled.div`
  display: flex;
  flex-direction: column;
  justifiy-content: center;
  align-items: flex-start;
`;

const Text = styled.div``;

const InputText = styled.textarea`
  outline: none;
  border: none;
  position: relative;
  left: 0;
  width: 480px;
`;

const Option = styled.div``;

const ButtonStyled = styled.button`
  ${fontStyle.Body}
  color:  ${({ text }) => (text ? colors.colorLight : colors.colorDark)};
  width: 100%;
  text-decoration: none;
  border-radius: 5px;
  background-color: ${({ text }) => (text ? colors.primary : "#DDDDDD")};
  cursor: ${({ text }) => (text ? "pointer" : " not-allowed")};
  padding: 10px 110px;
  border: none;
  margin: 10px 0;
  margin-top: 10px;
  &:hover {
    transition: 0.5s;
    box-shadow: ${({ text }) => (text ? `0 0 2px ${colors.primary}` : "none")};
  }
`;
const ButtonStyledCenter = styled.button`
  ${fontStyle.Body}
  color:  ${({ text }) => (text ? colors.colorLight : colors.colorDark)};
  width: 100%;
  text-decoration: none;
  border-radius: 5px;
  background-color: #dddddd;
  cursor: pointer;
  padding: 10px 110px;
  border: none;
  margin: 20px 0;
  margin-top: 30px;
  &:hover {
    transition: 0.5s;
    box-shadow: 0 0 2px ${colors.primary};
  }
`;

function QuestionNew({ onCloselayClick, onOverlayClick }) {
  const textRef = useRef();
  const [text, setText] = useState("");
  const [validText, setValidText] = useState(false);
  const [hobbie, setHobbie] = useState(false);
  const { selections, viderSelection } = useContext(SelectionContext);
  const [selectHobbies, setSelectHobbies] = useState([]);
  const [erreur, setErreur] = useState("");
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    textRef.current.focus();
  }, []);

  useEffect(() => {
    setValidText(text ? true : false);
  }, [validText, text]);
  const handleHobbieSubmit = () => {
    setHobbie(false);
    selections.map((newSelection) => {
      setSelectHobbies([...selectHobbies, newSelection.id]);
      //   console.log(selectHobbies);
    });
  };
  useEffect(() => {
    setErreur("");
  }, [text]);
  const navigate = useNavigate();
  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("contents", text);
    selections.forEach((element) => {
      formData.append("hobbies", element.id);
    });
    axios
      .post("http://localhost:8000/api/questions/", formData, {
        headers: {
          Authorization: `Bearer ${auth.user.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setHobbie(false);
          onCloselayClick();
          viderSelection();
          //   navigate("/");
        }
      })
      .catch((error) => {
        setErreur(error.response.data.contents.toString());
        console.log(error.response.data.contents.toString());
      });
  };

  return hobbie ? (
    <ModalHobbie
      onOverlayClick={() => {
        setHobbie(false);
      }}
      onCloselayClick={() => {
        setHobbie(false);
      }}
      onHobbieSubmit={handleHobbieSubmit}
    />
  ) : (
    <div>
      <Overlay onClick={onOverlayClick}></Overlay>
      <BoiteAlerte erreur={erreur} />
      <Container>
        <StyledModal>
          <Head>
            <div>
              <Profile>
                <div>
                  <UserImg src={userPhoto1} alt="user" />
                </div>
                <WrapperProfile>
                  <UserName>Mouhamed Gueye</UserName>
                  <Visibilite>Public</Visibilite>
                </WrapperProfile>
              </Profile>
            </div>
            <div>
              <StyledMdClose onClick={onCloselayClick} />
            </div>
          </Head>
          <form onSubmit={handleQuestionSubmit}>
            <Body>
              <Text>
                <InputText
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  ref={textRef}
                  rows="7"
                ></InputText>
              </Text>
              <Option></Option>
            </Body>
            <Foot>
              <ButtonStyledCenter
                onClick={() => {
                  setHobbie(true);
                }}
              >
                Ajouter vos centres d'intérêts
              </ButtonStyledCenter>
              <ButtonStyled
                type="submit"
                text={validText}
                disabled={!text ? true : false}
              >
                Poser une question
              </ButtonStyled>
            </Foot>
          </form>
        </StyledModal>
      </Container>
    </div>
  );
}
export default QuestionNew;
