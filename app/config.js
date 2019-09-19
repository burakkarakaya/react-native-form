module.exports = {
    // tanımlı formlar
    form: {
        changePassword: require('../data/changePassword.js'),
        createAddress: require('../data/createAddress.js'),
        createUser: require('../data/createUser.js'),
        creditCart: require('../data/creditCart.js'),
        deleteCoupon: require('../data/deleteCoupon.js'),
        login: require('../data/login.js'),
        recoverPassword: require('../data/recoverPassword.js'),
        review_submission: require('../data/review_submission.js'),
        setAddress: require('../data/setAddress.js'),
        setUser: require('../data/setUser.js'),
        useCoupon: require('../data/useCoupon.js'),
    },
    viewer: {
        favorite: {
            "title": "FAVORİLERİM",
            "type": "listViewer",
            "itemType": "favorite",
            "uri": {
                "key": "user",
                "subKey": "getFavoriteProductList"
            },
            "keys": {
                "id": "productId",
                "arr": "products",
                "total": "totalProductCount"
            },
            "data": {
                "productId": 0
            }
        },
    }
};