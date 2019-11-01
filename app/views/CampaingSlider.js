import React, { Component, PureComponent } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';

const ScreenWidth = Math.round(Dimensions.get('window').width),
    Ratio = 235 / 120; // tasarımdaki image en boy oranı

const AllCampaing = require('../../data/allCampaing.js');

class CampaingSliderItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        const _self = this,
            { onPress, data = {} } = _self.props;

        if (onPress)
            onPress(data);
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

        - campaingType => kampanya tipi belirlenir. Varsayılan olarak allCampaign seçili gelir. Bu değer jsondaki değerden gelir

        - showPagination => false gonderilirse pagination gozukmeyecek. Varsayılan değeri true
    */

    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            activeSlide: 0
        }
    }

    componentDidMount() {
        const _self = this,
            { firstNElemenet = -1, campaingType = 'allCampaign' } = _self.props,
            { catId = '' } = _self.props.data || {},
            data = (AllCampaing[campaingType] || [])[0][catId] || {},
            children = data['children'] || [];

        if (Utils.detect(children))
            _self.setState({ entries: children.slice(0, firstNElemenet) });
    }

    _getDimensions = () => {
        let _self = this,
            { rate = 1, size = ScreenWidth } = _self.props;

        size = Math.floor(size * rate);

        return { width: size, height: Math.floor(size / Ratio) };
    }

    _onCampaingItemClicked = (data) => {
        const _self = this,
            { onPress } = _self.props;

        if (onPress)
            onPress(data);

        /* 
        
        */
        Utils.getDataByUrl({ uri: data['uri'] || '' });
    }

    _renderItem = ({ item, key }) => {
        const _self = this,
            dimensions = _self._getDimensions(),
            { type = 'type-1' } = _self.props;

        return <CampaingSliderItem onPress={_self._onCampaingItemClicked} size={dimensions} type={type} key={key} data={item} />;
    }

    _getPagination = () => {
        const _self = this,
            { showPagination = true } = _self.props,
            { entries, activeSlide } = _self.state;


        if (!showPagination) return null;

        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={{
                    marginTop: 10,
                    paddingVertical: 3
                }}
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: '#fc2f6f'
                }}
                inactiveDotStyle={{
                    backgroundColor: '#8590b1'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    _getView = () => {
        let _self = this,
            view = null,
            { entries = [] } = _self.state;

        if (Utils.detect(entries)) {
            const dimensions = _self._getDimensions(),
                pagination = _self._getPagination();

            view = (
                <View>
                    <Carousel
                        ref={(c) => { _self._carousel = c; }}
                        data={_self.state.entries}
                        renderItem={_self._renderItem}
                        sliderWidth={dimensions['width']}
                        itemWidth={dimensions['width']}
                        onSnapToItem={(index) => _self.setState({ activeSlide: index })}
                        inactiveSlideScale={1}
                        activeSlideAlignment='center'
                        hasParallaxImages={true}
                        layoutCardOffset={0}
                        enableSnap={true}
                    />
                    {pagination}
                </View>
            );

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