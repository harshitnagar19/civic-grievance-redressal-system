import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpWrapper from "./Components/userSignup/signUpWrapper"


export default function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<SignUpWrapper />} />
      </Routes>
    </Router>
  );
}