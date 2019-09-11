module.exports = {

    uri: 'https://www.flormar.com.tr/webapi/v3/Cart/useCoupon',

    successMessage: 'Kupon Kodunuz Aktif Edilmiştir.',

    showButton: false,
    
    buttonText: 'Kullan',
    
    buttonStyle: {
        width: 60
    },

    fields: [
        {
            wrapperStyle: {
                flex: 1
            },
            items: [
                {
                    id: 'couponCode',
                    //title: 'Promosyon Kodum',
                    showHeader: false,    
                    type: 'text',
                    value: '',
                    validation: [{ key: 'isEmpty' }],
                    //disabled: false,
                    css: {
                        containerStyle: { 
                            marginBottom: 0,
                            marginRight: 0, 
                        }
                    },           
                },
            ]
        }

    ]

};