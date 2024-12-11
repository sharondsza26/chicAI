import React from "react";
import { useAuth } from "@clerk/clerk-react";

const Dashboard = () => {
	const { signOut } = useAuth(); // Access the signOut function

	const handleLogout = async () => {
		try {
			await signOut(); // Log out the user
			window.location.href = "/"; // Redirect to homepage after logout
		} catch (err) {
			console.error("Logout failed:", err);
		}
	};

	return (
		<div>
			<h1>Dashboard</h1>
			<button onClick={handleLogout} style={logoutButtonStyle}>
				Logout
			</button>
		</div>
	);
};

// Optional inline styles for the logout button
const logoutButtonStyle = {
	marginTop: "20px",
	padding: "10px 20px",
	backgroundColor: "#f44336",
	color: "#fff",
	border: "none",
	borderRadius: "5px",
	cursor: "pointer",
};

export default Dashboard;
