import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthentificationContext } from "../../use_context/authentification";

function DeniedAccess() {
    const { auth } = useContext(AuthentificationContext);
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (auth !== null && (auth === false || parseInt(auth.user.sub, 10) !== parseInt(id, 10))) {
            navigate("/acces_refuse");
        }
    }, [auth, id, navigate]);


}

export default DeniedAccess;
