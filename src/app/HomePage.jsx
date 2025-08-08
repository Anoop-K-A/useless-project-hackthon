"use client";
import React from "react";
import { useState } from "react";
import Home from "./page";
import Random from "./Random";
import Demotivation from "./Demotivation";
import ImageChecker from "./ImageChecker";
import "./HomePage.css";

function HomePage() {
  let [page, setPage] = useState("Home");
  return (
    <div>
      <div className="frame">
        <div className="options">
          <div
            className="option"
            onClick={() => {
              setPage("Home");
            }}
          >
            home
          </div>
          <div
            className="option"
            onClick={() => {
              setPage("Image");
            }}
          >
            image
          </div>
          <div
            className="option"
            onClick={() => {
              setPage("Random");
            }}
          >
            random
          </div>
        </div>
        <div className="content">
          {page === "Home" && <Demotivation />}
          {page === "Image" && <ImageChecker />}
          {page === "Random" && <Random />}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
