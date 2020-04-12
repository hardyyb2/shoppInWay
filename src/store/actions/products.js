import { db } from '../../firebase/firebase'

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'


export const SET_DETAIL_PRODUCT = 'SET_DETAIL_PRODUCT'
export const SET_CURRENT_BUY_PRODUCT = 'SET_CURRENT_BUY_PRODUCT'

export const SET_CART = 'SET_CART'
export const GET_CART_PRODUCTS_SUCCESS = 'GET_CART_PRODUCTS_SUCCESS'

const requestProducts = () => {
    return {
        type: GET_PRODUCTS_REQUEST
    }
}

const receiveProducts = products => {
    return {
        type: GET_PRODUCTS_SUCCESS,
        products
    }
}

const productsError = () => {
    return {
        type: GET_PRODUCTS_REQUEST
    }
}

const receiveCartProducts = products => {
    return {
        type: GET_CART_PRODUCTS_SUCCESS,
        products
    }
}


export const getProducts = () => dispatch => {
    dispatch(requestProducts())
    const products = []
    db
        .collection('products')
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                products.push({ ...doc.data(), ['id']: doc.id })
            })
        })
        .then(() => {
            dispatch(receiveProducts(products))
        })
        .catch(err => {
            console.log(err)
            dispatch(productsError())
        })
}

export const getCartProducts = (cart) => dispatch => {
    dispatch(requestProducts)
    console.log('called this one')
    const products = []
    if (cart.length === 0) {
        dispatch(receiveCartProducts(products))
    }
    else {
        cart.forEach((dataId, index, arr) => {
            db
                .collection('products')
                .doc(dataId)
                .get()
                .then(res => {
                    products.push({ ...res.data(), ['id']: dataId })
                    if (index === arr.length - 1) {
                        dispatch(receiveCartProducts(products))
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }


}
