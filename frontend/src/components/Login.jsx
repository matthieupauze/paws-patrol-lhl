export const Login = () => {
  return (
    <section className="d-flex justify-content-center vh-100">
      <form className="align-items-center">
        <div className="form-group my-3">
          <input
            className="form-control"
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group my-3">
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </section>
  );
};
