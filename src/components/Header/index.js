import React, { useState } from "react";
import logo from "../../assets/logo.png";
import "./index.css";
import { DEFAULTNAME } from '../../utils/constant';

const Header = () => {
  const [deptName, setDeptName] = useState(DEFAULTNAME);

  return (
    <header>
      <img loading="lazy" src={logo} alt="SGPGI" className="logo" />
      <input
        className="dept-input-field"
        name="dept-name"
        type="text"
        placeholder="Enter Department"
        value={deptName}
        onChange={e => setDeptName(e.target.value)}
        autoComplete="off"
      />
    </header>
  );
};

export default Header;
