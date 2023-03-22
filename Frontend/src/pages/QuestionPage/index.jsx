import Header from "../../components/Header";
import { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/styles/colors";
import Timeline from "../../components/Timeline";
import Question from "../../components/Question";
import SideRight from "../../components/SideRight";
import CardQuestion from "../../components/CardQuestion";
import {
  ConnectedUserProvider,
  AuthContext,
} from "../../utils/styles/Contexte";
import Error from "../Error";
import Publication from "../../components/Publication";

import axios from "axios";

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

function QuestionPage() {
  const [question, setQuestion] = useState({});
  const { slug } = useParams();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/question/${slug}`, {
        headers: {
          Authorization: `Bearer ${auth.user.accessToken}`,
        },
      })
      .then((response) => {
        let question = response.data;
        setQuestion(question);
      })
      .catch((error) => {
        console.log("error");
        return <Error />;
      });
  }, [auth.user.accessToken, slug]);
  console.log(question);
  if (Object.keys(question).length !== 0) {
    return (
      <div>
        <ConnectedUserProvider>
          <Container>
            <Header page={"home"} />
            <Body>
              <LeftSidebar>
                <CardQuestion questionParam={question} />
              </LeftSidebar>
              <TimelineContainer>
                <Question owner={question.owner} question={question} />
                {question.responses.length
                  ? question.responses.map((publication, index) => {
                      return (
                        <Publication
                          owner={publication.owner}
                          pub={publication}
                          key={index}
                        />
                      );
                    })
                  : ""}
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
}

export default QuestionPage;
