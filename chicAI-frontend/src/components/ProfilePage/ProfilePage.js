import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const userId = '64890def1234567890123456'; // Replace with actual user ID
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    dateOfBirth: '',
    profilePicture: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load user data from localStorage (if available)
  useEffect(() => {
    const savedData = localStorage.getItem(`profileData-${userId}`);
    if (savedData) {
      setUser(JSON.parse(savedData)); // Load data from localStorage
    } else {
      // If no saved data, fetch it from the server
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
          setUser(response.data); // Set the user data when the component is first loaded
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user.firstName || user.lastName || user.email || user.age || user.dateOfBirth || user.profilePicture) {
      localStorage.setItem(`profileData-${userId}`, JSON.stringify(user));
    }
  }, [user, userId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle profile picture change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePicture: reader.result });
      };
      reader.readAsDataURL(file); // Read file as a data URL
    }
  };

  // Update user data on the server
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload when submitting the form
    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, user);
      if (response.status === 200) {
        setUser(response.data); // Update the user state with the response data
        setIsEditing(false); // Switch to the non-editing view
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    setIsEditing(false); // Switch back to view mode without saving changes
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleChange}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={user.dateOfBirth}
              onChange={handleChange}
            />
          </label>
          <label>
            Profile Picture:
            <input
              type="file"
              name="profilePicture"
              onChange={handleImageChange}
            />
            {user.profilePicture && (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="profile-picture-preview"
              />
            )}
          </label>
          <button type="submit">Cancel</button>
          <button type="button" onClick={handleCancel}>Save Changes</button>
        </form>
      ) : (
        <div className="profile-details">
          {user.profilePicture && (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          )}
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Date of Birth:</strong> {user.dateOfBirth}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
