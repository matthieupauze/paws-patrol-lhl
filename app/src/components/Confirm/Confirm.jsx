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
        {/* CHANGE THIS TO REDIRECT AFTER 10 SECONDS OR SO */}
        <div className="px-3">
          <Link to="/">
            <Button type="submit" className="btn-color rounded w-100">
              Continue Tracking
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
