import React from "react";
import { useNavigate } from "react-router-dom";
import OGNavbar from "./OGNavbar";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <OGNavbar />
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage: `url('/images/bus1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <div
          className="text-center p-5 shadow rounded-4 bg-white bg-opacity-75"
          style={{
            width: "100%",
            maxWidth: "450px",
            border: "1px solid #f0f0f0",
            backdropFilter: "blur(6px)",
          }}
        >
          <h1 className="mb-3 fw-bold" style={{ color: "#dc3545" }}>
            FastX Bus Booking
          </h1>
          <p className="mb-1 text-secondary fs-5">Your comfort, our commitment.</p>
          <p className="mb-4 text-secondary fs-5">Book Now!</p>

          <div className="d-grid gap-3">
            <button
              className="btn btn-outline-danger btn-lg rounded-pill fw-semibold"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="btn btn-danger btn-lg rounded-pill fw-semibold"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

          <hr className="my-4" />
          <small className="text-muted">
            Trusted by thousands. Travel smart with{" "}
            <strong className="text-danger">FastX</strong>.
          </small>
        </div>
      </div>
      


    </>
  );
}

export default Home;
