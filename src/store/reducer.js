import * as actionTypes from './actions'

const initialState = {
    currentDetailProduct: null,
    currentBuyProduct: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_DETAIL_PRODUCT:
            return {
                ...state,
                currentDetailProduct: action.product
            }
        case actionTypes.SET_CURRENT_BUY_PRODUCT: {
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