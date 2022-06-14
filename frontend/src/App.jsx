import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Map from "./components/Map";
import Account from "./components/Account"
import Device from "./components/Device"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/device" element={<Device />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
