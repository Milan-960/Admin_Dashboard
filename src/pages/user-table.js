import React from "react";
import { User } from "../components/user";

export const UserTable = ({ users, showModal, setID, navigate }) => {
  return (
    <>
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>E-Mail</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <User
              User={user}
              key={index}
              showModal={showModal}
              setID={setID}
              navigate={navigate}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
