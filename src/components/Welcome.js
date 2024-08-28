import { useNavigate } from "react-router-dom"
import Inbox from './Pages/Inbox';

export default function Welcome () {
    const navigate = useNavigate()
    return(
        <>
        <h1>Welcome to MailBox</h1>
        <button onClick={() => navigate('/writeEmail')}>Compose</button>
        <Inbox />
        </>
    )
}