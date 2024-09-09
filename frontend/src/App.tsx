import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LoginScreen from "./screens/LoginScreen/Login";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-blue-600 pt-16 flex h-screen">
        <LoginScreen />
      </div>
    </>
  );
}

export default App;
