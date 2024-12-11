import React, { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from '../Login/LoginForm';
import RegisterForm from '../Register/RegisterForm';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'


const Homepage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const toggleForm = () => {
		setIsLogin(!isLogin);
	};

	return (
		// <Container fluid className="vh-100 d-flex">
		<Row className="vh-100 w-100">
			<Col md={8} className="landing-message d-flex flex-column justify-content-center p-5">
				<h1 className="mb-4" style={{ fontWeight: "bold" }}>
					Chic AI
				</h1>
				<p>
					Say goodbye to the frustrating "having a lot of clothes but no outfits"
					moments, and let ChicAI handle the hard work of styling you. It's more
					than just an app, it's a personal stylist in your pocket!
				</p>
			</Col>
			<Col md={4} className="d-flex flex-column justify-content-center align-items-center bg-light">
				{/* {isLogin ? <LoginForm toggleForm={toggleForm} /> : <RegisterForm toggleForm={toggleForm} />} */}
				<SignedOut>
					<RegisterForm />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</Col>
		</Row>
		// </Container>
	)
}

export default Homepage