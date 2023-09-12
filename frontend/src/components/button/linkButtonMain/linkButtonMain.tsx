import { styles } from "../../../styles";
import { Link } from "react-router-dom";

export function LinkButtonMain(props) {
  return (
    <Link className="" to="/Test">
      {props.children}
    </Link>
  );
}
