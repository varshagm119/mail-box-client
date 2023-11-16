import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
    inboxMails: []
};

const mailSlice = createSlice({
    name: 'mail',
    initialState: initialMailState,
    reducers: {
        updateInbox (state,action) {
            state.inboxMails = action.payload;
        }
    }

});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
