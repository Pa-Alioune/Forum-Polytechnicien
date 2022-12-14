import styled from "styled-components";
import colors from "../utils/styles/colors";
import userPhoto from "../assets/user.png";
import { AiFillHome } from "react-icons/ai";
import { FaEdit, FaShare } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { MdGroups, MdNotifications, MdClose, MdOutlineAddReaction, MdOutlineComment } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { RiQuestionnaireLine } from "react-icons/ri";

const InputHeadStyle = styled.input`
    outline:none;
    border:1px solid #D9D9D9;
    width: 430px;
    height:45px;
    border-radius: 30px;
    background: #D9D9D9;
    padding: 0 10px;
    &::focus{
        background: #FFFFFF;
    }
`;

const MiniUSerImg = styled.img`
    width: 50px;
    height:50px;
    border-radius: 50%;
    cursor:pointer;
`;

const QuoiDeneuf = styled.div`
    height : 110px;
    background: ${colors.colorLight};
    border-radius:7px; 
    padding:20px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
`;

const InputWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    height: 60%;
`;
const MiniMenu =styled.div`
    display:flex;
    justify-content:space-between;
    padding: 20px;
    border-top: 1px solid #D9D9D9;
    color: ${colors.secondary};
`;

const StyledButton = styled.button`
    border:none;
    background:none;
    color: ${colors.secondary};
    cursor:pointer;
`;

function QuoiDeNeuf(){
    return(
        <div>
            <QuoiDeneuf>
                <InputWrapper>
                    <div><MiniUSerImg src={userPhoto} alt="user" /></div>
                    <div><InputHeadStyle type="text" placeholder="Que rechercher vous ?"/></div>
                </InputWrapper>
                <MiniMenu>
                    <StyledButton><FaEdit/></StyledButton>
                    <StyledButton><RiQuestionnaireLine/></StyledButton>
                    <StyledButton><MdOutlineComment/></StyledButton>
                </MiniMenu>
            </QuoiDeneuf>
        </div>
    )
}

export default QuoiDeNeuf;