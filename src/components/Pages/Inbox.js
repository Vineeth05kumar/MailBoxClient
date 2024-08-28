import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const myEmailId = localStorage.getItem("senderEmail").replace(".", "");

  useEffect(() => {
    fetch(
      `https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${myEmailId}/inbox/.json`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const messagesArray = Object.keys(data).map((key) => ({
            id: key, // Add the unique key as id
            ...data[key], // Spread the rest of the email data
          }));
          setMessages(messagesArray);
        }
      })
      .catch((error) => console.log(error));
  }, [myEmailId]);
  return (
    <Container>
      {messages.map((message) => (
        <div key={message.id}>
          <h2>{message.from}</h2>
          <p>{message.subject}</p>
          {/* <p>{message.content.currentContent.blockMap["6o1su"].text}</p> */}
        </div>
      ))}
    </Container>
  );
};

export default Inbox;
