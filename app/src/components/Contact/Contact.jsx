import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <section className="login d-flex justify-content-center align-items-center flex-column">
      <Form className="d-flex flex-column justify-content-center h-25 w-25">
        <div className="d-flex flex-column justify-content-center px-3 text-white">
          <h2 className="d-flex justify-content-center font-weight-bold centered">Contact Us</h2>
        </div>
        <Card className="text-center rounded form">
          <Form.Group className="form-group mb-2 p-3">
            <p className="pt-3">
              If you have any questions or concerns, please fill out the form and we will get back
              to you as soon as possible.
            </p>
            <Form.Control
              className="form-control rounded text-white ph-color"
              type="text"
              id="name"
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group className="form-group mb-2 p-3">
            <Form.Control
              className="form-control rounded text-white ph-color"
              type="email"
              id="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="form-group mb-2 p-3">
            <Form.Control
              className="form-control form-control text-white rounded ph-color"
              as="textarea"
              rows={4}
              id="message"
              placeholder="Enter a Message"
            />
          </Form.Group>
        </Card>
        <div className="p-hover p-3">
          <Link to="/confirm">
            <Button type="submit" className="btn-color rounded w-100">
              Submit
            </Button>
          </Link>
        </div>
      </Form>
    </section>
  );
}

export default Contact;
