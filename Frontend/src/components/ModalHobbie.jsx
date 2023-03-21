import { useContext, useState, useEffect } from "react";
import colors from "../utils/styles/colors";
import styled from "styled-components";
import fontStyle from "../utils/styles/fontStyle";
import { MdClose } from "react-icons/md";
import ListCentreInteret from "../datas/ListCentreInteret";
import { SelectionContext, AuthContext } from "../utils/styles/Contexte";
import axios from "axios";

const InputHeadStyle = styled.input`
  outline: none;
  border: 1px solid #d9d9d9;
  width: 430px;
  height: 30px;
  border-radius: 30px;
  background: #d9d9d9;
  padding: 0 10px;
  &::focus {
    background: #ffffff;
  }
  margin-bottom: 0px;
`;

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
  top: 100px;
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
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const ButtonStyled = styled.button`
  ${fontStyle.Body}
  color:  ${({ text }) => (text ? colors.colorDark : colors.colorLight)};
  width: 100%;
  text-decoration: none;
  border-radius: 5px;
  background-color: ${({ text }) => (text ? "#DDDDDD" : colors.primary)};
  cursor: ${({ text }) => (text ? " not-allowed" : "pointer")};
  padding: 10px 110px;
  border: none;
  margin: 10px 0;
  margin-top: 10px;
  &:hover {
    transition: 0.5s;
    box-shadow: ${({ text }) => (text ? `0 0 2px ${colors.primary}` : "none")};
  }
`;

const ListWrapper = styled.ul`
  height: 150px;
  margin: 0 15px;
  padding: 10px;
  overflow: scroll;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const ElementStyle = styled.li`
    padding: 5px 10px;
    display: flex;
    border-radius: 10px;
    gap: 20px;
    cursor:pointer;
    border:${({ etat }) => (etat ? `1px solid ${colors.primary}` : "none")}
    &:hover{
        background-color: #DDDDDD;
    }
`;

const SelectContainer = styled.div``;

const SelectWrapper = styled.ul`
  border: solid 1px #dddddd;
  border-radius: 10px;
  padding: 10px;
  height: 80px;
  overflow: scroll;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const ElementSelected = styled.li`
  padding: 0 10px;
  margin: 0;
  border-radius: 10px;
  background-color: #ecf3ff;
  color: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function ModalHobbie({
  onCloselayClick,
  onOverlayClick,
  onHobbieSubmit,
}) {
  const { selections } = useContext(SelectionContext);
  const { auth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState(data);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/hobbie/", {
        headers: { Authorization: `Bearer ${auth.user.accessToken}` },
      })
      .then((res) => {
        setData(res.data.results);
      })
      .catch((error) => console.log(error));
  }, [auth.user.accessToken]);
  useEffect(() => {
    setSearch(data);
  }, [data]);
  const handleSearch = (e) => {
    setText(e.target.value);
    setSearch(
      data.filter((dt) =>
        dt.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    if (search.length === 0) {
      setSearch(data);
    }
  };
  return (
    <div>
      <Overlay onClick={onOverlayClick}></Overlay>
      <Container>
        <StyledModal>
          <Head>
            <div>
              <Profile>
                <h1>Choisissez les domaines liés à votre question</h1>
              </Profile>
            </div>
            <div>
              <StyledMdClose onClick={onCloselayClick} />
            </div>
          </Head>
          <Body>
            <InputHeadStyle
              type="text"
              placeholder="Que rechercher vous ?"
              value={text}
              onChange={handleSearch}
            />
            <ListWrapper>
              {search.length > 0
                ? search.map((element) => {
                    return <Element element={element} />;
                  })
                : "Introuvable 🙈😟"}
            </ListWrapper>
            <SelectContainer>
              <SelectWrapper>
                {selections.map((element) => {
                  return <ElementSelected>{element.name}</ElementSelected>;
                })}
              </SelectWrapper>
            </SelectContainer>
          </Body>
          <Foot>
            {/* <ButtonStyled text={validText} disabled={!text ? true : false} onClick={onHobbieSubmit} >Poser une question</ButtonStyled> */}
            <ButtonStyled onClick={onHobbieSubmit}>Terminer</ButtonStyled>
          </Foot>
        </StyledModal>
      </Container>
    </div>
  );
}

export function Element({ element }) {
  const [isSelect, setSelect] = useState(false);
  const { selections, saveSelection, deleteSelection } =
    useContext(SelectionContext);
  const saveReply = (element) => {
    let verifie = false;
    selections.map((val, index) => {
      if (val.id === element.id) {
        deleteSelection(index);
        verifie = true;
      }
      return 0;
    });
    if (!verifie) {
      saveSelection(element);
    }
  };
  return (
    <ElementStyle
      etat={!isSelect}
      onClick={() => {
        setSelect(!isSelect);
        saveReply(element);
      }}
    >
      <div>
        <UserImg
          src={element.image}
          key={`user${element.id}`}
          alt={`user${element.id}`}
        />
      </div>
      <div>
        <h1>{element.name}</h1>
      </div>
    </ElementStyle>
  );
}
