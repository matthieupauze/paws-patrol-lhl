import './styles/Login.css'

export const Login = () => {
  return (
    <section className="login d-flex justify-content-center align-items-center vh-100 flex-column">
      <form className="d-flex flex-column justify-content-center h-25 w-50">
        <div className="form-group my-3 p-3 ">
          <input
            className="form-control bg-transparent text-white ph-color"
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group mb-3 p-3">
          <input
            className="form-control form-control bg-transparent text-white ph-color"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">
          Login
        </button>
      </form>
    </section>
  );
};
