import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc } from 'firebase/firestore'




export default class FirebaseServiceProfessors {

    static list = (firestore,callback) => {
        getDocs(collection(firestore,'professor'))
        .then(
            (querySnapshot)=>{
                let professors = []
                querySnapshot.forEach(
                    (document)=>{
                        professors.push(
                            {
                                _id:document.id,
                                name:document.data().name,
                                university:document.data().university,
                                degree:document.data().degree
                            }
                        )
                    }
                )
                callback(professors)
            }
        )
        .catch(error=>console.log(error))
    }

    static list_onSnapshot = (firestore,callback) => {
        const q = query(collection(firestore,'professor')) 
        onSnapshot(
            q,
            (querySnapshot)=>{
                let professors = []
                querySnapshot.forEach(
                    (document)=>{
                        professors.push(
                            {
                                _id:document.id,
                                name:document.data().name,
                                university:document.data().university,
                                degree:document.data().degree
                            }
                        )
                    }
                )
                callback(professors)
            }
        )
    }

    static create = (firestore,callback,professor) => {
        const coll = collection(firestore,'professor')
        addDoc(coll,professor)
        .then(
            (document)=>{
                console.log('CREATE: ' + document.id)
                callback()
            }
        )
        .catch(error=>console.log(error))
    
    }

    static retrieve = (firestore,callback,_id) => {
        const documentRef = doc(firestore,'professor',_id)
        getDoc(documentRef)
        .then(
            (documentSnap)=>{
                callback(documentSnap.data())
            }
        )
        .catch(error=>console.log(error)) 
    }

    static update = (firestore,callback,_id,professor) => {
        const documentRef = doc(firestore,'professor',_id)
        updateDoc(documentRef,professor)
        .then(
            ()=>{
                callback()
            }
        )
        .catch(error=>console.log(error))
    }

    static delete = (firestore,callback,_id) => {
        const documentRef = doc(firestore,'professor',_id)
        deleteDoc(documentRef)
        .then(()=>callback())
        .catch(error=>console.log(error))
    }
}
