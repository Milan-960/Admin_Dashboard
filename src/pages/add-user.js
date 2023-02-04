import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddUser } from "../redux/users/userActions";

export const NewUser = () => {
  const users = useSelector((state) => state.users.users);

  // using hooks for adding the user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nameInputError, setNameInputError] = useState("");
  const [emailInputError, setEmailInputError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isEmailValid, setIEmailsValid] = useState(false);

  var navigate = useNavigate();
  const dispatch = useDispatch();

  // Handeling event for input field
  const onhandelChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onhandelChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (
      new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email.trim())
    ) {
      setIEmailsValid(true);
      setEmailInputError("");
    } else if (email.length > 0) {
      setEmailInputError("Please provide a email");
      setIEmailsValid(false);
    }
  }, [email]);

  useEffect(() => {
    if (name.length < 2) {
      setNameInputError("Please enter a name");
      setIsValid(false);
    } else {
      setNameInputError("");
      setIsValid(true);
    }
  }, [name]);

  const submitData = () => {
    const payload = { name, email, id: users.length + 1 };
    dispatch(AddUser(payload, navigate));
  };

  return (
    <div>
      <div className="container">
        <h3 className="my-5">Dashboard</h3>
        <div className="card my-5">
          <div className="card-header d-flex w-full justify-content-between align-items-center">
            Add User
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
                  placeholder="Please enter your name"
                  value={name}
                  onChange={onhandelChangeName}
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
                  placeholder="Please enter your email"
                  value={email}
                  onChange={onhandelChange}
                />
                {emailInputError && (
                  <p className="text-danger">{emailInputError}</p>
                )}
              </div>

              <div className="d-flex justify-content-end align-content-center">
                <Link to="/" className="btn btn-outline-danger mx-3">
                  Cancel
                </Link>
                <button
                  className="btn btn-success"
                  type="button"
                  disabled={!isEmailValid && !isValid}
                  onClick={() => submitData()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
