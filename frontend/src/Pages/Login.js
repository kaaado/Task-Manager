import FormComp from "../Components/FormComp"

export default function Login() {
  const loginData=['email','password']
  return (
    <>
       <FormComp dataInput={loginData} type='login'  />
    </>
  );
}
