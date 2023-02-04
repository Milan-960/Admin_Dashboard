import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ModalWrapper } from "../components/modalWrapper";
import { Spinner } from "../components/spinner";
import { FetchUserList } from "../redux/users/userActions";
import { UserTable } from "./user-table";

export const Dashboard = () => {
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);

  const dispatch = useDispatch();
  var navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [UserID, setID] = useState(null);

  console.log("users", users);
  useEffect(() => {
    if (users.length === 0) {
      dispatch(FetchUserList());
    }
  }, [users, dispatch]);

  const deleteUser = () => {
    dispatch({ type: "DELETE_USER", payload: UserID });
    setShowDeleteModal(!showDeleteModal);
  };

  const setUserID = useCallback((id) => {
    setID(id);
  }, []);

  return (
    <div>
      <div className="container">
        <h3 className="my-5">Dashboard</h3>
        <div className="card my-5">
          <div className="card-header d-flex w-full justify-content-between align-items-center">
            <h4>User List</h4>
            <Link to="/add-user" className="btn btn-primary">
              Add New
            </Link>
          </div>
          <div className="card-body">
            {loading ? (
              <Spinner />
            ) : (
              <UserTable
                users={users}
                setID={setUserID}
                showModal={() => setShowDeleteModal(!showDeleteModal)}
                navigate={navigate}
              />
            )}
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <ModalWrapper
          onClose={() => setShowDeleteModal(!showDeleteModal)}
          show={showDeleteModal}
        >
          <div className="modal-header">
            <h5 className="text-dark">Confirm Delete</h5>
          </div>
          <div className="modal-body">
            <h5>
              Are you sure you want to delete {users?.username} this record?
            </h5>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-danger mx-3"
              onClick={() => setShowDeleteModal(!showDeleteModal)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => deleteUser(UserID)}
            >
              Delete
            </button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};
