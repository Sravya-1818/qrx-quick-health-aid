import React from "react";
import { auth } from "../firebase";

const Profile = () => {
  const user = auth.currentUser;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Profile Page</h2>
      {user ? (
        <div className="mt-4">
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Profile;
