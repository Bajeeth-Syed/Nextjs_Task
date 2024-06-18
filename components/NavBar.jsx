"use client";
import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const MenuItem = styled.li`
  margin: 0 1rem;

  @media (max-width: 768px) {
    margin: 1rem 0;
    text-align: center;
  }
`;

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 1rem",
        backgroundColor: "#a52cca",
        color: "#fff",
      }}
    >
      <Logo>
        <Link href="/">Zorang.com</Link>
      </Logo>
      <ul
        style={{ display: "flex", listStyle: "none", gap: "20px" }}

        // @media (max-width: 768px) {
        //   flexDirection: "column",
        //   position: "absolute";
        //   top: 70px;
        //   left: 0;
        //   width: 100%;
        //   background-color: #333;
        //   padding: 0;
        //   margin: 0;
        //   display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
        // }}}
      >
        <MenuItem>
          <Link href="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/about">About</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/services">Services</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/contact">Contact</Link>
        </MenuItem>
      </ul>
    </nav>
  );
};

export default Navbar;
