// ToggleSwitch.js
import React, { useState, useEffect } from "react";
import "./ToggleSwitch.scss";

const ToggleSwitch = ({ name }) => {
  const [isChecked, setIsChecked] = useState(() => {
    // Read initial state from localStorage or default to false if not found
    return localStorage.getItem(name) === "true";
  });

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    localStorage.setItem(name, newState);
    if (newState === true) {
      if (name === "holiday") {
        alert("Holiday declared");
      }
      if (name === "editbutton") {
        alert("Mark edit allowed");
      }
    }
  };

  useEffect(() => {
    // Set the initial state based on localStorage when component mounts
    const initialState = localStorage.getItem(name) === "true";
    setIsChecked(initialState);
  }, [name]);

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        name={`toggleSwitch-${name}`}
        id={`toggleSwitch-${name}`}
        checked={isChecked}
        onChange={handleToggle}
      />
      <label
        className="toggle-switch-label"
        htmlFor={`toggleSwitch-${name}`}
      >
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
