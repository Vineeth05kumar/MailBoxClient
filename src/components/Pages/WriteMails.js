import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const WriteMails = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const senderEmail = localStorage.getItem("senderEmail");

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    // const contentState = editorState.getCurrentContent();
    const mailContent = JSON.stringify(editorState);

    const emailData = {
      to: toEmail,
      subject: subject,
      content: mailContent,
      from: senderEmail,
      timeStamp: new Date().toISOString(),
    };

    console.log(emailData);

    // const mailId = new Date().toISOString();
    const receiverEmail = emailData.to.replace(".", "");
    const senderEmailFormatted = emailData.from.replace(".", "");

    try {
      const receiverResponse = await fetch(
        `https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${receiverEmail}/inbox/.json`,
        {
          method: "POST",
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
        `https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${senderEmailFormatted}/sent/.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
      if (!senderResponse.ok) {
        throw new Error("Failed to send email from sender");
      }

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
