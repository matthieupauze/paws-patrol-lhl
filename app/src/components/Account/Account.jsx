import { useEffect, useState } from 'react';
import { Form, Button, Card, Toast } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Map from '../Map';
import 'react-toastify/dist/ReactToastify.css';

function Account() {
  const [users, setUsers] = useState({});
  console.log(import.meta);

  const updateUser = async (e) => {
    e.preventDefault();
    const user = {
      name: e.target[0].value,
      phone: e.target[1].value,
      email: e.target[2].value,
      password: e.target[3].value,
    };
    const data = await axios.patch(`http://localhost:${PORT}/api/user`, user);
    if (data.error) {
      return toast('An error occured while updating, please try again briefly.');
    }
    return toast('Account information updated.');
  };

  useEffect(() => {
    const loadUsers = async () => {
      const { data } = await axios.get(`http://localhost:${PORT}/api/user`);
      console.log(data);
      setUsers({
        id: data.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
    };
    loadUsers();
  }, []);
  return (
    <section className=" d-flex justify-content-center align-items-center flex-column">
      <Map interactive={false} />
      <div className="info">
        <h2 className="centered">Account Info</h2>
        <Card className="m-3 p-3 rounded w-25 ph-color w-100">
          <Form className="d-flex flex-column justify-content-center " onSubmit={updateUser}>
            <Form.Group className="form-group my-2 p-3">
              <Form.Control
                className="form-control bg-transparent text-white ph-color"
                type="text"
                id="name"
                defaultValue={users.name}
              />
            </Form.Group>
            <Form.Group className="form-group my-2 pb-3 px-3">
              <Form.Control
                className="form-control form-control bg-transparent text-white ph-color"
                type="text"
                id="phone"
                defaultValue={users.phone}
              />
            </Form.Group>
            <Form.Group className="form-group my-2 pb-3 px-3">
              <Form.Control
                className="form-control bg-transparent text-white ph-color"
                type="email"
                id="email"
                defaultValue={users.email}
              />
            </Form.Group>
            <Form.Group className="form-group my-2 pb-3 px-3">
              <Form.Control
                className="form-control bg-transparent text-white ph-color"
                type="password"
                id="password"
                defaultValue={users.password}
              />
            </Form.Group>
            <Form.Group className=" my-2 px-3">
              <Button type="submit" className="btn-color rounded w-100">
                Update
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </div>
      <ToastContainer autoClose={2500} />
    </section>
  );
}
export default Account;
