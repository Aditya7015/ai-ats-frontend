import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-500 hover:underline"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
