import styled from "styled-components";
import colors from "../utils/styles/colors";
import logoDark from "../assets/LogoForumESPDark.png";
import userPhoto from "../assets/user.png";
import { AiFillHome } from "react-icons/ai";
import { FaEdit, FaShare } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { MdGroups, MdNotifications, MdClose, MdOutlineAddReaction, MdOutlineComment } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { RiQuestionnaireLine } from "react-icons/ri";


const HeaderWrapper = styled.div`
    height: 80px;
    width:100%;
    background: ${colors.colorLight};
    position:fixed;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);    
    z-index:5;
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
    padding: 25px 12px;
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

const StyledAiFillHome = styled(AiFillHome)`
    font-size : 30px;
    color: ${({page})=> page === "home" ? colors.primary : colors.secondary};
`;

const StyledFaEdit = styled(FaEdit)`
    font-size : 30px;
    color: ${({page})=> page === "edit" ? colors.primary : colors.secondary};

`;

const StyledTiMessages = styled(TiMessages)`
    font-size : 30px;
    color: ${({page})=> page === "message" ? colors.primary : colors.secondary};

`;

const StyledMdGroups = styled(MdGroups)`
    font-size : 30px;
    color: ${({page})=> page === "espace" ? colors.primary : colors.secondary};

`;

const StyledMdNotifications = styled(MdNotifications)`
    font-size : 30px;
    color: ${({page})=> page === "notification" ? colors.primary : colors.secondary};

`;

function Header({page}){

    return(
        <HeaderWrapper>
            <LogoWrapper>
                <img src={logoDark} alt="Logo" />
            </LogoWrapper>
            <Menu>
                <ListeMenu page={page}  ><StyledAiFillHome page={page} /></ListeMenu>
                <ListeMenu page={page}  ><StyledFaEdit page={page}/></ListeMenu>
                <ListeMenu page={page}  ><StyledTiMessages page={page} /></ListeMenu>
                <ListeMenu page={page}  ><StyledMdGroups page={page}/></ListeMenu>
                <ListeMenu page={page}  ><StyledMdNotifications page={page}/></ListeMenu>
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