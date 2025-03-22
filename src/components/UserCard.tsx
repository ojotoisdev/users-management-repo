import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/userSlice";
import UserForm from "./UserForm";

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
  };

  return (
    <div className="user-card">
      {isEditing ? (
        <UserForm existingUser={user} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Street: {user.address.street}</p>
          <p>City: {user.address.city}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete} style={{ backgroundColor: "red" }}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default UserCard;