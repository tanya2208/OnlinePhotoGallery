import React, { useState, memo } from "react";
import { useSelector } from "react-redux";

function Header() {
  return (
    <>
      <h1>header</h1>
    </>
  );
}

export default memo(Header);