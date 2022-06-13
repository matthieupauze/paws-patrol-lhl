import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Map from "./components/Map";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
