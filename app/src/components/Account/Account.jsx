import { useEffect, useState } from 'react';
import { Form, Button, Card, ButtonGroup, ToggleButton } from 'react-bootstrap';
import axios from 'axios';
import Map from '../Map';

const { VITE_PORT_EXPRESS } = import.meta.env;

function Account() {
  const [users, setUsers] = useState(
    {
      id: 1,
      name: 'Robbie Prokop',
      phone: '1-234-567-8909',
      email: 'support@paw-patrol.com',
      password: '123456789',
    },
  );

  const updateUser = (e) => {
    e.preventDefault();
    console.log("hello");
  };

  useEffect(() => {
    const loadUsers = async () => {
      const { data } = await axios.get(`http://localhost:${VITE_PORT_EXPRESS}/api/user`);
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
                    placeholder={users.name}
                  />
                </Form.Group>
                <Form.Group className="form-group my-2 pb-3 px-3">
                  <Form.Control
                    className="form-control form-control bg-transparent text-white ph-color"
                    type="text"
                    id="phone"
                    placeholder={users.phone}
                  />
                </Form.Group>
                <Form.Group className="form-group my-2 pb-3 px-3">
                  <Form.Control
                    className="form-control bg-transparent text-white ph-color"
                    type="text"
                    id="email"
                    placeholder={users.email}
                  />
                </Form.Group>
                <Form.Group className="form-group my-2 pb-3 px-3">
                  <Form.Control
                    className="form-control bg-transparent text-white ph-color"
                    type="password"
                    id="password"
                  />
                </Form.Group>
                <Form.Group className=" my-2 px-3">
                  <Button type="submit" className="btn-color rounded w-100">
                    Add Device
                  </Button>
                </Form.Group>
              </Form>
            </Card>
      </div>
    </section>
  );
}
export default Account;
