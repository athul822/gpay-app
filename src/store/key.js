// userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { checkPasscode } from '../utils/checkPasscode';

const initialState = {
    pin: [null, null, null, null],
    pinCount: 0,
    animate: 0,
    wrongPin: false,
    pinCollection: [],
    unlockCode: '0000',
    isUnlock: false
};

const keySlice = createSlice({
    name: 'pin',
    initialState,
    reducers: {
        setPin: (state, action) => {
            console.log(state, 'setpin');
            if(state.isUnlock){

            }
            if (state.wrongPin) state.wrongPin = false
            if (state.pinCount < 4) {
                state.pin[state.pinCount] = action.payload;
                if (state.pinCount < 3) state.pinCount += 1;
                if (state.animate === 3){
               
                console.log(state.isUnlock, 'isUnlock');
                }
                state.animate += 1;
            }
            console.log(state, 'setpin2');
        },
        deletePin: (state) => {
            console.log(state, 'delpin');
            if (state.pinCount >= 0) {
                console.log('insidedelpin');
                state.pin[state.pinCount - 1] = null;
                if (state.pinCount > 0) state.pinCount -= 1;
                if (state.animate > 0) state.animate -= 1;
            }
            console.log(state, 'delpin2');
        },
        resetPin: (state) => {
            state.isUnlock = checkPasscode(state.unlockCode, state.pin);
            state.pinCollection.push(state.pin);
            state.pin = [null, null, null, null];
            state.pinCount = 0;
            state.animate = 0;
            console.log(state, 'resetpin');
        },
        setAnimate: (state, action) => {
            state.animate = action.payload;
        },
        setWrongPin: (state, action) => {
            state.wrongPin = action.payload;
        }
    },
});

export const { setPin, deletePin, resetPin, setAnimate, setWrongPin } = keySlice.actions;
export default keySlice.reducer;
