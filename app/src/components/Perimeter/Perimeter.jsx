import Map from '../Map';
import { useState } from 'react';
import { Button, ButtonGroup, ToggleButton, Card } from 'react-bootstrap';
import axios from 'axios';

const Perimeter = ({ perimeters, setPerimeters }) => {
  const [active, setActive] = useState(false);
  const [radioImei, setRadioImei] = useState('');
  const radios = perimeters;

  console.log('This is the current radioIMEI', radioImei);
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
                    checked={radioImei === radio.id}
                    variant={radioImei === radio.id ? 'secondary' : 'transparent'}
                    onChange={(e) => setRadioImei(e.currentTarget.value)}
                  >
                    {radio.id}
                  </ToggleButton>
                  // react initial render get request api to get all the devices useeffect to set Devices to all the devices available in the db
                ))}
              </ButtonGroup>
              <div className="d-grid gap-3">
                <Button
                  type="submit"
                  className="btn-color rounded w-100"
                  onClick={(e) => {
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
};
export default Perimeter;
