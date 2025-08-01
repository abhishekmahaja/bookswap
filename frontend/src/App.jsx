import { Routes, Route, Navigate } from "react-router";
import React, { Suspense } from "react";
import SignUp from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import "./index.css";
import Loading from "./component/loading.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
