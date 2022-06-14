import { useState } from "react";
import { ListGroup, ListGroupItem, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom"

const Device = () => {
  const [devices, setDevices] = useState([]);
  console.log("devices ", devices)
  console.log(devices.length === 0)
  return (
    <>
    {devices.length === 0 &&
      <section className="login d-flex justify-content-center align-items-center flex-column">
        <Form className="d-flex flex-column justify-content-center h-25 w-50">
          <Form.Group className="form-group my-3 p-3 ">
            <Form.Control
              className="form-control bg-transparent text-white ph-color"
              type="text"
              id="name"
              placeholder="Device Name"
            />
          </Form.Group>
          <Form.Group className="form-group my-3 p-3 ">
            <Form.Control
              className="form-control bg-transparent text-white ph-color"
              type="text"
              id="pet-name"
              placeholder="Pet Name"
            />
          </Form.Group>
          <Form.Group className="form-group my-3 p-3 ">
            <Form.Control
              className="form-control bg-transparent text-white ph-color"
              type="number"
              id="microchip"
              placeholder="Microchip Number"
            />
          </Form.Group>
          <Form.Group className="form-group mb-3 p-3">
            <Form.Control
              className="form-control form-control bg-transparent text-white ph-color"
              type="number"
              id="imei"
              placeholder="Device IMEI"
            />
          </Form.Group>
          <Link to='/'>
            <Button type="submit" className="btn-color rounded w-100">
              Add Device
            </Button>
          </Link>
        </Form>
      </section>
    }
    {devices.length !== 0 &&
      <section className="login d-flex justify-content-center align-items-center flex-column">
        <Card className="my-3 py-3 rounded">
          <ListGroup>
            <ListGroupItem>Device 1</ListGroupItem>
            <ListGroupItem>Device 2</ListGroupItem>
            <ListGroupItem>Device 3</ListGroupItem>
          </ListGroup>
          <div className="d-grid gap-2">

            <Link to='/'>
              <Button type="submit" className="btn-color rounded w-100 ">
                Add Device
              </Button>
            </Link>
            <Link to='/'>
              <Button type="submit" className="btn-color rounded w-100">
                Edit Device
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    }
    </>
  );
};

export default Device