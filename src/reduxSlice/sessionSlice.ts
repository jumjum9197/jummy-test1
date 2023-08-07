import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
    sessionDetails: SessionDetails
}

export interface SessionDetails {
    email: string,
    Password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    phoneNumber: number
}


const initialState: SessionState = {
  sessionDetails : {
    email: "",
    Password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: 0,
  } 
} 



export const sessionSlice  = createSlice({
    name: 'sessionDetails',
    initialState,
    reducers: {
        updateSession: (state, action: PayloadAction<SessionDetails>) => {
            state.sessionDetails = action.payload;
        }
    }
});
 
export const {updateSession} = sessionSlice.actions;

export default sessionSlice.reducer;