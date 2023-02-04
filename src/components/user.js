import { useDispatch } from "react-redux";

export const User = ({ User, showModal, setID, navigate }) => {
  const { id, name, email, username, address, city } = User;
  const dispatch = useDispatch();

  const handleRoute = () => {
    dispatch({ type: "USER_TO_EDIT", payload: id });
    navigate(`/edit-user/${id}`);
  };
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{username}</td>
      <td>{email}</td>

      <td>{address?.city || city}</td>
      <td>
        <button onClick={handleRoute} className="btn btn-warning">
          Edit
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            setID(id);
            showModal();
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
