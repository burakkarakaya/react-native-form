module.exports = {

    //theme: 'LIGHT',

    uri: 'https://www.flormar.com.tr/webapi/v3/User/login',

    successMessage: '',

    fields: [
        {
            items: [
                {
                    id: 'email',
                    title: 'Kullanıcı Adı',
                    type: 'text',
                    value: '',
                    validation: [{ key: 'isEmpty' }, { key: 'isMail', }],
                    keyboardType: 'email-address',
                },
            ]
        },
        {
            items: [
                {
                    id: 'password',
                    title: 'Şifre',
                    type: 'text',
                    secureTextEntry: true,
                    value: '',
                    validation: [{ key: 'isEmpty' }, { key: 'isMin', value: 6 }, { key: 'isPassword' },],
                }
            ]
        },

    ]

};