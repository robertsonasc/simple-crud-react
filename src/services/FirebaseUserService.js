import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth'

export default class FirebaseUserService {

    static signup = (auth, login, password, callback) => {
        createUserWithEmailAndPassword(
            auth,
            login,
            password
        )
            .then(
                (userCredential) => {
                    callback(true,userCredential.user)
                    sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("email de verificação enviado")
                    })
                }
            )
            .catch(
                (error) => {
                    callback(false,error.code)
                    console.log(error.code)
                }
            )
    }

    static login = (auth, login, password, callback) => {
        signInWithEmailAndPassword(
            auth,
            login,
            password
        )
            .then(
                (userCredential) => {
                    callback(userCredential.user)
                }
            )
            .catch(error => { callback(null); console.log(error) })
    }

    static logout = (auth, callback) => {
        signOut(auth)
            .then(() => { callback(true) })
            .catch(error => { callback(false); console.log(error) })
    }
}