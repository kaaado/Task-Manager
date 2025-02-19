import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FormComp.css';
import { FcGoogle } from "react-icons/fc";
import backImage from '../assets/back.jpg';
import Fade from 'react-bootstrap/Fade';
import axios from "axios";

function FormComp(props) {
  const [fadeIn, setFadeIn] = useState(false);

const [formData, setFormData] = useState(
    props.dataInput.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  );

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = `http://127.0.0.1:8000/api/${props.type}`;
      const response = await axios.post(endpoint, formData);

      console.log("Success:", response.data);
      alert(`${props.type ==='register' ? "Account Created" : "Login Successful"}!`);

        localStorage.setItem("token", response.data.token);
      

    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <Fade in={fadeIn}>
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div className="row w-100">
          
          
          <div className="col-lg-8 d-none d-lg-flex justify-content-center align-items-center">
  <img
    loading="lazy"
    src="https://i.imgur.com/uNGdWHi.png"
    className="img-fluid"
    alt="Background"
    style={{ maxWidth: "90%", maxHeight: "90%",width: "90%", height: "90%" }}
  />
</div>

          
          <div className="col-lg-4 col-md-8 col-sm-10 mx-auto d-flex flex-column align-items-start justify-content-center p-4 shadow-sm rounded bg-white form-container vh-100">
          
            <h3 className="mt-5 text-start mb-1 text-capitalize text-truncate ">Welcome to Tasko! &#x1f44b;</h3>
<h4 className="text-secondary mb-4 fs-6 w-100 ">Please {props.type} to your account and start the adventure</h4>

            <form className="w-100 " onSubmit={handleSubmit}>
            
      {props.dataInput.map((field, index) => (
        <div className="mb-3" key={index}>
          <label htmlFor={field} className="form-label text-capitalize">
            {field}
          </label>
          <input
            type={field === "name" ? "text" : field}
            id={field}
            name={field}
            className="form-control outline-none  px-3 py-2"
            value={formData[field]}
            onChange={handleChange}
            placeholder={`Enter your ${field} ...`}
            required
          />
        </div>
      ))}
      

              <button className="btn btn-primary w-100 mb-2 text-capitalize">{props.type}</button>
<p className="my-2">{props.type === 'register' ?`Already have an account?` :`Don't have an account?` }<Link to={props.type === 'register' ? '/login' : '/register'} className="text-decoration-none text-primary text-capitalize ms-1">{props.type === 'register' ? 'login' : 'register'}</Link></p>
               {error && <p className="error">{error}</p>}
             
              
            </form>
             <div className="or-divider text-center my-2 fw-bold">OR</div>
<button className="btn mt-2 py-2 px-3 d-flex align-items-center justify-content-center shadow-sm border scale-hover fs-4 mx-auto">
                <FcGoogle />
              </button>
             
            
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default FormComp;
