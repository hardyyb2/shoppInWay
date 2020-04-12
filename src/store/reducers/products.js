import {
    SET_DETAIL_PRODUCT,
    SET_CURRENT_BUY_PRODUCT

} from '../actions/products'

const initialState = {
    currentDetailProduct: null,
    currentBuyProduct: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DETAIL_PRODUCT:
            return {
                ...state,
                currentDetailProduct: action.product
            }
        case SET_CURRENT_BUY_PRODUCT: {
            return {
                ...state,
                currentBuyProduct: action.product
            }
        }
        default:
            return state
    }


}

export default reducer