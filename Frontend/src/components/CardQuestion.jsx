import styled from "styled-components";
import fontStyle from "../utils/styles/fontStyle";
import image from '../assets/userImg/user1.png';
import colors from "../utils/styles/colors";
import {AiFillDislike, AiFillLike} from"react-icons/ai";
import { MdOutlineAddReaction } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { FaShare } from "react-icons/fa";




function CardQuestion() {

    const Container = styled.div`
        background: #FFFFFF;
        display: flex;
        flex-direction: column;s
        justify-content: center;
        align-items: center;
        padding : 20px;
        gap: 20px;
        border-radius: 20px;
    `;
    const CardHeader = styled.div`
    
    `;
    const ProfilWrapper = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;
    const UserPubImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  `;
  const Username = styled.h1`
    ${fontStyle.BodyHighLight}
    margin-top:10px;
  `;

    const DatePost = styled.p`
    ${fontStyle.Body};
    color: ${colors.backgroundDark};
    font-size: 12px;
    margin-top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

    const TextQuestion = styled.div`
        color : #000000;
        ${fontStyle.BodyHighLight};
        text-decoration : none;
  `;
    const ButtonGroupWrapper = styled.div`
        display: flex;
        flex-direction: column;
        gap : 10px;
    `;
    const ButtonSup = styled.div`
        display: flex;
        justify-content:center;
        align-items: center;
        gap: 30px;
    `;
    const ButtonInf = styled.div`
        display: flex;
        justify-content:center;
        alig-items: center;
        gap: 30px;
    `;
    const SubButton = styled.div`
        font-size: 12px;
        color: #000000;
    `;
    const LikeWrapper = styled.div`
        border: none;
        background: #D9D9D9;
        color:${colors.secondary};
        cursor: pointer;
        display:flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 7px ;
        width: 100px;
        height: 20px;
        border-radius: 5px;
    `;
    const DislikeWrapper = styled.div`
        border: none;
        background: #D9D9D9;        
        color:${colors.secondary};
        cursor: pointer;
        display:flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 7px ;
        width: 100px;
        height: 20px;
        border-radius: 5px;
    `;
    const AnswerWrapper = styled.div`
        border: none;
        background: #D9D9D9;
        color:${colors.secondary};
        cursor: pointer;
        display:flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 7px ;
        width: 100px;
        height: 20px;
        border-radius: 5px;
    `;
    const ShareWrapper = styled.div`
        border: none;
        background: #D9D9D9;
        color:${colors.secondary};
        cursor: pointer;
        display:flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        padding: 7px;
        width: 100px;
        height: 20px;
        border-radius: 5px;
    `;
   
    const StyledBiComment = styled(BiComment)`
        font-size: 15px;
        color: ${colors.secondary};
        padding: 3px;
        background: #FFFFFF;
        border-radius: 50px;
        cursor: pointer;
    `;
    const StyledFaShare = styled(FaShare)`
        font-size: 15px;
        color: ${colors.secondary};
        padding: 3px;
        background: #FFFFFF;
        border-radius: 50px;
        cursor: pointer;
    `;
    const StyledAiFillLike = styled(AiFillLike)`
        font-size: 15px;
        color: #FFFFFF;
        padding: 3px;
        background: ${colors.primary};
        border-radius: 50px;
        cursor: pointer;
    `;
    const StyledAiFillDislike = styled(AiFillDislike)`
        font-size: 15px;
        color: #FFFFFF;
        padding: 3px;
        background: #FC2659;
        border-radius: 50px;
        cursor: pointer;
    `;

    


    return(
        <div>
            <Container>
                <CardHeader>
                    <ProfilWrapper>
                    <UserPubImg
                        src={image}
                        alt={image}
                    />
                    </ProfilWrapper>
                    <Username>Mame Diarra Diop</Username>
                    <DatePost>14 Décembre 2023, 20h 17</DatePost>
                </CardHeader>
                <TextQuestion>
                    Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. 
                    Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. 
                    Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor
                </TextQuestion>
                <ButtonGroupWrapper>
                    <ButtonSup>
                        <LikeWrapper><StyledAiFillLike /><SubButton>100 Likes</SubButton></LikeWrapper>
                        <DislikeWrapper><StyledAiFillDislike /> <SubButton>123 Dislikes</SubButton></DislikeWrapper>
                    </ButtonSup>
                    <ButtonInf>
                        <AnswerWrapper><StyledBiComment /><SubButton>276 Reponses</SubButton></AnswerWrapper>
                        <ShareWrapper><StyledFaShare/><SubButton>980 Partages</SubButton></ShareWrapper>
                    </ButtonInf>
                </ButtonGroupWrapper>
            </Container>
        </div>
    )
}

export default CardQuestion;