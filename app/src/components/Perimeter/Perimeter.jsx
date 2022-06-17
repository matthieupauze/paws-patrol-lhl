import Map from '../Map';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

const Perimeter = () => {
  const [active, setActive] = useState(false);
  return (
    <>
      {!active && (
        <section className=" d-flex justify-content-center align-items-center flex-column">
          <Map interactive={active} />
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
          <Map interactive={active} perimeter={true} />
          <div className="info w-25 mb-5">
            <Card className=" w-100 rounded ph-color">
              <div className="d-grid gap-3">
                <Button
                  type="submit"
                  className="btn-color rounded w-100"
                  onClick={(e) => {
                    setActive(false);
                  }}
                >
                  Save Perimeter
                </Button>
              </div>
            </Card>
          </div>
        </section>
      )}
    </>
  );
};
export default Perimeter;
