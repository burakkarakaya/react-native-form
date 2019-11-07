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
    constructor(props) {
        super(props);
        this.state = {
            recommendationData: [],
            inputValue: ''
        };
    }

    componentDidMount() {
        const _self = this;
        _self.setState({ recommendationData: RecommendationData });
    }

    _getInput = () => {
        const _self = this,
            { } = _self.state;
        /*return (
            <TextInput
                ref={element => {
                    _self.input = element
                }}
                autoCapitalize={'none'}
                underlineColorAndroid={'transparent'}
                style={inputSty}
                placeholder={'Arama'}
                placeholderTextColor={TITLE_COLOR}
                value={this.state.value}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}

                onFocus={this._onFocus}
                onBlur={this._onBlur}
                onChangeText={this._onChangeText}
            />
        );*/
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

        if (Utils.detect(recommendationData)) {
            const btn = [],
                lngth = recommendationData.length - 1;

            Object
                .entries(recommendationData)
                .forEach(([ind, item]) => {
                    marginRight = ind == lngth ? { marginRight: 0 } : {};
                    btn.push(<Button onPress={onPress} data={item} wrapperStyle={marginRight} />);
                });

            view = (
                <View>
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
            recommendation = _self._getRecommendation();

        return (
            <View style={styles.container}>
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
    }
});