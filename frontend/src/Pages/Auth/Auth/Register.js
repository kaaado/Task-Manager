import FormComp from "../../../Components/Form/FormComp"
import { REGISTER } from "../../../Api/Api";

export default function Register() {
  const registerData=['name','email','password']
  return (
    <>
     <FormComp dataInput={registerData} type='register'  endApi={REGISTER} />
    </>
  );
}
