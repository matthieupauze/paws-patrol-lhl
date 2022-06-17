import Map from '../Map';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';

const Perimeter = () => {
  const [active, setActive] = useState(false);

  const savePerimeter = (e) => {
    e.preventDefault();
    axios
      .post(`/api/perimeter/1`, { p1lat, p1long, p2lat, p2long })
      .then((res) => console.log('res', res))
      .catch((err) => console.log('err', err));
    // axios.post(`http://localhost:${VITE_PORT_EXPRESS}/api/perimeter/1`);
  };
  return (
    <>
      {!active && (
        <section className=" d-flex justify-content-center align-items-center flex-column">
          <Map interactive={active} perimeter={false} />
          <div className="info w-25">
            <h2 className="centered">Perimeter</h2>
            <Card className="p-3 w-100 rounded ph-color">
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
          <Map interactive={active} perimeter={true} setActive={setActive} />
          {/* <div className="info w-25 mb-5">
            <Card className=" w-100 rounded ph-color">
              <div className="d-grid gap-3">
                <Button
                  type="submit"
                  className="btn-color rounded w-100"
                  onSubmit={savePerimeter}
                  onClick={(e) => {
                    // setActive(false);
                  }}
                >
                  Save Perimeter
                </Button>
              </div>
            </Card>
          </div> */}
        </section>
      )}
    </>
  );
};
export default Perimeter;
