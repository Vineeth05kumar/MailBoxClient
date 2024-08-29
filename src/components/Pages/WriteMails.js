import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";

const WriteMails = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const navigate = useNavigate();

  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const senderEmail = localStorage.getItem("senderEmail");

  const handleEditorChange = (state) => {
    setEditorState(state);
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    const mailContent = editorState.getCurrentContent().getPlainText();
  
    const mailId = Date.now().toString(); // Generate mailId once
    const receiverEmail = toEmail.replace(".", "");
    const senderEmailFormatted = senderEmail.replace(".", "");
  
    const emailData = {
      to: toEmail,
      subject: subject,
      content: mailContent,
      from: senderEmail,
      timeStamp: new Date().toISOString(),
      read: false,
      mailId: mailId // Include mailId in the emailData
    };
  
    try {
      const receiverResponse = await fetch(
        `https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${receiverEmail}/inbox/${mailId}.json`,
        {
          method: "PUT", // Using PUT instead of POST to avoid duplicate entries
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
  
      if (!receiverResponse.ok) {
        throw new Error("Failed to send email to receiver");
      }
  
      const senderResponse = await fetch(
        `https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${senderEmailFormatted}/sent/${mailId}.json`,
        {
          method: "PUT", // Using PUT instead of POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
  
      if (!senderResponse.ok) {
        throw new Error("Failed to send email from sender");
      }
  
      // Clear form inputs and reset editor
      setToEmail("");
      setSubject("");
      setEditorState(EditorState.createEmpty());
  
      alert("Email sent successfully!");
    } catch (error) {
      console.log(error);
      alert("Error sending email: " + error.message);
    }
  };
  

  return (
    <Container>
      <Button
        onClick={() => {
          navigate("/inbox");
        }}
      >
        Go Back
      </Button>
      <Form onSubmit={sendEmail}>
        <Form.Group>
          <Form.Label>To</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter recipient's email"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control
            name="subject"
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={handleEditorChange}
          />
        </Form.Group>
        <Button type="submit">Send</Button>
      </Form>
    </Container>
  );
};

export default WriteMails;
