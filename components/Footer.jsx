import React from "react";
import {
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Cool Headphoones All Rights Reserved</p>
      <p className="icons">
        <AiOutlineTwitter />
        <AiOutlineGithub />
        <AiOutlineInstagram />
      </p>
    </div>
  );
};

export default Footer;
