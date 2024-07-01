import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to our application",
};

const RegisterPage = () => {
    return (
        <RegisterForm/>
    );
  
};

export default RegisterPage;