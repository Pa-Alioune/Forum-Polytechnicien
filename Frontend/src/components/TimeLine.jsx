import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../utils/styles/Contexte";
import axios from "axios";
import Question from "./Question";
import Publication from "./Publication";
export default function TimeLine() {
  const { auth } = useContext(AuthContext);
  const [publications, setPublications] = useState([]);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/timeline/", {
        headers: { Authorization: `Bearer ${auth.user.accessToken}` },
      })
      .then((res) => {
        setPublications(res.data.user.hobbies);
      })
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:8000/api/user/", {
        headers: { Authorization: `Bearer ${auth.user.accessToken}` },
      })
      .then((res) => {
        setUser(res.data.results[0]);
      })
      .catch((error) => console.log(error));
  }, [auth.user.accessToken]);
  return (
    <>
      {publications.map((publication, index) => {
        let array = [];
        array = publication.questions.map((question) => {
          return (
            <Question
              owner={question.owner}
              question={question}
              key={question.id + index}
              user={user}
            />
          );
        });
        let array2 = [];
        array2 = publication.publications.map((pub) => {
          return (
            <Publication
              owner={pub.owner}
              pub={pub}
              key={pub.id + index}
              user={user}
            />
          );
        });
        return array2.concat(array);
      })}
    </>
  );
}
