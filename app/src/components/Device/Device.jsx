import { useState, useEffect } from 'react';
import { Form, Button, Card, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Map from '../Map';

const { VITE_PORT_EXPRESS } = import.meta.env;

function Device() {
  const [form, setForm] = useState(false);
  const [devices, setDevices] = useState([
    // {name: "Device 1", imei: "1"},
    // {name: "Device 2", imei: "2"}
  ]);
  const [radioImei, setRadioImei] = useState('1');
  const radios = devices;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDevice = {
      name: e.target[0].value,
      imei: e.target[1].value,
      microchip: e.target[2].value,
    };
    const newDevices = [...devices, newDevice];
    setDevices(newDevices);
    console.log(VITE_PORT_EXPRESS);
    axios
      .post(`http://localhost:${VITE_PORT_EXPRESS}/api/device/${newDevice.imei}`, newDevice)
      .then((res) => setForm(!form), console.log('device uploaded'))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const loadDevices = async () => {
      const { data } = await axios.get(`http://localhost:${VITE_PORT_EXPRESS}/api/device`);
      setDevices(data);
    };
    loadDevices();
  }, []);

  return (
    <>
      {form && (
        <section className="login d-flex justify-content-center align-items-center flex-column">
          <Map interactive={false} />
          <div className="info">
            <h2 className="centered">Devices</h2>
            <Card className="m-3 p-3 rounded w-25 ph-color w-100">
              <Form className="d-flex flex-column justify-content-center " onSubmit={handleSubmit}>
                <Form.Group className="form-group my-2 p-3">
                  <Form.Control
                    className="form-control bg-transparent text-white ph-color"
                    type="text"
                    id="name"
                    placeholder="Device Name"
                  />
                </Form.Group>
                <Form.Group className="form-group my-2 pb-3 px-3">
                  <Form.Control
                    className="form-control form-control bg-transparent text-white ph-color"
                    type="text"
                    id="imei"
                    placeholder="Device IMEI"
                  />
                </Form.Group>
                <Form.Group className="form-group my-2 pb-3 px-3">
                  <Form.Control
                    className="form-control bg-transparent text-white ph-color"
                    type="text"
                    id="microchip"
                    placeholder="Microchip Number"
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
      )}
      {!form && (
        <section className="login d-flex justify-content-center align-items-center flex-column">
          <Map interactive={false} />
          <div className="info w-25">
            <h2 className="centered">Devices</h2>
            <Card className="p-3 w-100 rounded ph-color">
              <ButtonGroup className="mb-3 d-flex flex-column gap-2 rounded">
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    name="radio"
                    value={radio.imei}
                    checked={radioImei === radio.imei}
                    variant={radioImei === radio.imei ? 'secondary' : 'transparent'}
                    onChange={(e) => setRadioImei(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                  // react initial render get request api to get all the devices useeffect to set Devices to all the devices available in the db
                ))}
              </ButtonGroup>
              <div className="d-grid gap-3">
                <Link to="/device">
                  <Button
                    type="submit"
                    className="btn-color rounded w-100"
                    onClick={(e) => {
                      setForm(!form);
                    }}
                  >
                    Add Device
                  </Button>
                </Link>
                <Link to="/device">
                  <Button type="submit" className="btn-color rounded w-100">
                    Edit Device
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}

export default Device;
