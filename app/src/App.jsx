import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';
import Account from './components/Account';
import Device from './components/Device';
import Contact from './components/Contact';
import Confirm from './components/Confirm';
import Update from './components/Update';
import Perimeter from './components/Perimeter';

function App() {
  const [logged, setLogged] = useState(document.cookie.split('=')[1]);
  const PORT = process.env.PORT || import.meta.VIT_PORT_EXPRESS;
  console.log(PORT)

  return (
    <>
      <Header logged={logged} setLogged={setLogged} />
      <Routes>
        <Route path="/" element={<Map interactive perimeter={false} track />} />
        <Route path="/device" element={<Device PORT={PORT} />} />
        <Route path="/perimeter" element={<Perimeter PORT={PORT} />} />
        <Route path="/account" element={<Account PORT={PORT} />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/confirm" element={<Confirm />} /> */}
        <Route path="/update" element={<Update PORT={PORT} />} />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="/login" element={<Login logged={logged} setLogged={setLogged} />} />
        <Route path="/register" element={<Register logged={logged} setLogged={setLogged} />} />
        <Route
          path="*"
          element={
            <div className="d-flex login justify-content-center align-items-center">
              <h2 className="text-white">404 page not found</h2>
            </div>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
