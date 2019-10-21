import React, { Component, PureComponent } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";

const ScreenWidth = Math.round(Dimensions.get('window').width),
    Ratio = 235 / 120; // tasarımdaki image en boy oranı

const AllCampaing = require('../../data/allCampaing.js');

class CampaingSliderItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        const _self = this,
            { onPress } = _self.props;

        if (onPress)
            onPress();
    }

    _getView = () => {
        const _self = this,
            { size } = _self.props,
            { imgApp = '', img = '', title = '', desc = '' } = _self.props.data || {},
            src = imgApp != '' ? imgApp : img;

        switch (_self.props.type) {
            case 'type-1':
                return (
                    <TouchableOpacity style={{ width: size['width'] }} onPress={_self.onPress} activeOpacity={.8}>
                        <Image
                            style={[styles.img, { width: size['width'], height: size['height'] }]}
                            source={{ uri: Utils.getImage(src) }}
                        />
                        <Text style={[styles.title]}>{title}</Text>
                        <Text style={[styles.desc]}>{desc}</Text>
                        <Text style={[styles.link]}>{'Alışverişe Başla'}</Text>
                    </TouchableOpacity>
                );
            case 'type-2':
                return (
                    <TouchableOpacity style={{ width: size['width'] }} onPress={_self.onPress} activeOpacity={.8}>
                        <Image
                            style={{ width: size['width'], height: size['height'] }}
                            source={{ uri: Utils.getImage(src) }}
                        />
                    </TouchableOpacity>
                );

            default:
                return null;
        }
    }

    render() {
        const _self = this,
            view = _self._getView();

        return view;
    }
}

class CampaingSlider extends PureComponent {
    /* 
        - data => kampanya datası
        
        - firstNElemenet => gelen datada ilk kaç elemanın gözükeceği, gönderilmezse tüm datayı döner
        
        - type => 2 tip slider bulunuyor. Default "type-1", diğer alacağı değer "type-2"
            "type-1": resim, başlık, açıklama
            "type-2": resim
        
        - size => Slider genişliği buraya yazılır ve tasarımdaki en, boy oranına göre yüksekliği hesaplanır.

        - rate => bazen slider kesik gozukmesi istenebilir örneğin ürün liste sayfasındaki gibi o zaman 0-1 arası değer vermek gerekir. Varsayılan 1 
    */

    constructor(props) {
        super(props);
    }

    _getView = () => {
        const _self = this,
            { catId = '' } = _self.props.data || {},
            data = (AllCampaing['allCampaign'] || [])[0][catId] || {},
            view = [],
            children = data['children'] || [];

        if (Utils.detect(children)) {
            let { firstNElemenet = -1, rate = 1, type = 'type-1', size = ScreenWidth } = _self.props;

            size = Math.floor(size * rate);

            Object
                .entries(children.slice(0, firstNElemenet))
                .forEach(([key, item]) => {
                    view.push(<CampaingSliderItem size={{ width: size, height: Math.floor(size / Ratio) }} type={type} key={key} data={item} />);
                });
        }

        return view;
    }

    render() {
        const _self = this,
            view = _self._getView();

        return view;
    }
}

export { CampaingSlider };

/* 
    Styles
*/

const styles = StyleSheet.create({
    img: {
        marginBottom: 16
    },  
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1d262c'
    },
    desc: {
        fontSize: 14,
        color: '#1d262c',
        marginBottom: 14
    },
    link: {
        fontSize: 12,
        color: '#1d262c',
        textDecorationLine: 'underline'
    }
}); 