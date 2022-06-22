import { useState, useEffect } from 'react';
import { Button, ButtonGroup, ToggleButton, Card } from 'react-bootstrap';
import axios from 'axios';
import Map from '../Map';

function Perimeter() {
  const [active, setActive] = useState(false);
  const [perimeters, setPerimeters] = useState([]);
  const [selectedPerimeter, setSelectedPerimeter] = useState('');

  const deleteItem = async (id) => {
    axios
      .delete(`/api/perimeter/${id}`)
      .then(() => {
        setPerimeters(perimeters.filter((p) => p.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const updatePerimeters = async () => {
    const { data } = await axios.get(`/api/perimeter`);
    setPerimeters(data);
  };

  useEffect(() => {
    updatePerimeters();
  }, []);

  return (
    <>
      {!active && (
        <section className=" d-flex justify-content-center align-items-center flex-column">
          <Map interactive={active} perimeter={false} />
          <div className="info w-25">
            <h2 className="centered">Perimeter</h2>
            <p className="text-white">
              Set a safe zone for your furry friend to explore. If your pet leaves the safe zone, we
              will notify you via Email.
            </p>
            <Card className="p-3 w-100 rounded ph-color">
              <ButtonGroup className="mb-3 d-flex flex-column gap-2 rounded">
                {perimeters.map((perimeter, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`perimeter-${idx}`}
                    type="radio"
                    name="perimeter"
                    value={perimeter.id}
                    checked={Number(selectedPerimeter) === perimeter.id}
                    variant={
                      Number(selectedPerimeter) === perimeter.id ? 'secondary' : 'transparent'
                    }
                    onChange={(e) => setSelectedPerimeter(e.currentTarget.value)}
                    className="list-item"
                  >
                    <div className="d-flex justify-content-between px-3">
                      <div>{perimeter.id}</div>
                      <Button className="delete-button" onClick={() => deleteItem(perimeter.id)}>
                        <img src="" alt="" />
                      </Button>
                    </div>
                  </ToggleButton>
                  // react initial render get request api to get all the devices useeffect to set Devices to all the devices available in the db
                ))}
              </ButtonGroup>
              <div className="d-grid gap-3">
                <Button
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
            updatePerimeters={updatePerimeters}
          />
        </section>
      )}
    </>
  );
}
export default Perimeter;
