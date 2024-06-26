import { useContext} from "react";
import { AuthentificationContext } from "../use_context/authentification";

function UseRefresh () {
    const {update, setUpdate} = useContext(AuthentificationContext);
      const refresh = setUpdate(!update)

    return refresh;
  }

  export default UseRefresh