import { db } from '../../firebase/firebase'

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST'
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE'


export const SET_DETAIL_PRODUCT = 'SET_DETAIL_PRODUCT'
export const SET_CURRENT_BUY_PRODUCT = 'SET_CURRENT_BUY_PRODUCT'

export const SET_CART = 'SET_CART'
export const GET_CART_PRODUCTS_SUCCESS = 'GET_CART_PRODUCTS_SUCCESS'

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SET_SEARCH_PRODUCTS = 'SET_SEARCH_PRODUCTS'
export const SEARCH_ERROR = 'SEARCH_ERROR'

export const SET_FINAL_BUY_PRODUCTS = 'SET_FINAL_BUY_PRODUCTS'

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

const receiveCurrentBuyProduct = product => {
    return {
        type: SET_CURRENT_BUY_PRODUCT,
        product
    }
}

const receiveDetailProduct = product => {
    return {
        type: SET_DETAIL_PRODUCT,
        product
    }
}

const requestSearch = () => {
    return {
        type: SEARCH_REQUEST
    }
}

const setSearchResults = (searchProducts, searchText) => {
    return {
        type: SET_SEARCH_PRODUCTS,
        payload: {
            searchProducts,
            searchText
        }
    }
}

const searchError = () => {
    return {
        type: SEARCH_ERROR
    }
}

const setFinalBuyProducts = products => {
    return {
        type: SET_FINAL_BUY_PRODUCTS,
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
    dispatch(requestProducts())
    const products = []
    console.log('this is cart', cart)
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
                    dispatch(productsError())
                })
        })
    }

}

export const getCurrentBuyProduct = productId => dispatch => {
    dispatch(requestProducts())
    console.log(productId)
    db.collection('products')
        .doc(productId)
        .get()
        .then(res => {
            dispatch(receiveCurrentBuyProduct({ ...res.data(), ['id']: productId }))
        })
        .catch(err => {
            dispatch(productsError())
        })

}

export const getDetailProduct = productId => dispatch => {
    console.log('received product id', productId)
    dispatch(requestProducts())
    console.log(productId)
    db.collection('products')
        .doc(productId)
        .get()
        .then(res => {
            dispatch(receiveDetailProduct({ ...res.data(), ['id']: productId }))
        })
        .catch(err => {
            dispatch(productsError())
        })
}

export const getSearchResults = searchText => dispatch => {
    dispatch(requestSearch())
    const productsRef = db.collection('products')
    productsRef
        .where('product_title_index', 'array-contains', searchText.toUpperCase())
        .get()
        .then(snapshot => {
            let newArr = []

            snapshot.forEach(doc =>
                newArr.push({ ...doc.data(), ['id']: doc.id })
            )
            dispatch(setSearchResults(newArr, searchText))
        })
        .catch(err => {
            dispatch(searchError())
        })


}

export const setFinalProducts = products => dispatch => {
    dispatch(setFinalBuyProducts(products))

}