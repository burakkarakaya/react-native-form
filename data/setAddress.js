module.exports = {

    /*  form default data config */
    defValue: {
        uri: Utils.getURL({ key: 'address', subKey: 'getAddress' }),
        keys: {
            arr: 'addresses',
        },

        /* 
            default değerlerde belirtilen case gerçekleşirse form disabled oluyor  
        */
        disableForm: {
            readOnly: {
                value: true,
                msg: '! Bu fatura adresinizi daha önce bir siparişinizde kullandığınız için değiştiremiyorsunuz.'
            }
        }
    },

    buttonText: 'KAYDET',

    /* uri: istek yapılacak url */
    uri: Utils.getURL({ key: 'address', subKey: 'setAddress' }),

    /* allErrMessage: true durumunda tüm hata mesajları sayfanın en üstünde, false durumunda ilgili elementin altında gösterilir */
    allErrMessage: false,

    /* işlem başarıyla gerçekleşmişse ve özel bir mesaj göstermek isteniliyorsa mesaj bu kısma yazılır */
    successMessage: '',

    fields: [
        {
            items: [
                {
                    id: 'addressId',
                    title: 'addressId',
                    type: 'hiddenObject',
                    value: 0,
                },

                {
                    id: 'corprateFl',
                    title: 'corprateFl',
                    type: 'hiddenObject',
                    value: false,
                },

                {
                    id: 'companyName',
                    title: 'companyName',
                    type: 'hiddenObject',
                    value: '',
                },

                {
                    id: 'phone',
                    title: 'phone',
                    type: 'hiddenObject',
                    value: '',
                },

                {
                    id: 'readOnly',
                    title: 'readOnly',
                    type: 'hiddenObject',
                    value: false,
                },

                {
                    id: 'taxNumber',
                    title: 'taxNumber',
                    type: 'hiddenObject',
                    value: '',
                },

                {
                    id: 'taxOffice',
                    title: 'taxOffice',
                    type: 'hiddenObject',
                    value: '',
                },

                {
                    id: 'tckn',
                    title: 'tckn',
                    type: 'hiddenObject',
                    value: '',
                },
            ]
        },
        {
            items: [
                {
                    id: 'addressName',
                    title: 'Kayıt İsmi',
                    type: 'text',
                    value: '',
                    validation: [{ key: 'isEmpty' }, { key: 'isMin', value: 2 },],
                    regex: 'typ1',
                },
                {
                    id: 'fullName',
                    title: 'Ad Soyad',
                    type: 'text',
                    value: '',
                    validation: [{ key: 'isEmpty' }, { key: 'isTwo', value: { first: 3, last: 2 } }],
                    regex: 'typ1'
                },
            ]
        },
        {
            items: [
                {
                    id: 'country',
                    title: 'Ülke/Şehir',
                    type: 'countryPicker',
                    value: {
                        country: -1,
                        city: -1,
                        district: -1,
                    },
                    errorState: {
                        countryId: { error: false, errorMsg: null },
                        cityId: { error: false, errorMsg: null },
                        districtId: { error: false, errorMsg: null }
                    },
                    css: {
                        countryContainerStyle: { width: 0, height: 0, marginBottom: 0, opacity: 0 }
                    }
                },
            ]
        },
        {
            items: [
                {
                    id: 'zipCode',
                    title: 'Posta Kodu',
                    type: 'text',
                    value: '',
                    mask: '99999',
                    validation: [{ key: 'isEmpty' }],
                    keyboardType: 'numeric',
                },
                {
                    id: 'mobilePhone',
                    title: 'Cep Telefonu',
                    type: 'text',
                    placeholder: '',
                    value: '',
                    mask: '0599 9999999',
                    customFormat: (k) => {
                        return Utils.customPhoneFormat(k);
                    },
                    validation: [{ key: 'isEmpty' }, { key: 'isPhone' },],
                    keyboardType: 'numeric',
                    regex: 'typ5',
                },
            ]
        },
        {
            items: [
                {
                    id: 'address',
                    title: 'Adres',
                    type: 'text',
                    value: '',
                    multiline: true,
                    validation: [{ key: 'isEmpty' }, { key: 'isMin', value: 10 }],
                    css: {
                        wrapperStyle: {
                            height: 200,
                            alignItems: 'flex-start',
                            paddingTop: 10,
                            paddingBottom: 10,
                        }
                    }
                },
            ]
        },
    ]
};