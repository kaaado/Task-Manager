import FormComp from "../Components/Form/FormComp"
import { LOGIN } from "../Api/Api";

export default function Login() {
  const loginData=['email','password']
  return (
    <>
       <FormComp dataInput={loginData} type='login' endApi={LOGIN} />
    </>
  );
}
