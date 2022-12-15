import styled from "styled-components";
import colors from "../utils/styles/colors";
import logoDark from "../assets/LogoForumESPDark.png";
import userPhoto from "../assets/user.png";


const HeaderWrapper = styled.div`
    height: 80px;
    width:100%;
    background: ${colors.colorLight};
    position:fixed;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);    
    z-index:100;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-items:center;
`;


const Menu = styled.div`
    display:flex;
    align-items:center;
    list-style:none;
    gap: 45px;
    height: 100%;
    justify-content:space-between;
`;
const LogoWrapper = styled.div`
    width: 300px;
`;

const ListeMenu = styled.li`
    width: 50px;
    color:${colors.secondary};
    padding: 30px 12px;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor:pointer;
    &:hover{
        color:${colors.primary};
        border-bottom : solid 5px ${colors.primary} ;
    }   
`;

 
const HeadRight = styled.div`
    display : flex;
    margin-right:40px;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const MiniUSerImg = styled.img`
    width: 48px;
    height:48px;
    border-radius: 50%;
`;

const InputHeadStyle = styled.input`
    outline:none;
    border:1px solid #D9D9D9;
    width: 230px;
    height:35px;
    border-radius: 20px;
    background: #D9D9D9;
    padding: 0 10px;
    &::focus{
        background: #FFFFFFF;
    }
`;

function Header(){

    return(
        <HeaderWrapper>
            <LogoWrapper>
                <img src={logoDark} alt="Logo" />
            </LogoWrapper>
            <Menu>
                <ListeMenu>Home</ListeMenu>
                <ListeMenu>Creer</ListeMenu>
                <ListeMenu>Messagerie</ListeMenu>
                <ListeMenu>Espaces</ListeMenu>
                <ListeMenu>Notifications</ListeMenu>
            </Menu>
            <HeadRight>
                <div><InputHeadStyle type="text" placeholder="Que rechercher vous ?"/></div>
                <div>
                    <MiniUSerImg src={userPhoto} alt="user" />
                </div>
            </HeadRight>
        </HeaderWrapper>
    )

}

export default Header;