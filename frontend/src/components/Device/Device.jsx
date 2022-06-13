import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export const Device = () => {
  const [devices, setDevices] = useState([]);
  
    return (
      <>
      {devices.length === 0 &&
      <section className="login d-flex justify-content-center align-items-center flex-column">
        <form className="d-flex flex-column justify-content-center h-25 w-50">
          <div className="form-group my-3 p-3 ">
            <input
              className="form-control bg-transparent text-white ph-color"
              type="text"
              id="name"
              placeholder="Device Name"
            />
          </div>
          <div className="form-group my-3 p-3 ">
            <input
              className="form-control bg-transparent text-white ph-color"
              type="text"
              id="pet-name"
              placeholder="Pet Name"
            />
          </div>
          <div className="form-group my-3 p-3 ">
            <input
              className="form-control bg-transparent text-white ph-color"
              type="number"
              id="microchip"
              placeholder="Microchip Number"
            />
          </div>
          <div className="form-group mb-3 p-3">
            <input
              className="form-control form-control bg-transparent text-white ph-color"
              type="number"
              id="imei"
              placeholder="Device IMEI"
            />
          </div>
          <a href='/'><button type="submit" className="btn btn-primary m-3">
            Add Device
          </button></a>
        </form>
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
            <Link to={`/product/${product._id}`}>
            </Link>
          </Card>
        </section>
      }
      </>
    );
  };