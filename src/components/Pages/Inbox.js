import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const myEmailId = localStorage.getItem("senderEmail").replace(".", "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(
          `https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${myEmailId}/inbox/.json`
        );
        const data = await response.json();
        const emailsArray = data
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
        setEmails(emailsArray);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, [myEmailId]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const nullTheSelectedEmail = () => {
    setSelectedEmail(null);
  };

  return (
    <Container fluid>
      <Row>
        {/* Left Sidebar */}
        <Col md={2} style={{ borderRight: "1px solid #ddd", height: "100vh" }}>
          <a href="/welcome" ><h6 className="m-3">Inbox</h6></a>
          <h6 className="m-3">Unread</h6>
        </Col>

        {/* Right Section */}
        {selectedEmail ? (
          <Col md={10} style={{ padding: "10px" }}>
            <Card>
              <Card.Body>
                <Card.Title>{selectedEmail.subject}</Card.Title>
                <Card.Text>
                  <strong>From:</strong> {selectedEmail.from}{" "}
                  {/* assuming 'from' is the sender's email */}
                  <br />
                  <strong>Message:</strong>
                  {selectedEmail.content}
                </Card.Text>
              </Card.Body>
              <Button style={{ width: "100px" }} onClick={nullTheSelectedEmail}>
                Back
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
                    <span className="text-primary me-2">&#9679;</span>
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
