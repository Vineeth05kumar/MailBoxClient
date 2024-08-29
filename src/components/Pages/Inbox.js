import React, { useEffect } from "react";
import { Container, Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../store/inboxSlice";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.inbox.mails);
  const [selectedEmail, setSelectedEmail] = React.useState(null);
  const myEmailId = localStorage.getItem("senderEmail").replace(".", "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          `https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${myEmailId}/inbox.json`
        );
        const data = await response.json();
  
        const emailsArray = [];
        if (data) {
          Object.keys(data).forEach((key) => {
            emailsArray.push({ ...data[key], id: key }); // Ensure 'id' is the key and read status is preserved
          });
        }
        dispatch(inboxActions.setMails(emailsArray));
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };
  
    fetchEmails();
  }, [dispatch, myEmailId]);
  

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    markEmailAsRead(email);
  };

  const markEmailAsRead = async (email) => {
    try {
      const updatedEmail = {...email,read:true}
  
        // Ensure we are updating the correct email in Firebase
        await fetch(
          `https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${myEmailId}/inbox/${email.mailId}.json`,
          {
            method: "PUT", // Use PATCH instead of PUT to update only the 'read' status
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEmail),
          }
        );
  
        // Update the read status locally after successful update in Firebase
        dispatch(inboxActions.markAsRead(email.mailId));
      
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };
  

  const nullTheSelectedEmail = () => {
    setSelectedEmail(null);
    // dispatch(inboxActions.markAsRead(id));
  };

  const DeleteMail = async(email) =>{
    setSelectedEmail(null);
    dispatch(inboxActions.deleteMail(email.mailId))
    try{
      const response = fetch(`https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${myEmailId}/inbox/${email.mailId}.json`,{
        method: 'DELETE',
      })
      if(!response.ok){
        throw new Error('Failed to delete email')
      }
      
        
    }
    catch(error){
      console.error("Error deleting email:", error);
    }
  }

  return (
    <Container fluid>
      <Row>
        {/* Left Sidebar */}
        <Col md={2} style={{ borderRight: "1px solid #ddd", height: "100vh" }}>
          <a href="/welcome"><h6 className="m-3">Inbox</h6></a>
          <a href="/welcome"><h6 className="m-3">Sent</h6></a>
          <a href="/welcome"><h6 className="m-3">Unread</h6></a>
        </Col>

        {/* Right Section */}
        {selectedEmail ? (
          <Col md={10} style={{ padding: "10px" }}>
            <Card>
              <Card.Body>
                <Card.Title>{selectedEmail.subject}</Card.Title>
                <Card.Text>
                  <strong>From:</strong> {selectedEmail.from} <br />
                  <strong>Message:</strong> {selectedEmail.content}
                </Card.Text>
              </Card.Body>
              <Button style={{ width: "100px" }} onClick={nullTheSelectedEmail}>
                Back
              </Button>
              <Button style={{ width: "100px" }} onClick={()=>DeleteMail(selectedEmail)}>
                Delete
              </Button>
            </Card>
          </Col>
        ) : (
          <Col md={10} style={{ padding: "20px" }}>
            <ListGroup>
              {emails.map((email) => (
                <ListGroup.Item
                  key={email.id}
                  action
                  onClick={() => handleEmailClick(email)}
                >
                  <span className="d-flex">
                    {!email.read && (
                      <span className="text-primary me-2">&#9679;</span>
                    )}
                    <span className="me-auto">{email.from}</span>
                    <span className="me-auto">{email.subject}</span>
                  </span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Inbox;
