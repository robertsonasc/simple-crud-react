import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FirebaseContext from "../../../utils/FirebaseContext";
import ProfessorTableRow from "./ProfessorTableRow";
import FirebaseServiceProfessors from "../../../services/FirebaseServiceProfessors";
import RestrictPage from "../../../utils/RestrictPage";

const ListProfessorPage = () => 
<FirebaseContext.Consumer>
        {
            (firebase) => {
                return (
                    <RestrictPage isLogged={firebase.getUser() != null} isVerified=
                    {firebase.getUser() != null? firebase.getUser().emailVerified : false}>
                        <ListProfessor firebase={firebase} />
                    </RestrictPage>
                )
            }
        }
    </FirebaseContext.Consumer>

function ListProfessor(props) {

    const [professors, setProfessors] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(
        () => {
            setLoading(true)
            FirebaseServiceProfessors.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (professors) => {
                    setLoading(false)
                    setProfessors(professors)
                }
            )
        },
        [props.firebase] 
    )

    function deleteProfessorById(id) {
        let professorsTemp = professors
        for (let i = 0; i < professorsTemp.length; i++) {
            if (professorsTemp[i].id === id) {
                professorsTemp.splice(i, 1)
            }
        }
        setProfessors([...professorsTemp]) 

    }

    function generateTable() {
        if (!professors) return
        return professors.map(
            (professor, i) => {
                return <ProfessorTableRow 
                professor={professor} 
                key={i} 
                deleteProfessorById={deleteProfessorById} 
                firestoreDb = {props.firebase.getFirestoreDb()}/>
            }
        )
    }

    function renderTable() {

        if (loading) {
            return (
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:100
                }}>
                    <div className="spinner-border" 
                     style={{width: '3rem', height: '3rem'}} 
                     role="status" />
                     Carregando...
                </div>
            )
        }


        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Universidade</th>
                        <th>Titulação</th>
                        <th colSpan={2} style={{ textAlign: "center" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {generateTable()}
                </tbody>
            </table>
        )
    }
    return (
        <>
            <main>
                <h2>
                    Listar Professores
                </h2>
                {renderTable()}
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default ListProfessorPage