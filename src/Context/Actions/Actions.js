export const userSignedIn = (user) => {
  localStorage.setItem("userSignedIn", true);
  localStorage.setItem("user", JSON.stringify(user));
  return { type: "@user/signIn", payload: user };
};

export const userLoggedOut = () => {
  localStorage.setItem("userSignedIn", false);
  localStorage.setItem("user", "");
  return { type: "@user/loggedOut" };
};
