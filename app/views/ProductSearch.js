import React, { Component, PureComponent } from "react";
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    TextInput,
    TouchableOpacity,
} from "react-native";

/* 
    bilgiler bannerdan gelmeli
*/
const RecommendationData = [
    { title: 'Makyaj', uri: 'https://www.cosmetica.com.tr/nivea-cellular-leke-karsiti-serum-30-ml.html' },
    { title: 'Eyeliner', uri: 'https://www.cosmetica.com.tr/nivea-cellular-leke-karsiti-serum-30-ml.html' },
    { title: 'Parfüm', uri: 'https://www.cosmetica.com.tr/nivea-cellular-leke-karsiti-serum-30-ml.html' },
    { title: 'Fırça', uri: 'https://www.cosmetica.com.tr/nivea-cellular-leke-karsiti-serum-30-ml.html' },
    { title: 'Ruj', uri: 'https://www.cosmetica.com.tr/nivea-cellular-leke-karsiti-serum-30-ml.html' },
    { title: 'Deodorant', uri: 'https://www.cosmetica.com.tr/nivea-cellular-leke-karsiti-serum-30-ml.html' },
    { title: 'Saç', uri: 'https://www.cosmetica.com.tr/nivea-cellular-leke-karsiti-serum-30-ml.html' }
];


class Button extends PureComponent {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        const _self = this,
            { onPress, data } = _self.props;

        if (onPress)
            onPress(data);
    }

    render() {
        const _self = this,
            { wrapperStyle = {}, txtStyle = {} } = _self.props || {},
            { title = '' } = _self.props.data || {};

        return (
            <TouchableOpacity onPress={_self.onPress} activeOpacity={.8} style={[styles.ButtonContainer, wrapperStyle]}>
                <Text style={[styles.ButtonText, txtStyle]}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

class ProductSearch extends PureComponent {
    /*
        suggestionsData: getSearchSuggestionList servisinden dönen data basılır 
        recommendationData: önerilen kategoriler emosdan export ile gelecek
        inputValue: input içerisindeki değer tutulur
        maxChar: input girilen karekter sayısı 3 altındaysa önerilen gözükecek, 3 ve üzeriyse servise istek yapacak
    */
    constructor(props) {
        super(props);
        const _self = this;
        _self.state = {
            suggestionsData: [],
            recommendationData: [],
            inputValue: '',
            maxChar: 3
        };

        _self.stm = null;
        _self.clearTm = () => {
            if (_self.stm != null)
                clearTimeout(_self.stm);
        }
    }

    componentDidMount() {
        const _self = this;
        _self._isMounted = true;
        _self.setState({ recommendationData: RecommendationData });
    }

    componentWillUnmount() {
        const _self = this;
        _self._isMounted = false;
    }

    /* 
        Ajx
    */
    _setAjx = ({ uri = '', data = {} }, callback) => {
        const _self = this;
        Utils.fetch(uri, JSON.stringify(data), (res) => {
            if (_self._isMounted) {
                if (res.status != 200) {
                    callback({ type: 'error' });
                    return false;
                }
                callback({ type: 'success', ...res });
            }
        });
    }

    /* 
        getSuggestionList   
    */
    _getSuggestionList = (value) => {
        const _self = this;
        _self._setAjx({ uri: Utils.getURL({ key: 'product', subKey: 'getSearchSuggestionList' }), data: { searchText: value } }, (res) => {
            if (res['type'] == 'success')
                _self.setState({ suggestionsData: res.data.suggestions || [] });
        });
    }

    /* 
        input
    */
    _getIcoButton = ({ ico = '' }, callback) => {
        return (
            <TouchableOpacity onPress={callback}>
                <Text>{ico}</Text>
            </TouchableOpacity>
        );
    }

    _onChangeText = (value) => {
        const _self = this;
        _self.setState({ inputValue: value }, () => {
            if (!_self._charControl()) {
                _self.clearTm();
                _self.stm = setTimeout(() => {
                    _self._getSuggestionList(value);
                }, 333);
            }
        });
    }

    _onFocus = () => {

    }

    _onBlur = () => {

    }

    _getInput = () => {
        const _self = this,
            { inputValue = '' } = _self.state,
            btnClose = _self._getIcoButton({ ico: 'close' }, () => { }),
            btnClear = _self._getIcoButton({ ico: 'clear' }, () => { _self._onChangeText(''); });

        return (
            <View style={styles.inputWrapper}>
                {btnClose}
                <TextInput
                    ref={element => {
                        _self.input = element
                    }}
                    autoCapitalize={'none'}
                    underlineColorAndroid={'transparent'}
                    style={styles.input}
                    placeholder={'Arama'}
                    placeholderTextColor={styles.inputPlaceholder.color}
                    value={inputValue}
                    onFocus={_self._onFocus}
                    onBlur={_self._onBlur}
                    onChangeText={_self._onChangeText}
                />
                {btnClear}
            </View>

        );
    }

    _charControl = () => {
        const _self = this,
            { maxChar, inputValue = '' } = _self.state;

        return inputValue.length < maxChar ? true : false;
    }

    /* 
        önerilen ürün ve markalar
    */
    _getRecommendation = () => {
        let _self = this,
            { recommendationData = [] } = _self.state,
            view = null,
            onPress = () => {

            };

        if (Utils.detect(recommendationData) && _self._charControl()) {
            const btn = [],
                lngth = recommendationData.length - 1;

            Object
                .entries(recommendationData)
                .forEach(([ind, item]) => {
                    marginRight = ind == lngth ? { marginRight: 0 } : {};
                    btn.push(<Button onPress={onPress} data={item} wrapperStyle={marginRight} />);
                });

            view = (
                <View style={styles.recommendationWrapper}>
                    <Text style={styles.recommendationTitle}>{'Öneriler'}</Text>
                    <View style={styles.recommendationContainer}>
                        {btn}
                    </View>
                </View>
            );
        }

        return view;
    }

    render() {
        const _self = this,
            input = _self._getInput(),
            recommendation = _self._getRecommendation();

        return (
            <View style={styles.container}>
                {input}
                {recommendation}
            </View>

        );
    }
}

export { ProductSearch };

/* 
    Styles
*/

const styles = StyleSheet.create({
    container: {

    },

    recommendationWrapper: {
        paddingHorizontal: 30
    },
    recommendationContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    recommendationTitle: {
        color: '#1d262c',
        fontSize: 15,
    },
    ButtonContainer: {
        minWidth: 84,
        paddingHorizontal: 25,
        paddingVertical: 7,
        justifyContent: 'center',
        borderColor: '#ebedf6',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
        marginRight: 10,
        marginTop: 10
    },

    ButtonText: {
        color: '#535d7e',
        fontSize: 14
    },

    inputWrapper: {
        flexDirection: 'row',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#f1f4ff',
        height: 44,
        paddingHorizontal: 20,
        flex: 1
    },
    inputPlaceholder: {
        color: '#535d7e'
    }
}); 