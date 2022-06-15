import { Button, Card } from 'react-bootstrap';

function Account() {
  return (
    <section className="login d-flex justify-content-center align-items-center flex-column">
      <div>
        <Card className="text-center rounded form">
          <Card.Body>
            <Card.Text>Name</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1 text-white">
              Robbie Prokop
            </Card.Title>
            <Card.Text>Phone</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1 ">1-123-456-7890</Card.Title>
            <Card.Text>Email</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1">
              robbieprokop@gmail.com
            </Card.Title>
            <Card.Text>Password</Card.Text>
            <Card.Title className="border-bottom border-dark pb-1">****************</Card.Title>
          </Card.Body>
        </Card>
        <div className="d-grid mt-3">
          <Button className="btn-color rounded">Edit</Button>
        </div>
      </div>
    </section>
  );
}

export default Account;
