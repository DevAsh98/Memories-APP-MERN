import React from "react";
import { useEffect } from "react";
import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/PostDetails/PostDetails";
import { Navigate } from "react-router-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Auth from "./components/Auth/Auth";
import { gapi } from "gapi-script";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile")); //getting the user's profile
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId:
          "198513098220-tkfbmdgjv575tfh0cfije936ajg5555p.apps.googleusercontent.com",
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/post/:id" exact element={<PostDetails />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />{" "}
          {/* for logged in user auth page will be inaccessible */}
          <Route path="*" exact element={<ErrorPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
