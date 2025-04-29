import React from "react";
import styles from "./GetCatButton.module.css";

function GetCatButton({ onClick, disabled, isLoading }) {
  const buttonClasses = `${styles.button} ${disabled ? styles.disabled : ""} ${
    isLoading ? styles.loading : ""
  }`;

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClasses}>
      {isLoading ? "Loading..." : "Get Cat"}
    </button>
  );
}

export default GetCatButton;
