import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import Header from "../../components/Header";
import QuoiDeNeuf from "../../components/QuoiDeNeuf";
import Publication from "../../components/Publication";
import Question from "../../components/Question";
import QuestionNew from "../../components/QuestionNew";
import PostNew from "../../components/PostNew";
import ModalHobbie from "../../components/ModalHobbie";
import Timeline from "../../components/Timeline";
import SideLeft from "../../components/SideLeft";
import SideRight from "../../components/SideRight";
import {
  AuthContext,
  ConnectedUserProvider,
} from "../../utils/styles/Contexte";

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #EEF5FF;
`;

const Body = styled.div`
  position: relative;
  padding-bottom: 60px;
  background-color: #d2e0f4;
  z-index: 1;
`;

const TimelineContainer = styled.div`
  max-width: 35em;
  position: relative;
  top: 80px;
  left: 22.3em;
  margin: 20px 0;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LeftSidebar = styled.div`
  height: 500px;
  position: fixed;
  border-radius: 20px;
  left: 0px;
  top: 80px;
  margin: 20px;
  overflow: scroll;
  width: 25%;
`;
const RightSidebar = styled.div`
  height: 500px;
  position: fixed;
  border-radius: 20px;
  top: 80px;
  right: 0px;
  margin: 20px;
  width: 25%;
  overflow: scroll;
`;

function Home() {
  const [showModalQuestion, setShowModalQuestion] = useState(false);
  const [showModalPost, setShowModalPost] = useState(false);
  const [showModalHobbie, setShowModalHobbie] = useState(false);

  const handleQuestionClick = () => {
    setShowModalQuestion(true);
  };
  const handlePostClick = () => {
    setShowModalPost(true);
    setShowModalHobbie(false);
  };
  const handleOverlayClick = () => {
    setShowModalPost(false);
    setShowModalQuestion(false);
    setShowModalHobbie(false);
  };
  const handleCloseClick = () => {
    setShowModalPost(false);
    setShowModalQuestion(false);
  };

  const handleHobbieClick = () => {
    setShowModalPost(false);
    setShowModalQuestion(false);
    setShowModalHobbie(true);
  };
  const handleHobbieClose = () => {
    setShowModalHobbie(false);
    setShowModalPost(false);
    setShowModalQuestion(true);
  };

  const handleHobbieSubmit = () => {
    setShowModalPost(false);
    setShowModalQuestion(true);
    setShowModalHobbie(false);
  };

  return (
    <div>
      <ConnectedUserProvider>
        <Container>
          <Header page={"home"} />
          {showModalQuestion && (
            <QuestionNew
              onOverlayClick={handleOverlayClick}
              onCloselayClick={handleCloseClick}
              onHobbieClick={handleHobbieClick}
            />
          )}
          {showModalPost && (
            <PostNew
              onOverlayClick={handleOverlayClick}
              onCloselayClick={handleCloseClick}
              onHobbieClick={handleHobbieClick}
            />
          )}
          {/* {showModalHobbie && <ModalHobbie onOverlayClick={handleHobbieClose} onCloselayClick={handleHobbieClose} onHobbieSubmit={handleHobbieSubmit} />} */}
          <Body>
            <LeftSidebar>
              <SideLeft />
            </LeftSidebar>
            <TimelineContainer>
              <QuoiDeNeuf
                onQuestionClick={handleQuestionClick}
                onPublicationClick={handlePostClick}
              />
              <Timeline />
            </TimelineContainer>
            <RightSidebar>
              <SideRight />
            </RightSidebar>
          </Body>
        </Container>
      </ConnectedUserProvider>
    </div>
  );
}

export default Home;
