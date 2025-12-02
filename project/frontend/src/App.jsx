// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx"; 
import Lesson1 from "./Lesson1.jsx";   // <-- you will create this


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/lesson/1" element={<Lesson1 />} />
    </Routes>
  );
}

export default App;
