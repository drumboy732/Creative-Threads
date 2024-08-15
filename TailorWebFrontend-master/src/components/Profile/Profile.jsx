import React, { useState, useEffect } from 'react';
import './profile.css';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const {username} = useParams();
  // State to manage user information
  const [user, setUser] = useState(null);

  // Fetch user information from API when the component mounts
  useEffect(() => {
    // Fetch user profile information from the API
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/user/profile/${username}`); // Adjust the API endpoint URL as needed
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch('/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        // Redirect to the login page or home page after logout
        window.location.href = '/login';
      } else {
        console.error('Error logging out:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Return null if user data is not yet available
  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="profile-container">
      {/* <div className="profile-links">
        <a href="/order" className="profile-link">Order</a>
        <button onClick={handleLogout} className="profile-link">Logout</button>
        <button onClick={handleLogout} className="profile-link">Edit Info</button>
      </div>

      <div className="profile-info">
        <h2>User Profile</h2>
        <div className="profile-detail">
          <strong>Username:</strong> John Doe
        </div>
        <div className="profile-detail">
          <strong>Email:</strong> johndoe@gmail.com
        </div>
        <div className="profile-detail">
          <strong>Phone Number:</strong> 999999999
        </div>
        <div className="profile-detail">
          <strong>Address:</strong> <address>Suite 847 137 Brown Square, North Rickie, VA 94772-7466</address>
        </div>
      </div> */}
      <div className="profile-links">
        <a href="/order" className="profile-link">Order</a>
        <button onClick={handleLogout} className="profile-link">Logout</button>
        <button onClick={handleLogout} className="profile-link">Edit Info</button>
      </div>

      <div className="profile-info">
        <h2>User Profile</h2>
        <div className="profile-detail">
          <strong>Name:</strong> {user?.name}
        </div> 
        <div className="profile-detail">
          <strong>Username:</strong> {user?.username}
        </div>
        <div className="profile-detail">
          <strong>Email:</strong> {user?.email}
        </div>
        <div className="profile-detail">
          <strong>Phone Number:</strong> {user?.phone}
        </div>
      </div>
    </div>
  );
};

export default Profile;
