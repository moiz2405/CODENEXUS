"use client";
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function UserProfile() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    // Use the Auth0 logout API to log the user out
    window.location.href = '/api/auth/logout'; 
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>You are not logged in.</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-image-container">
            {/* Display user's Google ID logo */}
            {user.picture ? (
              <Image
                src={user.picture}
                alt="Profile Picture"
                width={100}
                height={100}
                className="profile-image"
              />
            ) : (
              <div className="default-avatar">
                <span>{user.name?.[0]}</span>
              </div>
            )}
          </div>
          <div className="profile-details">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="profile-actions">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
