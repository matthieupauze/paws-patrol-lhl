import { Card } from 'react';
export default function Confirm() {
  return (
    <section className="login d-flex justify-content-center align-items-center flex-column">
      <div>
        <Card className="text-center rounded form">
          <Card.Body>
            <Card.Title className="border-bottom border-dark pb-1 text-white">
              Message Confirmed
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
}
