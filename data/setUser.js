module.exports = {

    /*  form default data config */
    defValue: {
        uri: 'https://www.flormar.com.tr/webapi/v3/User/getUser',
    },

    /* uri: istek yapılacak url */
    uri: 'https://www.flormar.com.tr/webapi/v3/User/setUser',

    /* allErrMessage: true durumunda tüm hata mesajları sayfanın en üstünde, false durumunda ilgili elementin altında gösterilir */
    allErrMessage: false,

    /* işlem başarıyla gerçekleşmişse ve özel bir mesaj göstermek isteniliyorsa mesaj bu kısma yazılır */
    successMessage: 'Bilgileriniz başarıyla güncellenmiştir',

    buttonText: 'KAYDET',

    fields: [
        {
            items: [
                {
                    id: 'firstName',
                    title: 'Ad',
                    type: 'text',
                    placeholder: '',
                    value: '',
                    validation: [{ key: 'isEmpty' }, { key: 'isMin', value: 3 },],
                    regex: 'typ1',
                },
                {
                    id: 'lastName',
                    title: 'Soyad',
                    type: 'text',
                    placeholder: '',
                    value: '',
                    validation: [{ key: 'isEmpty' }, { key: 'isMin', value: 2 }],
                    regex: 'typ1'
                },
            ]
        },
        {
            items: [
                {
                    id: 'email',
                    title: 'E-mail',
                    type: 'text',
                    placeholder: '',
                    value: '',
                    validation: [{ key: 'isEmpty' }, { key: 'isMail', }],
                    keyboardType: 'email-address',
                    disabled: true,
                    css: {
                        wrapperStyle: {
                            backgroundColor: '#eee'
                        }
                    }
                }
            ]
        },

        {
            wrapperStyle: {
                flexDirection: 'row'
            },
            items: [
                {
                    constantValue: true,
                    id: 'pass',
                    title: 'Şifre',
                    type: 'text',
                    secureTextEntry: true,
                    value: 'flrapp',
                    disabled: true,
                    css: {
                        wrapperStyle: {
                            backgroundColor: '#eee'
                        }
                    }
                },
                {
                    constantValue: true,
                    id: 'passChangeButton',
                    title: 'Şifremi değiştir',
                    type: 'button',
                    value: 'button',
                    fontStyle: {
                        textDecorationLine: 'underline',
                    },
                    wrapperStyle: {
                        paddingLeft: 10,
                        paddingRight: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    modal: {
                        modalTitle: "ŞİFREMİ DEĞİŞTİR",
                        type: "SET_FORM",
                        itemType: "changePassword"
                    }
                }
            ]
        },


        {
            items: [
                {
                    id: 'mobilePhone',
                    title: 'Cep Telefonu',
                    type: 'text',
                    placeholder: '',
                    value: '',
                    mask: '0999 9999999',
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
                    disabled: true,
                    css: {
                        wrapperStyle: {
                            backgroundColor: '#eee'
                        }
                    }
                },
            ]
        },

        {
            items: [
                {
                    id: 'birthDay',
                    title: 'Doğum Tarihi',
                    type: 'dataTimePicker',
                    placeholder: '',
                    value: '',
                    customFormat: (k) => {
                        k = k || '';
                        var _t = this;
                        /* date formatlama, "birtday": "22.1.1990 00:00:00 => 22011990" */
                        k = k.split(' ')[0];
                        k = k.split('.');

                        k[0] = _t.setDateFormat(k[0]);
                        k[1] = _t.setDateFormat(k[1]);

                        return (k[0] + '' + k[1] + '' + k[2]);
                    },
                    maxDate: -14,
                    validation: [{ key: 'isEmpty' }, { key: 'isDate' },],
                    disabled: true,
                    css: {
                        wrapperStyle: {
                            backgroundColor: '#eee'
                        }
                    }
                },
            ]
        },
        {
            items: [
                {
                    id: 'gender',
                    title: 'Cinsiyet',
                    type: 'select',
                    values: [{ key: 'Seçiniz', value: -1, disabled: true }, { key: 'Erkek', value: 'E' }, { key: 'Kadın', value: 'K' }],
                    value: -1,
                    multiple: false,
                    validation: [{ key: 'isSelection' }],
                },
            ]
        },
        {
            items: [
                {
                    id: 'isMailSubscribe',
                    title: 'E-Posta',
                    desc: 'E-Posta ile bilgilendirme istiyorum',
                    type: 'chekbox',
                    value: true,
                    //validation: [{ key: 'isChecked' },],
                },
            ]
        },
        {
            items: [
                {
                    id: 'isSmsSubscribe',
                    title: 'SMS iptal',
                    desc: 'SMS iptali için 3347 RET FLR yazarak mesaj gönderebilirsin.SMS ve e-posta almak istemiyorsan 0850 333 0 319 nolu çağrı merkezimizden bize ulaşabilirsin.',
                    type: 'chekbox',
                    value: true,
                    //validation: [{ key: 'isChecked' },],
                },

            ]
        },

    ]

};