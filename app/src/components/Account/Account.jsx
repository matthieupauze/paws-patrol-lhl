import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Map from '../Map';

const { VITE_PORT_EXPRESS } = import.meta.env;

function Account() {
  const [users, setUsers] = useState([
    {
      name: 'Robbie Prokop',
      phone: '1-234-567-8909',
      email: 'support@paw-patrol.com',
      password: '123456789',
    },
  ]);

  useEffect(() => {
    const loadUsers = async () => {
      const { data } = await axios.get(`http://localhost:${VITE_PORT_EXPRESS}/api/user`);
      console.log(data);
      setUsers({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
    };
    console.log(users);
    loadUsers();
  }, []);
  return (
    <section className=" d-flex justify-content-center align-items-center flex-column">
      <Map interactive={false} />
      <div className="info">
        <h2 className="centered">Account Info</h2>
        <Card className="text-center rounded form">
          <Card.Body>
            <Card.Text>Name</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1 text-white">
              {users.name}
            </Card.Title>
            <Card.Text>Phone</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1 ">{users.phone}</Card.Title>
            <Card.Text>Email</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1">{users.email}</Card.Title>
            <Card.Text>Password</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1">{users.password}</Card.Title>
          </Card.Body>
        </Card>
        <div className="d-grid mt-3">
          <Button className="btn-color rounded">Edit</Button>
        </div>
      </div>
    </section>
  );
}
export default Account;
