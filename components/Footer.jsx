"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="FooterText">
        &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
