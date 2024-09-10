import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LoginScreen from "./screens/LoginScreen/Login";
import ProtectRoute from "./utils/ProtectRoutes/ProtectRoute";

function App() {
  const isSignedIn = false;
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="bg-blue-600 pt-16 flex h-screen">
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectRoute isSignedIn={!isSignedIn} navigateTo="/">
                  <LoginScreen />
                </ProtectRoute>
              }
            ></Route>

            <Route
              path="/register"
              element={
                <ProtectRoute isSignedIn={!isSignedIn} navigateTo="/">
                  <h1>Register Screen</h1>
                </ProtectRoute>
              }
            ></Route>
            <Route
              path="/"
              element={
                <ProtectRoute isSignedIn={isSignedIn}>
                  <h1>HomeScreen</h1>
                </ProtectRoute>
              }
            ></Route>

            <Route
              path="/*"
              element={
                isSignedIn ? <Navigate to="/" /> : <Navigate to="/login" />
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
