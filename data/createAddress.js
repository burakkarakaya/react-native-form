module.exports = {

    uri: 'https://www.flormar.com.tr/webapi/v3/Address/createAddress',

    /* allErrMessage: true durumunda tüm hata mesajları sayfanın en üstünde, false durumunda ilgili elementin altında gösterilir */
    allErrMessage: false,

    /* işlem başarıyla gerçekleşmişse ve özel bir mesaj göstermek isteniliyorsa mesaj bu kısma yazılır */
    successMessage: '',

    buttonText: 'Kaydet',

    /* post için oluşturulan nesneye sabit bir alan eklenecekse bu kısma */
    addFields: [
        {
            id: 'corprateFl',
            value: false
        },
    ],

    fields: [
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
                        country: 1,
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
                        k = k || '';
                        /* phone formatlama, "mobilePhone": "0(999) 9999999 => 9999999999" */
                        if (k[0] == 0)
                            k = k.substr(1, k.length);

                        return k.replace(/\(/g, '').replace(/\)/g, '').replace(/\s+/g, '');
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