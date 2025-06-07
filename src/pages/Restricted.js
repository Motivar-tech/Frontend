import React from "react";
import { Link } from "react-router-dom";

export default function Restricted() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "36px",
          fontWeight: "bold",
          color: "#FF0000",
        }}
      >
        Access Restricted
      </h1>
      <p
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "18px",
          color: "#555",
        }}
      >
        Only learners can access this page, sponsors cannot. Please contact support if you believe this is an error.
      </p>
      <Link to="/">
        <button
          style={{
            backgroundColor: "#00AA87",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Go to Home
        </button>
      </Link>
    </div>
  );
}