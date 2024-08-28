import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Card, Spinner } from "react-bootstrap";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const myEmailId = localStorage.getItem('senderEmail').replace('.','');

  useEffect(() => {
    fetch(`https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${myEmailId}/inbox/.json`)
      .then((response) => response.json())
      .then((data) => {
        // Convert the object into an array of emails
        const emailsArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setEmails(emailsArray);
      })
      .catch((error) => console.log(error));
  }, [myEmailId]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  return (
    <Container fluid>
      <Row>
        {/* Inbox List */}
        <Col md={4} style={{ borderRight: "10px solid #ddd", height: "100vh", overflowY: "auto" }}>
          <h3 className="p-3">Inbox</h3>
          {emails.length > 0 ? (
            <ListGroup>
              {emails.map((email) => (
                <ListGroup.Item
                  key={email.id}
                  action
                  onClick={() => handleEmailClick(email)}
                  active={selectedEmail && selectedEmail.id === email.id}
                >
                  <div><strong>From:</strong> {email.from}</div>
                  <div><strong>Subject:</strong> {email.subject}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <div className="p-3 text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Col>

        {/* Message Viewer */}
        <Col md={8} style={{ padding: "20px" }}>
          {selectedEmail ? (
            <Card>
              <Card.Body>
                <Card.Title>{selectedEmail.subject}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  From: {selectedEmail.from}
                </Card.Subtitle>
                <Card.Text>
                  {selectedEmail.content}
                </Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <div className="text-center">
              <h5>Select an email to view its content</h5>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Inbox;
