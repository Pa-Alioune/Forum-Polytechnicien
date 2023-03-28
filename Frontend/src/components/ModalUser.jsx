import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../utils/styles/UseAuth";
import styled from "styled-components";
import fontStyle from "../utils/styles/fontStyle";
import { MdSettings, MdHelp, MdQuickreply, MdLogout } from "react-icons/md";
import userPhoto from "../assets/user1.png";
import { useContext } from "react";
import { ConnectedUser } from "../utils/styles/Contexte";
import colors from "../utils/styles/colors";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1040;
  overflow: hidden;
`;

const Container = styled.div`
  position: fixed;
  top: 80px;
  right: 10px;
  width: 340px;
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
  box-shadow: 0px 0px 6px #777;
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
  height: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledMdSettings = styled(MdSettings)`
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border: none;
  background: #dddddd;
  padding: 4px;
  border-radius: 50%;
`;

const StyledMdHelp = styled(MdHelp)`
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border: none;
  background: #dddddd;
  padding: 4px;
  border-radius: 50%;
`;

const StyledMdQuickreply = styled(MdQuickreply)`
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border: none;
  background: #dddddd;
  padding: 4px;
  border-radius: 50%;
`;

const StyledMdLogout = styled(MdLogout)`
  font-size: 1.4rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border: none;
  background: #dddddd;
  padding: 4px;
  border-radius: 50%;
`;

const MiniUSerImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  border: solid 1px #d9d9d9;
`;

const Profile = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  text-decoration: none;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const UserName = styled.h1`
  ${fontStyle.BodyHighLight};
  color: #000;
`;

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const ElementStyle = styled.li`
  display: flex;
  align-items: center;
  border-radius: 10px;
  gap: 20px;
  cursor: pointer;
  padding: 5px 10px;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export function ModalUser({ onOverlayClick }) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };
  const user = useContext(ConnectedUser);
  return (
    <div>
      <Overlay onClick={onOverlayClick}></Overlay>
      <Container>
        <StyledModal>
          <Head>
            <Profile to={`/userSpace/${user.slug}`}>
              <div>
                <MiniUSerImg
                  src={`http://localhost:8000${user.profile_photo}`}
                  alt="user"
                />
              </div>
              <div>
                <UserName>{user.name}</UserName>
              </div>
            </Profile>
          </Head>
          <Body>
            <ListWrapper>
              <ElementStyle>
                <StyledMdSettings /> <h1>Paramètre et confidentiel</h1>
              </ElementStyle>
              <ElementStyle>
                <StyledMdHelp /> <h1>Aide et Assistance</h1>{" "}
              </ElementStyle>
              <ElementStyle>
                <StyledMdQuickreply />
                <h1> Donner son avis</h1>
              </ElementStyle>
              <ElementStyle onClick={handleLogout}>
                <StyledMdLogout /> <h1>Deconnexion</h1>
              </ElementStyle>
            </ListWrapper>
          </Body>
        </StyledModal>
      </Container>
    </div>
  );
}
