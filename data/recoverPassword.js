module.exports = {
    uri: 'https://www.flormar.com.tr/webapi/v3/User/recoverPassword',

    successMessage: '',

    fields: [
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
                },
            ]
        },
    ]

};