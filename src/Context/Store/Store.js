import { createStore } from "redux";
import userReducer from "../Reducers/Reducers.js";

const store = createStore(userReducer);

export default store;
