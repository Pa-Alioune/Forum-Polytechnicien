import styled from "styled-components";
import fontStyle from "../utils/styles/fontStyle";
import colors from "../utils/styles/colors";
import LisContact from "../datas/ListContact";
import { useState, useEffect, useContext } from "react";
import { AuthContext, ConnectedUser } from "../utils/styles/Contexte";

const Container = styled.div`
  padding: 20px;
`;

const Titre = styled.div`
  ${fontStyle.BodyHighLight};
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.secondary};
`;

const ContactWrapper = styled.ul`
  padding: 0;
  margin: 20px 5px;
  list-style: none;
`;

const Contact = styled.li`
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

const ContactPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const ContactName = styled.span`
  ${fontStyle.Body};
`;
function SideRight() {
  const { auth } = useContext(AuthContext);
  const user = useContext(ConnectedUser);
  const [contact, setContact] = useState(null);
  useEffect(() => {
    let follows =
      user.follows !== null && user.follows !== undefined ? user.follows : [];
    let followers =
      user.followers !== null && user.followers !== undefined
        ? user.followers
        : [];
    let res = follows.concat(
      followers.filter((fol) => {
        let ap = !user.follows.some((folls) => folls.id === fol.id);
        return ap;
      })
    );
    setContact(res);
  }, [user]);
  return (
    <Container>
      <Titre>Mes Contact</Titre>
      <ContactWrapper>
        {contact !== null &&
          contact.map((contact) => {
            return (
              <Contact key={contact.name + "var"}>
                <ContactPhoto
                  src={`http://localhost:8000${contact.profile_photo}`}
                  alt="Image"
                />
                <ContactName>{contact.name}</ContactName>
              </Contact>
            );
          })}
      </ContactWrapper>
    </Container>
  );
}

export default SideRight;
