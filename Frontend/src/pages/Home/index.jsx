import styled from "styled-components";
import colors from "../../utils/styles/colors";
import Header from "../../components/Header";


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
    height:150vh;    
    max-width:35em;
    position: relative;
    border-radius:10px;
    top:80px;
    left : 22.3em;  
    margin: 20px 0;
    top:80px;
    background: ${colors.primary};
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
    return(
        <div>
            <Container>
                <Header />
                <Body>
                    <LeftSidebar></LeftSidebar>
                    <TimeLine></TimeLine>
                    <RightSidebar></RightSidebar>
                </Body>
            </Container>
        </div>
    )
}

export default Home;