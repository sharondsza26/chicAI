import React from "react";
import { SignUp } from "@clerk/clerk-react";

const RegisterForm = () => {

	return (
		<SignUp forceRedirectUrl="/dashboard" />
	);
};

export default RegisterForm;
