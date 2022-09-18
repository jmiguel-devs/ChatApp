const initialState = {
  userSignedIn: localStorage.getItem("userSignedIn") || false,
  user: JSON.parse(localStorage.getItem("user")) || "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "@user/signIn":
      return { ...state, userSignedIn: true, user: action.payload };

    case "@user/loggedOut":
      return { ...state, userSignedIn: false, user: "" };

    default:
      return state;
  }
};

export default userReducer;
