import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    mails: [],
    sentMails: [],  // Add sentMails to the state
  },
  reducers: {
    setMails(state, action) {
      state.mails = action.payload;
    },
    setSentMails(state, action) {
      state.sentMails = action.payload;
    },
    markAsRead(state, action) {
      const emailId = action.payload;
      const email = state.mails.find((mail) => mail.id === emailId);
      if (email) {
        email.read = true;
      }
    },
    deleteMail(state, action) {
      const emailId = action.payload;
      state.mails = state.mails.filter((mail) => mail.id !== emailId);
    },
  },
});

export const inboxActions = inboxSlice.actions;
export default inboxSlice.reducer;
