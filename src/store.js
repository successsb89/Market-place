import { createStore } from "redux";

const reducer = (state, action) => {
  if (action.type === "signup-sucess") {
    return { ...state, signup: true };
  }

  if (action.type === "login-success") {
    return { ...state, signup: false, loggedIn: true };
  }
};

//initial state.
const store = createStore(reducer, {
  signup: false,
  loggedIn: false,
});

// store.js는 최상위에다가 한번에 물려줘서 다른자식들도 수혜를 받게한다.
//reference: index.jsx
export default store;
