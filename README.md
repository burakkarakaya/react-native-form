# Kurulması gerekli olan paketler

```HTML
yarn add react-native-masked-text react-native-datepicker react-native-reanimated react-native-gesture-handler react-native-screens react-navigation-stack react-redux rn-placeholder react-native-render-html
```
# Kullanımı

```JS
module.exports = {

    //theme: 'LIGHT',

    uri: Utils.getURL({ key: 'user', subKey: 'login' }),

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

```
