import React, { useState,useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { inboxActions } from '../store/inboxSlice';
import { useNavigate } from 'react-router-dom';
import { useFetchEmails, useUpdateEmailStatus } from '../hooks/useApi';

const Inbox = () => {
  const dispatch = useDispatch();
  const emails = useSelector((state) => state.inbox.mails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const myEmailId = localStorage.getItem('senderEmail').replace('.', '');
  const navigate = useNavigate();

  const { emails: fetchedEmails, loading, error } = useFetchEmails(myEmailId);
  const { markEmailAsRead, deleteEmail } = useUpdateEmailStatus(myEmailId);

  useEffect(() => {
    if (fetchedEmails) {
      dispatch(inboxActions.setMails(fetchedEmails));
    }
  }, [fetchedEmails, dispatch]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    markEmailAsRead(email);
  };

  const handleDelete = async (email) => {
    setSelectedEmail(null);
    await deleteEmail(email);
    dispatch(inboxActions.deleteMail(email.mailId));
  };

  const handleBack = () => setSelectedEmail(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading emails: {error.message}</p>;

  return (
    <Container fluid>
      <Row>
        {/* Left Sidebar */}
        <Col md={2} style={{ borderRight: '1px solid #ddd', height: '100vh' }}>
          <Button onClick={() => navigate('/writeEmail')}>Compose</Button>
          <a href="/inbox">
            <h6 className="m-3">Inbox</h6>
          </a>
          <a href="/sent">
            <h6 className="m-3">Sent</h6>
          </a>
          <h6 className="m-3">
            Unread<span>-{emails.filter((email) => !email.read).length}</span>
          </h6>
        </Col>

        {/* Right Section */}
        {selectedEmail ? (
          <Col md={10} style={{ padding: '10px' }}>
            <Card>
              <Card.Body>
                <Card.Title style={{ float: 'left' }}>
                  {selectedEmail.subject}
                </Card.Title>
                <Button
                  variant="danger"
                  style={{ float: 'right', width: '100px' }}
                  onClick={() => handleDelete(selectedEmail)}
                >
                  Delete
                </Button>
                <br />
                <br />
                <Card.Text>
                  <strong>From:</strong> {selectedEmail.from} <br />
                  <strong>Message:</strong> {selectedEmail.content}
                </Card.Text>
              </Card.Body>
              <Button style={{ width: '100px' }} onClick={handleBack}>
                Back
              </Button>
            </Card>
          </Col>
        ) : (
          <Col md={10} style={{ padding: '20px' }}>
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
