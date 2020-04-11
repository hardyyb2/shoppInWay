import { combineReducers } from "redux"

import auth from "./auth";
import products from './products'

export default combineReducers({ auth, products });



