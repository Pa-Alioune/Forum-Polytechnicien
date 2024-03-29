import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import QuoiDeNeuf from "../../components/QuoiDeNeuf";
import QuestionNew from "../../components/QuestionNew";
import PostNew from "../../components/PostNew";
import Timeline from "../../components/Timeline";
import SideLeft from "../../components/SideLeft";
import SideRight from "../../components/SideRight";
import { ConnectedUserProvider } from "../../utils/styles/Contexte";

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  background: #eef5ff;
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
  const [myPosted, setMyPosted] = useState(null);

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
  const handlePostedPost = (post) => {
    setMyPosted(post);
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
              onPosted={handlePostedPost}
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
              <Timeline addedPost={myPosted} />
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
