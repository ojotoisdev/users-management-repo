import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../store/userSlice";

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
}

interface UserFormProps {
  existingUser?: User;
  onClose: () => void; // Callback to close form after submission
}

const UserForm: React.FC<UserFormProps> = ({ existingUser, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(existingUser?.name || "");
  const [email, setEmail] = useState(existingUser?.email || "");
  const [street, setStreet] = useState(existingUser?.address.street || "");
  const [city, setCity] = useState(existingUser?.address.city || "");

  useEffect(() => {
    if (existingUser) {
      setName(existingUser.name);
      setEmail(existingUser.email);
      setStreet(existingUser.address.street);
      setCity(existingUser.address.city);
    }
  }, [existingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user: User = {
      id: existingUser?.id || Date.now(), // New ID if adding
      name,
      email,
      address: { street, city },
    };

    if (existingUser) {
      dispatch(updateUser(user)); // Update user
    } else {
      dispatch(addUser(user)); // Add new user
    }
    onClose(); // Close form after submit
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street" required />
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
      <button type="submit">{existingUser ? "Update User" : "Add User"}</button>
    </form>
  );
};

export default UserForm;