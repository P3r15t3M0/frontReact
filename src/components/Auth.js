import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contex/AuthContext";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";

export const Auth = () => {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <div className="headerInfo">
      <p>
        Logged in as{" "}
        <Link className="userMail" to={"/user"}>
          {user.info[0].email}
        </Link>
      </p>
      <Avatar
        alt={`${user.info[0].alias ? user.info[0].alias : user.info[0].email}`}
        src={`${process.env.REACT_APP_BACKEND_ROUTE}uploads/${user.info[0].foto_path}`}
        sx={{ width: 50, height: 50, marginRight: 2 }}
      />
      <span onClick={() => logout()}>
        LogOut <LogoutIcon />
      </span>
    </div>
  ) : (
    <ul>
      <li>
        <Link to={"/register"}>Register</Link>
      </li>
      <li>
        <Link to={"/login"}>Login</Link>
      </li>
    </ul>
  );
};
