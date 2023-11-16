import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
    inboxMails: [],
    sentMails: []
};

const mailSlice = createSlice({
    name: 'mail',
    initialState: initialMailState,
    reducers: {
        updateInbox (state,action) {
            state.inboxMails = action.payload;
        },
        updateSentbox (state, action) {
            state.sentMails = action.payload;
        }
    }

});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
