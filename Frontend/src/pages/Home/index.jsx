import { useContext,useState } from "react";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import Header from "../../components/Header";
import QuoiDeNeuf from "../../components/QuoiDeNeuf";
import Publication from "../../components/Publication";
import Question from "../../components/Question";
import QuestionNew from "../../components/QuestionNew";
import PostNew from "../../components/PostNew";
import ModalHobbie from "../../components/ModalHobbie";
import { AuthContext } from "../../utils/styles/Contexte";
import Timeline from "../../components/Timeline";


const Container = styled.div`
    box-sizing:border-box;
    position:relative;
    display:flex;
    flex-direction:column;
    background:#263789;
`;

const Body = styled.div`
    position:relative;
    padding-bottom:60px;
    background-color: #D2E0F4;
    z-index:1;
`;

const TimeLine = styled.div`
    height:600vh;    
    max-width:35em;
    position: relative;
    top:80px;
    left : 22.3em;  
    margin: 20px 0;
    top:80px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const LeftSidebar = styled.div`
    height:500px;
    position:fixed;
    border-radius:20px;
    left:0px;
    top:80px;
    margin: 20px;
    width: 25%;
    background: ${colors.colorLight};
`;
const RightSidebar = styled.div`
    height:500px;
    position:fixed;
    border-radius:20px;
    top:80px;
    right:0px;
    margin:20px;
    width: 25%;
    background: ${colors.colorLight};
`;

function Home(){
    const {auth} = useContext(AuthContext);
    const [showModalQuestion, setShowModalQuestion] = useState(false);
    const [showModalPost, setShowModalPost] = useState(false);
    const [showModalHobbie, setShowModalHobbie] = useState(false);
    
    // console.log(`Refresh Token : ${auth.user.refreshToken}`);
    // console.log(`Access Token : ${auth.user.accessToken}`);

    const handleQuestionClick= ()=>{
        setShowModalQuestion(true);
    }

    const handlePostClick= ()=>{
        setShowModalPost(true);
        setShowModalHobbie(false);
    }
    const handleOverlayClick= ()=>{
        setShowModalPost(false);
        setShowModalQuestion(false);
        setShowModalHobbie(false);
    }
    const handleCloseClick= ()=>{
        setShowModalPost(false);
        setShowModalQuestion(false);
    }

    const handleHobbieClick = ()=>{
        setShowModalPost(false);
        setShowModalQuestion(false);
        setShowModalHobbie(true);
    }
    const handleHobbieClose = ()=>{ 
        setShowModalHobbie(false);
        setShowModalPost(false);
        setShowModalQuestion(true);
    }

    const handleHobbieSubmit = ()=>{
        setShowModalPost(false);
        setShowModalQuestion(true);
        setShowModalHobbie(false);
    }

    return(
        <div>
            <Container>
                <Header page={"home"}/>
                {showModalQuestion && <QuestionNew onOverlayClick={handleOverlayClick} onCloselayClick={handleCloseClick} onHobbieClick={handleHobbieClick}/>}
                {showModalPost && <PostNew onOverlayClick={handleOverlayClick} onCloselayClick={handleCloseClick} onHobbieClick={handleHobbieClick}/>}
                {/* {showModalHobbie && <ModalHobbie onOverlayClick={handleHobbieClose} onCloselayClick={handleHobbieClose} onHobbieSubmit={handleHobbieSubmit} />} */}
                <Body>
                    <LeftSidebar></LeftSidebar>
                    <Timeline />
                        {/* <QuoiDeNeuf onQuestionClick={handleQuestionClick} onPublicationClick={handlePostClick} />
                        <Publication/>
                        <Question />
                    </TimeLine> */}
                    <RightSidebar></RightSidebar>
                </Body>
            </Container>
        </div>
    )
}

export default Home;