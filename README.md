# Kurulması gerekli olan paketler

```HTML
yarn add react-native-masked-text react-native-datepicker react-native-reanimated react-native-gesture-handler react-native-screens react-navigation-stack redux react-redux rn-placeholder react-native-render-html
```
# Kullanımı

1. Öncelikle config dosyası hazırlanır.

```JS
// login.js dosyası içeriği

module.exports = {

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

```

2. Hazırlanan config dosyası forma gönderilir.
```JS
render(){
    return <Form data={require('./data/login.js')} />
}
```
