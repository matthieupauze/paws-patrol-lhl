import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';
import Account from './components/Account';
import Device from './components/Device';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/device" element={<Device />} />
        {/* <Route path="/perimeter" element={<Perimeter />} /> */}
        <Route path="/account" element={<Account />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
