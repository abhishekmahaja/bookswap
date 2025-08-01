import { Routes, Route, Navigate } from "react-router";
import React, { Suspense } from "react";
import signUp from "./pages/signup.jsx";
import "./index.css";
import Loading from "./component/loading.jsx";

const App = () => {
  return (
    <div className="main--container">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/signup" element={<signUp />} />
          {/* <Route path="/signup" element={<signup />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;