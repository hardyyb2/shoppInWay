import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_FAILURE,
    GET_PRODUCTS_SUCCESS,
    SET_DETAIL_PRODUCT,
    SET_CURRENT_BUY_PRODUCT,
    SET_CART,
    GET_CART_PRODUCTS_SUCCESS,
    SEARCH_REQUEST,
    SET_SEARCH_PRODUCTS,
    SEARCH_ERROR
} from '../actions/products'

const initialState = {
    loading: false,
    products: null,
    cart: [],
    localCartProducts: null,
    currentDetailProduct: null,
    currentBuyProduct: null,
    searchLoading: false,
    searchText: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //fetch products
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.products
            }

        //SET cart
        case SET_CART:
            return {
                ...state,
                cart: action.cart
            }
        case GET_CART_PRODUCTS_SUCCESS:
            return {
                ...state,
                localCartProducts: action.products,
                loading: false
            }

        //GET current details product
        case SET_DETAIL_PRODUCT:
            return {
                ...state,
                currentDetailProduct: action.product,
                loading: false
            }

        //GET current buy product
        case SET_CURRENT_BUY_PRODUCT: {
            return {
                ...state,
                currentBuyProduct: action.product,
                loading: false
            }
        }

        //search
        case SEARCH_REQUEST: {
            return {
                ...state,
                searchLoading: true
            }
        }
        case SET_SEARCH_PRODUCTS: {
            return {
                ...state,
                searchProducts: action.payload.searchProducts,
                searchText: action.payload.searchText,
                searchLoading: false
            }
        }

        case SEARCH_ERROR: {
            return {
                ...state,
                searchLoading: false
            }
        }

        default:
            return state
    }


}

export default reducer