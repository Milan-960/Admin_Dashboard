import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Spinner } from "../components/spinner";

export const EditUser = () => {
  const dispatch = useDispatch();
  var navigate = useNavigate();

  var user =
    useSelector((state) => state.users.user) ||
    JSON.parse(localStorage.getItem("userToEdit"));

  // Hooks to handel the update form
  const [newName, setName] = useState(user?.name);
  const [newEmail, setEmail] = useState(user?.email);
  const [newUsername, setUsername] = useState(user?.username);
  const [newCity, setCity] = useState(user?.address?.city || user?.city);
  const [nameInputError, setNameInputError] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isEmailValid, setIEmailsValid] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userToEdit")) {
      localStorage.setItem("userToEdit", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (
      new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(
        newEmail.trim()
      )
    ) {
      setIEmailsValid(true);
      setEmailInputError("");
    } else {
      setIEmailsValid(false);
      setEmailInputError("Please provide a valid email");
    }
  }, [newEmail]);

  useEffect(() => {
    if (newName.length < 2) {
      setNameInputError("Name must be two or more characters");
      setIsValid(false);
    } else {
      setNameInputError("");
      setIsValid(true);
    }
  }, [newName]);

  const handleUpdate = () => {
    const payload = {
      id: user.id,
      name: newName,
      email: newEmail,
      username: newUsername,
      city: newCity,
    };

    dispatch({ type: "UPDATE_USER", payload });
    navigate("/");
  };

  return user ? (
    <div>
      <div>
        <div className="container">
          <h3 className="my-5">Dashboard</h3>
          <div className="card my-5">
            <div className="card-header d-flex w-full justify-content-between align-items-center">
              Edit User: {user.name}
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      !isValid ? "is-invalid" : "is-valid"
                    }`}
                    id="name"
                    placeholder="John Smith"
                    value={newName}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  {nameInputError && (
                    <p className="text-danger">{nameInputError}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      !isEmailValid ? "is-invalid" : "is-valid"
                    }`}
                    id="email"
                    placeholder="name@example.com"
                    value={newEmail}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {emailInputError && (
                    <p className="text-danger">{emailInputError}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="username"
                    value={newUsername}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="City" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="city"
                    value={newCity}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>

                <div className="d-flex justify-content-end align-content-center">
                  <Link to="/" className="btn btn-outline-danger mx-3">
                    Cancel
                  </Link>
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={() => handleUpdate()}
                    disabled={!isEmailValid && !isValid}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  );
};
