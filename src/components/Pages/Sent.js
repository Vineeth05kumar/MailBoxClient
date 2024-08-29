import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../store/inboxSlice";
import { useNavigate } from "react-router-dom";

const Sent = () => {
  const dispatch = useDispatch();
  const sentEmails = useSelector((state) => state.inbox.sentMails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const myEmailId = localStorage.getItem("senderEmail").replace(".", "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const response = await fetch(
          `https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${myEmailId}/sent.json`
        );
        const data = await response.json();

        const sentEmailsArray = [];
        if (data) {
          Object.keys(data).forEach((key) => {
            sentEmailsArray.push({ ...data[key], id: key });
          });
        }
        dispatch(inboxActions.setSentMails(sentEmailsArray));
      } catch (error) {
        console.error("Error fetching sent emails:", error);
      }
    };

    fetchSentEmails();
  }, [dispatch, myEmailId]);

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
          <Button onClick={() => navigate("/writeEmail")}>Compose</Button>
          <a href="/inbox">
            <h6 className="m-3">Inbox</h6>
          </a>
          <a href="/sent">
            <h6 className="m-3">Sent</h6>
          </a>
        </Col>

        {/* Right Section */}
        {selectedEmail ? (
          <Col md={10} style={{ padding: "10px" }}>
            <Card>
              <Card.Body>
                <Card.Title>{selectedEmail.subject}</Card.Title>
                <Card.Text>
                  <strong>To:</strong> {selectedEmail.to} <br />
                  <strong>Message:</strong> {selectedEmail.content}
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
              {sentEmails.map((email) => (
                <ListGroup.Item
                  key={email.id}
                  action
                  onClick={() => handleEmailClick(email)}
                >
                  <span className="d-flex">
                    <span className="me-auto">{email.to}</span>
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

export default Sent;
