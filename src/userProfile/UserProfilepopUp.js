
import React, { useEffect, useRef, useState } from "react";
import "./UserProfilePopup.css";
import axios from "axios";

import axiosInstance from "../api/axios.js";

const UserProfilePopup = ({ userId, onClose, onLogout }) => {
  const popupRef = useRef(null);

  const [user, setUser] = useState(null);

  // Close popup when clicking outside
  useEffect(() => {

    if (userId) {

      //console.log(userId);
      //axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}`)
      axiosInstance.get(`/profile/${userId}`)
        .then((res) => {
          // console.log(res.data);
          setUser(res.data);
        })
        .catch((error) => {
          console.log(error)
        });
    }

    const handleOutsideClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div className="user-profile-popup" ref={popupRef}>
      <div className="profile-header">
        <i className="bi bi-person-circle profile-icon"></i>
        <div>
          <p className="username"> {user ? `Hi, ${user.username}!"` : "Loading..."}</p>
          <p className="email">{user && user.email}</p>
        </div>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </button>
    </div>
  );
};

export default UserProfilePopup;

