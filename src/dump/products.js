import { db } from '../firebase/firebase'

export const products = [
    {
        "product_subtitle": "This is the best of its type",
        "product_description": "This is the best thing on internet today.You can buiy alot of things but nothing would ever compare tot this . Ths is our promise.",
        "product_image": "https://guesseu.scene7.com/is/image/GuessEU/M63H24W7JF0-L302-ALTGHOST?wid=1500&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
        "product_title": "CHECK PRINT SHIRT",
        "product_price": 110,
        "product_rating": 4.8
    },
    {
        "product_subtitle": "This is the best of its type",
        "product_description": "This is the best thing on internet today.You can buiy alot of things but nothing would ever compare tot this . Ths is our promise.",
        "product_image": "https://guesseu.scene7.com/is/image/GuessEU/FLGLO4FAL12-BEIBR?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
        "product_title": "GLORIA HIGH LOGO SNEAKER",
        "product_price": 91,
        "product_rating": 4.8
    },

    {
        "product_subtitle": "This is the best of its type",
        "product_description": "This is the best thing on internet today.You can buiy alot of things but nothing would ever compare tot this . Ths is our promise.",
        "product_image": "https://guesseu.scene7.com/is/image/GuessEU/HWVG6216060-TAN?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
        "product_title": "CATE RIGID BAG",
        "product_price": 94.5,
        "product_rating": 4.8
    }, {
        "product_subtitle": "This is the best of its type",
        "product_description": "This is the best thing on internet today.You can buiy alot of things but nothing would ever compare tot this . Ths is our promise.",
        "product_image": "http://guesseu.scene7.com/is/image/GuessEU/WC0001FMSWC-G5?wid=520&fmt=jpeg&qlt=80&op_sharpen=0&op_usm=1.0,1.0,5,0&iccEmbed=0",
        "product_title": "GUESS CONNECT WATCH",
        "product_price": 438.9,
        "product_rating": 4.8
    }, {
        "product_subtitle": "This is the best of its type",
        "product_description": "This is the best thing on internet today.You can buiy alot of things but nothing would ever compare tot this . Ths is our promise.",
        "product_image": "https://guesseu.scene7.com/is/image/GuessEU/AW6308VIS03-SAP?wid=700&amp;fmt=jpeg&amp;qlt=80&amp;op_sharpen=0&amp;op_usm=1.0,1.0,5,0&amp;iccEmbed=0",
        "product_title": "'70s RETRO GLAM KEFIAH",
        "product_price": 20,
        "product_rating": 4.8
    }]


// products.forEach(product => {
//     product['product_title_index'] = product.product_title.split(' ')
//     db.collection("products").add(product)
//         .then(res => {
//             console.log(res)
//         }).catch(err => {
//             console.log(err)
//         })
// }) 
