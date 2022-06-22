import { useState, useEffect } from 'react';
import { Form, Button, Card, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import path from 'node:path';
import Map from '../Map';

function Device({ PORT }) {
  const [form, setForm] = useState(false);
  const [devices, setDevices] = useState([]);
  const [deviceImei, setdeviceImei] = useState('0');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDevice = {
      name: e.target[0].value,
      id: e.target[1].value,
      microchip: e.target[2].value,
    };
    const newDevices = [...devices, newDevice];
    setDevices(newDevices);

    axios
      .post(`/api/device/${newDevice.id}`, newDevice)
      .then((res) => setForm(!form), console.log('device uploaded'))
      .catch((err) => console.log(err));
  };

  const deleteItem = async (id) => {
    axios
      .delete(`/api/device/${id}`)
      .then(() => {
        setDevices(devices.filter((d) => d.id !== id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/device`);
      setDevices(data);
    })();
  }, []);

  return (
    <>
      {form && (
        <section className=" d-flex justify-content-center align-items-center flex-column animate">
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
            <p className="text-white">Keep track of multiple pets with multiple devices!</p>
            <Card className="p-3 w-100 rounded ph-color">
              <ButtonGroup className="mb-3 d-flex flex-column gap-2 rounded">
                {devices.map(
                  (device, idx) => (
                    console.log('Device:', device),
                    (
                      <ToggleButton
                        key={idx}
                        id={`device-${idx}`}
                        type="radio"
                        name="device"
                        value={device.id}
                        checked={Number(deviceImei) === device.id}
                        variant={Number(deviceImei) === device.id ? 'secondary' : 'transparent'}
                        onChange={(e) => setdeviceImei(e.currentTarget.value)}
                        className="list-item"
                      >
                        <div className="d-flex justify-content-between px-3">
                          <div>{device.name}</div>
                          <Button className="delete-button" onClick={() => deleteItem(device.id)}>
                            <img src="" alt="" />
                          </Button>
                        </div>
                      </ToggleButton>
                    )
                    // react initial render get request api to get all the devices useeffect to set Devices to all the devices available in the db
                  )
                )}
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
