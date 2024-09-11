import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LoginScreen from "./screens/LoginScreen/Login";
import ProtectRoute from "./utils/ProtectRoutes/ProtectRoute";
import Alert from "./components/Alert/Alert";
import RegisterScreen from "./screens/RegisterScreen/Register";
import useAuth from "./utils/customHooks/useAuth";

function App() {
  const isSignedIn = useAuth();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Alert />
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
                  <RegisterScreen />
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
