import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";
import { RootState, AppDispatch } from "../store/store";
import UserCard from "./UserCard";
import UserForm from "./UserForm"; // Import the UserForm component

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-list">
      {/* Add User Button */}
      <button 
        style={{
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
        onClick={() => setShowForm(true)}
      >
        + Add User
      </button>

      {/* Show User Form when button is clicked */}
      {showForm && (
        <UserForm 
          onClose={() => setShowForm(false)} 
        />
      )}

      {/* User Cards */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
