import AuthCard from "@/components/auth/AuthCard";

import { RegisterSchema } from "@/schema";

const RegisterForm = () => {
  return (
    <AuthCard
      label="Create an account"
      title="Register"
      backButtonHref="/login"
      backButtonLabel="Already have an account? Log in here.">
        <div>hi poo</div>      
    </AuthCard>
  );
}

export default RegisterForm;
