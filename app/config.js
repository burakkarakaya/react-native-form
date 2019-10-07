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

        followList: {
            "title": "TAKİP LİSTEM",
            "type": "listViewer",
            "itemType": "followList",
            "deleteURI": {
                "key": "user",
                "subKey": "deletePriceFollowUpProduct"
            },
            "uri": {
                "key": "user",
                "subKey": "getPriceFollowUpList"
            },
            "keys": {
                "id": "productId",
                "arr": "products"
            },
            "data": {},
            "filterData": {
                "filtered": true
            }
        },

        order: {
            "title": "SİPARİŞLERİM",
            "type": "listViewer",
            "itemType": "order",
            "uri": {
                "key": "order",
                "subKey": "getOrder"
            },
            "keys": {
                "id": "orderId",
                "arr": "orders"
            },
            "data": {},
            "refreshing": true
        },

        coupon: {
            "title": "KUPONLARIM",
            "type": "listViewer",
            "itemType": "coupon",
            "uri": {
                "key": "integrator",
                "subKey": "getCouponDetail"
            },
            "keys": {
                "id": "couponKey",
                "arr": "couponDetailList"
            },
            "data": {
                "status": 4,
                "type": 2,
                "active": true
            },
            "filterData": {
                "filtered": true
            }
        },
        cartAddressList: {
            "type": "listViewer",
            "itemType": "address",
            "itemButtonType": "cart",
            "uri": {
                "key": "address",
                "subKey": "getAddress"
            },
            "keys": {
                "id": "addressId",
                "arr": "addresses"
            },
            "data": {
                "addressId": 0
            },
            "filterData": {
                "filtered": true
            },
            "refreshing": false,
        },
        addressList: {
            "title": "ADRES BİLGİLERİM",
            "type": "listViewer",
            "itemType": "address",
            "uri": {
                "key": "address",
                "subKey": "getAddress"
            },
            "keys": {
                "id": "addressId",
                "arr": "addresses"
            },
            "data": {
                "addressId": 0
            },
            "filterData": {
                "filtered": true
            }
        },
        cart: {
            "type": "scrollView",
            "itemType": "cartList",
            "uri": {
                "key": "cart",
                "subKey": "getCart"
            },
            "keys": {
                "id": "cartItemId",
                "arr": "products"
            },
            "refreshing": false
        },
        serviceList: {
            "itemType": "serviceList",
            "uri": {
                "key": "service",
                "subKey": "getServiceList"
            },
            "keys": {
                "id": 'serviceId',
                "arr": 'services',
            },
            "data": {
                "countryId": 1,
                "cityId": 1,
            },
            "refreshing": false,
            "filterData": {
                "filtered": true,
                "id": 'country',
                "value": {
                    "country": 1,
                    "city": 1,
                    "district": 0,
                },
                "services": true
            }
        }
    },
    content: {
        'HAKKIMIZDA': {
            "title": "HAKKIMIZDA",
            "type": "webViewer",
            "uri": {
                "key": "content",
                "subKey": "getContent"
            },
            "keys": {
                "arr": "html"
            },
            "data": {
                "contentId": 26099
            },
            "siteURI": "/hakkimizda/"
        },
        'SİPARİŞ SÖZLEŞMESİ': {
            "title": "SİPARİŞ SÖZLEŞMESİ",
            "type": "webViewer",
            "uri": {
                "key": "content",
                "subKey": "getContent"
            },
            "keys": {
                "arr": "html"
            },
            "data": {
                "contentId": 26100
            },
            "siteURI": "/siparis-sozlesmesi/"
        },
        'KOLAY İADE': {
            "title": "KOLAY İADE",
            "type": "webViewer",
            "uri": {
                "key": "content",
                "subKey": "getContent"
            },
            "keys": {
                "arr": "html"
            },
            "data": {
                "contentId": 26102
            },
            "siteURI": "/kolay-iade/"
        },
        'SIKÇA SORULAN SORULAR': {
            "title": "SIKÇA SORULAN SORULAR",
            "type": "webViewer",
            "uri": {
                "key": "content",
                "subKey": "getContent"
            },
            "keys": {
                "arr": "html"
            },
            "data": {
                "contentId": 26123
            },
            "siteURI": "/sss/"
        },
        'Sipariş İptal': {
            "title": "Siparişimi iptal etmek istiyorum, ne yapabilirim?",
            "type": "webViewer",
            "uri": {
                "key": "content",
                "subKey": "getContent"
            },
            "keys": {
                "arr": "html"
            },
            "data": {
                "contentId": 26130
            },
            "siteURI": "/siparis-iptal/"
        },
        'Sipariş Sorgulama': {
            "title": "Sipariş Sorgula",
            "type": "websiteViewer",            
            "siteURI": "/siparis/"
        },
        'Değişim': {
            "title": "İptal / İade / Değişim",
            "type": "webViewer",
            "uri": {
                "key": "content",
                "subKey": "getContent"
            },
            "keys": {
                "arr": "html"
            },
            "data": {
                "contentId": 25839
            },
            "siteURI": "/iptal-iade-degisim/"
        },
        'Ödeme Seçenekleri': {
            "title": "Ödeme Seçenekleri",
            "type": "webViewer",
            "uri": {
                "key": "content",
                "subKey": "getContent"
            },
            "keys": {
                "arr": "html"
            },
            "data": {
                "contentId": 25840
            },
            "siteURI": "/odeme-secenekleri/"
        },
        'Teslimat': {
            "title": "Teslimat",
            "type": "webViewer",
            "uri": {
                "key": "content",
                "subKey": "getContent"
            },
            "keys": {
                "arr": "html"
            },
            "data": {
                "contentId": 25841
            },
            "siteURI": "/teslimat/"
        },
        'Kişisel Verileri Koruma Kanunu': {
            "title": "Kişisel Verileri Koruma Kanunu",
            "type": "webViewer",
            "uri": {
                "key": "content",
                "subKey": "getContent"
            },
            "keys": {
                "arr": "html"
            },
            "data": {
                "contentId": 25844
            },
            "siteURI": "/kisisel-verilerin-korunmasi/"
        },
    }
};