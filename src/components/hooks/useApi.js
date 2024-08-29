// src/hooks/useApi.js
import { useState, useEffect } from 'react';

export const useFetchEmails = (emailId) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${emailId}/inbox.json`);
        const data = await response.json();
        const emailsArray = data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : [];
        setEmails(emailsArray);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [emailId]);

  return { emails, loading, error };
};

export const useUpdateEmailStatus = (emailId, myEmailId) => {
  const markEmailAsRead = async (email) => {
    try {
      const updatedEmail = { ...email, read: true };
      await fetch(`https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${myEmailId}/inbox/${email.mailId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmail),
      });
    } catch (error) {
      console.error('Error marking email as read:', error);
    }
  };

  const deleteEmail = async (email) => {
    try {
      await fetch(`https://mailboxclient-5eabe-default-rtdb.firebaseio.com/mails/${myEmailId}/inbox/${email.mailId}.json`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  return { markEmailAsRead, deleteEmail };
};
