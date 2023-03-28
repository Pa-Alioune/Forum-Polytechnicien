import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext, ConnectedUser } from "../utils/styles/Contexte";
import axios from "axios";
import Question from "./Question";
import Publication from "./Publication";

export default function TimeLine(addedPost) {
  const { auth } = useContext(AuthContext);
  const user = useContext(ConnectedUser);
  const [publications, setPublications] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/timeline/", {
        headers: { Authorization: `Bearer ${auth.user.accessToken}` },
      })
      .then((res) => {
        setPublications(res.data);
      })
      .catch((error) => console.log(error));
  }, [auth.user.accessToken]);
  useEffect(() => {
    if (addedPost !== undefined && addedPost.addedPost !== null) {
      let tmp = publications;
      tmp.push(addedPost.addedPost);
      console.log(tmp);
      setPublications(tmp);
    }
  }, [addedPost]);
  return (
    <>
      {publications !== null &&
        publications.map((publication, index) => {
          if (
            publication !== null &&
            publication.owner !== undefined &&
            publication.owner !== null
          ) {
            if (publication.type === "publication") {
              return (
                <Publication
                  owner={publication.owner}
                  pub={publication}
                  key={index}
                  user={user}
                />
              );
            } else {
              return (
                <Question
                  owner={publication.owner}
                  question={publication}
                  key={index}
                  user={user}
                />
              );
            }
          }
        })}
    </>
  );
}
