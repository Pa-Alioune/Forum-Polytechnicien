import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./utils/styles/GlobalStyle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CentreInteret from "./pages/CentreInteret";
import Error from "./pages/Error";
import Home from "./pages/Home";
import QuestionPage from "./pages/QuestionPage";
import {
  SelectionProvider,
  AuthProvider,
  NewUserProvider,
  MyQuestionProvider,
} from "./utils/styles/Contexte";
import RequireAuth from "./components/RequireAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NewUserProvider>
      <AuthProvider>
        <MyQuestionProvider>
          <SelectionProvider>
            <GlobalStyle />
            <Router>
              <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<RequireAuth />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/center" element={<CentreInteret />} />
                  <Route path="/question/:slug" element={<QuestionPage/>} />
                </Route>

                <Route path="/*" element={<Error />} />
              </Routes>
            </Router>
          </SelectionProvider>
        </MyQuestionProvider>
      </AuthProvider>
    </NewUserProvider>
  </React.StrictMode>
);
