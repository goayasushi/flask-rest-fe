import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/hello")
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);
  return <div className="App">{message}</div>;
}

export default App;
