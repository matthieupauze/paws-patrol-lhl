import { Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Register({ logged, setLogged }) {
  return (
    <section className="login d-flex justify-content-center align-items-center flex-column">
      <Form className="d-flex flex-column justify-content-center h-25 w-25">
        <Form.Group className="form-group p-3 ">
          <Form.Control
            className="form-control rounded text-white ph-color"
            type="text"
            id="name"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group className="form-group p-3 ">
          <Form.Control
            className="form-control rounded text-white ph-color"
            type="text"
            id="phone"
            placeholder="Phone"
          />
        </Form.Group>
        <Form.Group className="form-group p-3 ">
          <Form.Control
            className="form-control rounded text-white ph-color"
            type="email"
            id="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="form-group p-3">
          <Form.Control
            className="form-control form-control rounded text-white ph-color"
            type="password"
            id="password"
            placeholder="Password"
          />
        </Form.Group>

        <div className="px-3 m-3">
          <Link to="/">
            <Button
              type="submit"
              className="btn-color rounded w-100 mb-2"
              onClick={() => {
                setLogged(!logged);
              }}
            >
              Register
            </Button>
          </Link>
          <Link to="/login">
            <Button
              type="submit"
              className="btn-color rounded w-100 mt-4"
              onClick={() => setLogged(true)}
            >
              Already a member? Login!
            </Button>
          </Link>
        </div>
      </Form>
    </section>
  );
}

export default Register;
