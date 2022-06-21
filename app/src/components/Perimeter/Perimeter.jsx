import Map from '../Map';
import { useState, useEffect } from 'react';
import { Button, ButtonGroup, ToggleButton, Card } from 'react-bootstrap';
import axios from 'axios';
const { VITE_PORT_EXPRESS } = import.meta.env;

function Perimeter({ perimeters, setPerimeters }) {
  const [active, setActive] = useState(false);
  const [radioImei, setRadioImei] = useState('');
  const radios = perimeters;

  const deleteItem = async (imei) => {
    const { data } = await axios.delete(
      `http://localhost:${VITE_PORT_EXPRESS}/api/perimeter/${imei}`
    );
  };

  useEffect(() => {
    const loadPerimeters = async () => {
      const { data } = await axios.get(`http://localhost:${VITE_PORT_EXPRESS}/api/perimeter`);
      setPerimeters(data);
    };
    loadPerimeters();
  }, [deleteItem]);

  return (
    <>
      {!active && (
        <section className=" d-flex justify-content-center align-items-center flex-column">
          <Map interactive={active} perimeter={false} />
          <div className="info w-25">
            <h2 className="centered">Perimeter</h2>
            <Card className="p-3 w-100 rounded ph-color">
              <ButtonGroup className="mb-3 d-flex flex-column gap-2 rounded">
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    name="radio"
                    value={radio.id}
                    checked={Number(radioImei) === radio.id}
                    variant={Number(radioImei) === radio.id ? 'secondary' : 'transparent'}
                    onChange={(e) => setRadioImei(e.currentTarget.value)}
                  >
                    <div className="d-flex justify-content-between px-3">
                      <div>{radio.id}</div>
                      <Button className="delete-button" onClick={() => deleteItem(radio.id)}>
                        <img src="" alt="" />
                      </Button>
                    </div>
                  </ToggleButton>
                  // react initial render get request api to get all the devices useeffect to set Devices to all the devices available in the db
                ))}
              </ButtonGroup>
              <div className="d-grid gap-3">
                <Button
                  type="submit"
                  className="btn-color rounded w-100"
                  onClick={() => {
                    setActive(true);
                  }}
                >
                  Add Perimeter
                </Button>
              </div>
            </Card>
          </div>
        </section>
      )}
      {active && (
        <section className=" d-flex justify-content-end align-items-center flex-column">
          <Map
            interactive={active}
            perimeter={true}
            setActive={setActive}
            setPerimeters={setPerimeters}
          />
        </section>
      )}
    </>
  );
}
export default Perimeter;
