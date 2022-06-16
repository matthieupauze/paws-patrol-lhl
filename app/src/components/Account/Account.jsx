import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from "axios";
import Map from "../Map"

function Account() {
  const [users, setUsers] = useState([{name: "Robbie Prokop", phone: "1-234-567-8909", email: "support@paw-patrol.com", password: "123456789"}]);

  // useEffect(() => {
  //   const loadUsers = async () => {
  //     const { data } = await axios.get('http://localhost:8080/api/user');
  //     setUsers(data);
  //   };
  //   loadUsers();
  // }, []);
  return (
    <section className=" d-flex justify-content-center align-items-center flex-column">
      <Map interactive={false}/>
      <div className="info">
        <h2 className='centered'>Account Info</h2>
        <Card className="text-center rounded form">
          <Card.Body>
            <Card.Text>Name</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1 text-white">
              {users[0].name}
            </Card.Title>
            <Card.Text>Phone</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1 ">{users[0].phone}</Card.Title>
            <Card.Text>Email</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1">
            {users[0].email}
            </Card.Title>
            <Card.Text>Password</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1">{users[0].password}</Card.Title>
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
