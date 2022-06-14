import './Login.css'
import { Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Login = () => {
  return (
    <section className="login d-flex justify-content-center align-items-center flex-column">
      <Form className="d-flex flex-column justify-content-center h-25 w-50">
        <div className="form-group mb-3 p-3 ">
          <input
            className="form-control rounded text-white ph-color"
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group mb-3 p-3">
          <input
            className="form-control form-control rounded text-white ph-color"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="px-3">
          <Link to='/'>
            <Button type="submit" className="btn-color rounded w-100">
            Login
            </Button>
          </Link>
        </div>
      </Form>
    </section>
  );
};
