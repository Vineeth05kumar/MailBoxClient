import { useNavigate } from "react-router-dom"
import Inbox from './Pages/Inbox';
import { Button } from "react-bootstrap";

export default function Welcome () {
    const navigate = useNavigate()
    return(
        <>
        <Button onClick={() => navigate('/writeEmail')}>Compose</Button>
        <Inbox />
        </>
    )
}