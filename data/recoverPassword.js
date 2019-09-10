const Utils = require('root/app/helper/Global.js');

module.exports = {
    uri: Utils.getURL({ key: 'user', subKey: 'recoverPassword' }),

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