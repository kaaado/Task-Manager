import FormComp from "../Components/FormComp"

export default function Register() {
  const registerData=['name','email','password']
  return (
    <>
     <FormComp dataInput={registerData} type='register'  />
    </>
  );
}
