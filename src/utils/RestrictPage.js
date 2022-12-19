import { Link } from "react-router-dom";

const RestrictPage = (props) => {
    if (props.isLogged && props.isVerified){
        return props.children
    }
    else if(props.isLogged){
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '15%'
            }}>
                <h3>Acesso restrito, verifique seu email.</h3>
                <Link to="/" className="nav-link">Home</Link>
            </div>
        )
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15%'
        }}>
            <h3>Acesso restrito, faça o seu login.</h3>
            <Link to="/" className="nav-link">Home</Link>
        </div>
    )
}

export default RestrictPage