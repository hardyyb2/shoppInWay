import { combineReducers } from "redux"

import auth from "./auth";
import products from './products'
import user from './user'

export default combineReducers({ auth, products, user });



