import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';
import Account from './components/Account';
import Device from './components/Device';
import Contact from './components/Contact';
import Confirm from './components/Confirm';
import Update from './components/Update';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/device" element={<Device />} />
        {/* <Route path="/perimeter" element={<Perimeter />} /> */}
        <Route path="/account" element={<Account />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update" element={<Update />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="*" element={<h2>404 page not found</h2>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
