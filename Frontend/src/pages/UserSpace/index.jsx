import Header from "../../components/Header";
import styled from "styled-components";
import fontStyle from "../../utils/styles/fontStyle";
import colors from "../../utils/styles/colors";
import user1 from "../../assets/userImg/user12.png";
import TimeLine from "../../components/Timeline";

const Bannier = styled.div`
    position: relative;
    top: 80px;
    height: 310px;
    display: flex;
    flex-direction : column;
    padding: 0px 150px;
    box-shadow : 1px 0.5px 10px ${colors.secondary};
    
`;
const Container = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    margin : 30px;
`;
const Menu = styled.ul`
    display : flex;
    align-items: center;
    padding-top: 5px;
    border-top : 1px solid ${colors.secondary};
    color: ${colors.secondary};
    list-style: none;
`;

const ElementMenu = styled.li`
    display : flex;
    align-items: center;
    margin : 0;
    padding : 10px;
    margin: 0 5px;
`;
const User = styled.div`
    display : flex;
    align-items: center;
    gap : 20px;
`;
const Button = styled.button`
padding: 10px 20px;
cursor: pointer;
color: ${colors.backgroundLight};
display: flex;
align-items: center;
gap: 5px;
background: ${colors.primary};
border: none;
border: 1px solid #d9d9d9;
border-radius: 7px;
&:hover {
  background: #FFF;  
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
}
`;
const Image = styled.div``;
const UserImg = styled.img`
    width: 180px;
`;
const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap : 10px;
`;
const Name = styled.div`
    ${fontStyle.Title1};
    font-size : 30px;
`;
const Fonction = styled.div`
    ${fontStyle.Title2};
    font-size : 20px;
    color : ${colors.secondary}
`;
const FollowInfo = styled.div`
    display: flex;
    gap : 20px;
    ${fontStyle.BodyHighLight};
    color : ${colors.secondary}
`;
const Abonne = styled.div``;
const Abonnement = styled.div``;
const PageBody = styled.div`
    display : flex;
    justify-content: space-between;
    padding: 0px 150px;
`;
const Left = styled.div`
    width: 22em;
    position: relative;
    margin: 20px 0;
    top: 80px;
    display: flex;
    background : #fff;
    border-radius: 7px;
    padding: 20px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;
const Right = styled.div`
    max-width: 35em;
    position: relative;
    top: 80px;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;








const UserSpace =()=>{
    return(
        <div>
            <Header page={'home'}/>
            <Bannier>
                <Container>
                    <User>
                        <Image>
                            <UserImg src={user1} />
                        </Image>
                        <TextGroup>
                            <Name>Malick NDIAYE</Name>
                            <Fonction>Etudiant en Génie Informatique</Fonction>
                            <FollowInfo>
                                <Abonne>1270 abonnés</Abonne>
                                <Abonnement>1100 abonnements</Abonnement>
                            </FollowInfo>
                        </TextGroup>
                    </User>
                    <Button>Modifier mon profile</Button>
                </Container>
                <Menu>
                        <ElementMenu>Publications</ElementMenu>
                        <ElementMenu>A propos</ElementMenu>
                        <ElementMenu>Réponses</ElementMenu>
                        <ElementMenu>Questions</ElementMenu>
                        <ElementMenu>Abonnés</ElementMenu>
                        <ElementMenu>Suivis</ElementMenu>
                </Menu>
            </Bannier>

            <PageBody>
                <Left></Left>
                <Right><TimeLine /></Right>
            </PageBody>
        </div>
    )
}

export default UserSpace;