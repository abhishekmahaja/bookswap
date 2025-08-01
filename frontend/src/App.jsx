import { Routes, Route, Navigate } from "react-router";
import React, { Suspense } from "react";
import SignUp from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import "./index.css";
import Loading from "./component/loading.jsx";

const App = () => {
  return (
    <div className="main--container">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
