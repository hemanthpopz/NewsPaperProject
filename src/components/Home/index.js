import { useEffect, useState } from "react";

import { Audio } from "react-loader-spinner";

import { TbArticleOff } from "react-icons/tb";
import "./index.css";

import axios from "axios";

import Line from "../Images/Line.png";

import NewsPaperFirstImage from "../Images/NewsPaperFirstImage.jpg";

import NewsPaperSecondImage from "../Images/NewSecondImage.png";

function Home() {
  const [mainData, SetMainData] = useState([]);

  const [category, setCategory] = useState("Business");

  const [searchInput, onCangeSearchInput] = useState("");

  const [apiStatus, setApiStatus] = useState("IN-PROGRESS");

  useEffect(() => {
    toGetData();
  }, [category]);

  const toGetData = async () => {
    setApiStatus("IN-PROGRESS");

    const url = "https://ok.surf/api/v1/cors/news-feed";

    const result = await fetch(url);

    if (result.ok) {
      const mainResult = await result.json();

      if(category === 'Business'){

        SetMainData(mainResult.Business);
      }else if (category === 'Entertainment'){
        SetMainData(mainResult.Entertainment);

      }else if(category === 'Health'){

        SetMainData(mainResult.Health);


      }else if(category === 'Science'){

        SetMainData(mainResult.Science);


      }else{

        SetMainData(mainResult.Technology);


      }


      setApiStatus("SUCCESS");
    }
  };


  const onChangeSelect = (event) =>{

    setCategory(event.target.value)
    toGetData()
  }


  const onChangeSearch = (event) => {
    onCangeSearchInput(event.target.value);
  };


  const filteredData = mainData.filter((eachArticle) =>
    eachArticle.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  

  const toShowMainResult = () => {
    if (filteredData.length === 0 && apiStatus === "SUCCESS") {
      return (
        <div className="no-article-container">
          <TbArticleOff className="no-article-icon" />
          <h1 className="not-found-heading">NO ARTICLES FOUND</h1>
        </div>
      );
    } else if (mainData.length !== 0) {
      return (
        <ul className="article-list">
          {filteredData.map((eachItem) => (
            <a className="link" target="_blank" href={eachItem.link}>
              <li className="each-article">
                <h1 className="article-heading">{eachItem.title}</h1>

                <div className="each-article-image-container">
                  <img src={eachItem.og} className="article-image" />
                </div>
              </li>
            </a>
          ))}
        </ul>
      );
    } else {
      return (
        <div className="loader-container">
          <Audio
            height="80"
            width="80"
            radius="9"
            color="black"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      );
    }
  };

  

  return (
    <div className="container">
      <div className="content-container">
        <img src={Line} className="line" />

        <div className="home-text-container">
          <h1 className="news-heading">NEWSPAPER</h1>
          <h1 className="bharat-news-heading">THE BHARAT NEWS</h1>

          <img src={Line} className="line" />
        </div>

        <div className="home-first-image-container">
          <img src={NewsPaperFirstImage} className="paper-first-image" />
          <div className="home-first-text-container">
            <p className="bharat-logo-text">The Bharat News</p>
            <p className="bharat-first-des">
              Welcome to the Bharat News! lorem "Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
        </div>

        <h1 className="welcome-heading">Welcome</h1>

        <img src={Line} className="line" />

        <div className="home-second-content-container">
          <div className="home-second-text-container">
            <p className="bharat-second-heading">WELCOME TO THE BHARAT NEWS </p>
            <p className="bharat-second-des">
              Welcome to the Bharat News! lorem "Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>

          <div className="home-second-image-container">
            <img src={NewsPaperSecondImage} className="home-second-image" />
          </div>
        </div>

        <div className="side-heading-container">
          <h1 className="side-heading">The Bharat News</h1>
        </div>

        <img src={Line} className="line" />

        <div className="home-third-content-container">
          <h1 className="third-heading">LIST OF ARTICLES</h1>

          <div className="user-input-container">
            <form>
              <input
                onChange={onChangeSearch}
                className="user-search"
                type="text"
                placeholder="Search"
              />
            </form>

            <div className="select-container">
              <label className="select-label" htmlFor="user-select">
                Select Category
              </label>
              <select onChange={onChangeSelect} id="user-select" className="user-select">
                <option value='Business'>Business</option>
                <option value='Entertainment' >Entertainment</option>
                <option value='Health' >Health</option>
                <option value='Science' >Science</option>
                <option value='Technology' >Technology</option>
              </select>
            </div>
          </div>

          {toShowMainResult()}
        </div>
      </div>
    </div>
  );
}

export default Home;
