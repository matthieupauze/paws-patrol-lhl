import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login({ logged, setLogged }) {
  const setCookie = () => {
    document.cookie = 'logged=true';
  };

  return (
    <section className="login d-flex justify-content-center align-items-center flex-column">
      <div className="d-flex flex-column justify-content-center px-3 text-white">
        <h2 className="d-flex justify-content-center font-weight-bold centered mb-3">Login</h2>
      </div>
      <Form className="d-flex flex-column justify-content-center   animate">
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
                setCookie();
                setLogged(!logged);
              }}
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button type="submit" className="btn-color rounded w-100 mt-4">
              Not a member? Register Here!
            </Button>
          </Link>
        </div>
      </Form>
    </section>
  );
}

export default Login;
