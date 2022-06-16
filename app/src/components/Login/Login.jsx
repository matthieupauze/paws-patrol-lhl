import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login({logged, setLogged}) {
  return (
    <section className="login d-flex justify-content-center align-items-center flex-column">
      <Form className="d-flex flex-column justify-content-center h-25 w-50">
        <Form.Group className="form-group mb-2 p-3 ">
          <Form.Control
            className="form-control rounded text-white ph-color"
            type="email"
            id="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="form-group mb-3 p-3">
          <Form.Control
            className="form-control form-control rounded text-white ph-color"
            type="password"
            id="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="px-3">
          <Link to="/">
            <Button type="submit" className="btn-color rounded w-100" onClick={() => {setLogged(!logged), console.log("logged ",logged)}}>
              Login
            </Button>
          </Link>
          <Link to="/">
              <Button type="submit" className="btn-color rounded w-100 mt-4" onClick={() => setLogged(true)}>
                Not a member? Register!
              </Button>
            </Link>
        </div>
      </Form>
    </section>
  );
}

export default Login;
