import React from "react";
import "./App.css";
import Form from "./components/Form";
import data from "./data.json";
import logo from "./logo.png";

const App = () => {
  return (
    <div className="App">
      <div className="logo-container">
        <img src={logo} className="logo" alt="Aero Garden" />
      </div>
      <Form data={data} />
    </div>
  );
};

export default App;
