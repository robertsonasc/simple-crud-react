import React from "react";
import { Link } from "react-router-dom";

import FirebaseServiceProfessors from "../../../services/FirebaseServiceProfessors";

const ProfessorTableRow = (props) => {
    const { _id, name, university, degree } = props.professor

    function deleteProfessor() {
        if (window.confirm(`Deseja excluir o elemento de ID: ${_id}?`)) {
            FirebaseServiceProfessors.delete(
                props.firestoreDb,
                ()=>{},
                _id
            )

        }

    }

    return (
        <tr>
            <td>
                {_id}
            </td>
            <td>
                {name}
            </td>
            <td>
                {university}
            </td>
            <td>
                {degree}
            </td>
            <td style={{ textAlign: "center" }}>
                <Link to={`/editProfessor/${_id}`} className="btn btn-primary">Editar</Link>
            </td>
            <td style={{ textAlign: "center" }}>
                <button className="btn btn-danger" onClick={() => deleteProfessor()}>Apagar</button>
            </td>
        </tr>
    )
}

export default ProfessorTableRow