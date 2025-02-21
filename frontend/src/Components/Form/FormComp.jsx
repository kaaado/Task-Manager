import { Link,useNavigate, useLocation } from "react-router-dom";
import "./FormComp.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { BASEURL } from "../../Api/Api";
import toast from "react-hot-toast";
import Cookie from "cookie-universal";
import Spinner from "react-bootstrap/Spinner";
import { useMutation } from "react-query";
import useForm from "../../Hooks/useForm"; 
import { SiGoogletasks } from "react-icons/si";

function FormComp(props) {
  // Set up Coockie for storing the token 
  const cookie = Cookie();
  // Set up navigation & location
  const nav = useNavigate();
  const location = useLocation();

  // Using useForm Hook
  const { values: formData, handleChange, resetForm } = useForm(
    props.dataInput.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  );

  // React Query Mutation for form submission 
  // Success : Store token in Coockie and navigate Task page
  // Error : show the error
  const mutation = useMutation(
    async () => {
      const response = await axios.post(`${BASEURL}/${props.endApi}`, formData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        const token = data.token;
        cookie.set("task", token);
        toast.success(`Welcome ${data.user.name.slice(0, 15)}`);
        window.location.pathname = "/tasks"; 
        resetForm();
      },
      onError: (error) => {
             console.log(error)
      },
    }
  );
// Function to run the mutation &  submit the Form
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="w-100 vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="left-side col-lg-8 d-none d-lg-flex justify-content-center align-items-center">
          <img
            loading="lazy"
            src="https://i.imgur.com/uNGdWHi.png"
            className="img-fluid"
            alt="Background"
            style={{ maxWidth: "90%", maxHeight: "90%", width: "90%", height: "80%" }}
          />
        </div>

        <div className="px-5 right-side col-lg-4 col-md-8 col-sm-10 mx-auto d-flex flex-column align-items-start justify-content-center py-4 shadow-sm rounded bg-white form-container vh-100">
       <h2 className="mt-4 fw-bold text-start text-sm-center">
  <SiGoogletasks className=" me-2 fs-3 text-primary" />
  Tasko
</h2>


          <h3 className="mt-2  fs-4 text-start mb-1 text-capitalize text-truncate">
            Welcome to Tasko! 👋
          </h3>
          <h4 className="text-secondary mb-4 fs-6 w-100">
            Please {props.type} to your account and start the adventure
          </h4>

          <form className="w-100" onSubmit={handleSubmit}>
            {props.dataInput.map((field, index) => (
              <div className="mb-3" key={index}>
                <label htmlFor={field} className="form-label text-capitalize">
                  {field}
                </label>
                <input
                  type={field === "name" ? "text" : field}
                  id={field}
                  name={field}
                  className="form-control outline-none px-3 py-2"
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field} ...`}
                  minLength={field === "password" ? "8" : "4"}
                  required
                />
              </div>
            ))}

            <button className="btn btn-primary w-100 mb-2 text-capitalize" disabled={mutation.isLoading}>
              {mutation.isLoading ? <Spinner animation="border" size="sm" /> : props.type}
            </button>

            <p className="my-2">
              {props.type === "register" ? "Already have an account?" : "Don't have an account?"}
              <Link
                to={props.type === "register" ? "/login" : "/register"} state={{from:location.pathname}}
                className="text-decoration-none text-primary text-capitalize ms-1"
              >
                {props.type === "register" ? "login" : "register"}
              </Link>
            </p>

           {mutation.isError && (
              <p className="error">{mutation.error?.response?.status === 422 ? mutation.error?.response?.data?.message :mutation.error?.response?.status === 401 ? mutation.error?.response?.data?.error : "Something went wrong!"}</p>
            )}
          </form>

          <div className="or-divider text-center my-2 fw-bold">OR</div>
          <button className="btn mt-2 py-2 px-3 d-flex align-items-center justify-content-center shadow-sm border scale-hover fs-4 mx-auto">
            <Link to={`${BASEURL}/login-google`}>
              <FcGoogle />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormComp;
