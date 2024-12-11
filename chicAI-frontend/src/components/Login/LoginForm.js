import React from "react";
import { SignIn } from "@clerk/clerk-react";

const LoginForm = () => {
	return (
		<SignIn
			afterSignInUrl="/dashboard"
		/>
	);
};

export default LoginForm;
