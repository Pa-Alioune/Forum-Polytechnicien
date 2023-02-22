import styled from "styled-components";
import photo from "../assets/user.png";
import fontStyle from "../utils/styles/fontStyle";
import ListGroupe from "../datas/ListGroupe";
import { MdAdd } from "react-icons/md";
import { useContext } from "react";
import { AuthContext, ConnectedUser } from "../utils/styles/Contexte";

const Container = styled.div`
  padding: 20px;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 10px;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;
const UserProfilPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;
const UserName = styled.span`
  ${fontStyle.BodyHighLight};
`;
const CreateGroupButton = styled.button`
  padding: 10px 72px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(200, 200, 200, 0.5);
  border: none;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #fff;
  }
`;
const GroupeWrapper = styled.ul`
  padding: 0;
  margin: 20px 5px;
  list-style: none;
`;
const GroupeItem = styled.li`
  padding: 5px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;
const GroupeImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;
const GroupeName = styled.span`
  ${fontStyle.Body};
`;

function SideLeft() {
  const { auth } = useContext(AuthContext);
  const user = useContext(ConnectedUser);
  console.log(user);
  return (
    <Container>
      <UserProfile>
        <UserProfilPhoto src={user.profile_photo} alt="UserPhoto" />
        <UserName>{user.name}</UserName>
      </UserProfile>
      <CreateGroupButton>
        <MdAdd />
        <span>Créer un groupe</span>
      </CreateGroupButton>
      <GroupeWrapper>
        {ListGroupe.map((groupe) => {
          return (
            <GroupeItem key={groupe.name + "var"}>
              <GroupeImg src={groupe.image} alt="Image" />
              <GroupeName>{groupe.name}</GroupeName>
            </GroupeItem>
          );
        })}
      </GroupeWrapper>
    </Container>
  );
}

export default SideLeft;
