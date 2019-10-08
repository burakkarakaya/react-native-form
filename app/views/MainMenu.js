import React, { Component, PureComponent } from "react";
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

/* 
    getCategoryList ile dönen json manipule etmek için kullanıyoruz. 
    Gereksiz alanları çıkartarak { catId: catId, catName: catName, imageUrl: '' } alanları kalıyor
*/

const _getArr = (data) => {
    const arr = [];

    if (data.length > 0)
        Object.entries(data).forEach(([key, item]) => {
            const { catId = '', catName = '', childs = [] } = item,
                obj = { catId: catId, catName: catName, imageUrl: '' };

            if (childs)
                obj['childs'] = _getArr(childs);

            arr.push(obj);
        });

    return arr;
}

/* 
    Aktif içerik
*/

class Content extends Component {
    constructor(props) {
        super(props);
    }

    _getButton = () => {

        let _self = this,
            { data = [] } = _self.props || {},
            view = null;

        console.log(data);

        if (Utils.detect(data)) {
            const btn = Object
                .keys(data)
                .map(key => {
                    const item = data[key] || {},
                        { catName = '' } = item;

                    return (
                        <Text key={key}>{catName}</Text>
                    )
                });

            view = (
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                >
                    {btn}
                </ScrollView>
            );
        }
        return view
    }

    render() {
        const _self = this,
            button = _self._getButton();

        return button;
    }
}


/* 
    SideBar
*/

class SideBarButton extends Component {
    constructor(props) {
        super(props);
    }

    _onPress = () => {
        const _self = this,
            { onPress, data = {}, sequence = 0 } = _self.props;
        if (onPress)
            onPress({ data: data, sequence: sequence });
    }

    _getIcon = () => {
        let _self = this,
            { data } = _self.props,
            { imageUrl = '' } = data || {},
            view = null;

        if (imageUrl != '')
            view = (
                <Image
                    style={styles.sideBarButtonIcon}
                    source={{ uri: Utils.getImage(imageUrl) }}
                />
            );

        return view;
    }

    render() {
        const _self = this,
            { catName = '', active = false } = _self.props.data || {},
            ico = _self._getIcon(),
            activeButtonWrapper = active ? styles.sideBarButtonActiveWrapper : {},
            triangle = active ? <View style={styles.triangle} /> : null;

        return (
            <TouchableOpacity
                activeOpacity={.8}
                style={[styles.sideBarButtonWrapper, activeButtonWrapper]}
                onPress={_self._onPress}>
                {triangle}
                {ico}
                <Text style={styles.sideBarButtonText}>{catName}</Text>
            </TouchableOpacity>
        );
    }
}

/* 
    Menu
*/

class MainMenu extends Component {
    constructor(props) {
        super(props);
        state = {
            temp: 0, // bir önceki aktif buton indexi tutulut
            data: [], // tüm kategori datası
            active: [] // 2. seviyede active olan kategorinin datası
        };
    }

    componentDidMount() {
        const _self = this;
        _self._isMounted = true;

        /* 
            tüm kategori listesi çekilir
        
            _self._setAjx({ uri: Utils.getURL({ key: 'product', subKey: 'getCategoryList' }) });
        */

        _self.setState({ data: require('../../data/menu.json') });
    }

    componentWillUnmount() {
        const _self = this;
        _self._isMounted = false;
    }

    _setAjx = ({ uri = '', data = {} }, callback) => {
        const _self = this;
        Utils.fetch(uri, JSON.stringify(data), (res) => {
            if (_self._isMounted) {

                if (res.status != 200) return false;

                const data = res['data']['categories'] || [];

                //console.log( JSON.stringify(data) );
                //console.log(JSON.stringify(_getArr(data)));

                _self.setState({ data: data });
            }
        });
    }

    /* 
        sidebar 
    */

    _onSideBarButtonPress = (obj) => {
        const _self = this,
            { data, temp = 0 } = _self.state,
            { sequence = 0 } = obj;

        data[temp]['active'] = false;
        data[sequence]['active'] = true;

        _self.setState({ data: data, temp: sequence, active: data[sequence]['childs'] || [] });
    }

    _getSideBar = () => {
        let _self = this,
            { data = [] } = _self.state || {},
            view = null;

        if (Utils.detect(data)) {
            const btn = Object
                .keys(data)
                .map(key => {
                    const item = data[key] || {};

                    return (
                        <SideBarButton
                            sequence={key}
                            key={key}
                            data={item}
                            onPress={_self._onSideBarButtonPress}
                        />
                    )
                });

            view = (
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    style={styles.sideBarScrollerWrapper}
                >
                    {btn}
                </ScrollView>
            );
        }

        return view;
    }

    /* 
        aktif olan content
    */
    _getContent = () => {
        let _self = this,
            { active = [] } = _self.state || {},
            view = null;

        if (Utils.detect(active))
            view = <Content data={active} />;


        return view;
    }


    render() {
        const _self = this,
            sideBar = _self._getSideBar(),
            content = _self._getContent();

        return (
            <View style={styles.wrapper}>
                <View style={styles.sideBarWrapper}>
                    {sideBar}
                </View>
                <View style={styles.contentWrapper}>
                    {content}
                </View>

            </View>
        );
    }
}

export { MainMenu };

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row'
    },

    /* 
        sidebar
    */
    sideBarWrapper: {
        width: 100,
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        borderRightColor: '#ebedf6'
    },
    sideBarScrollerWrapper: {
        flex: 1,
        overflow: 'visible'
    },
    sideBarButtonWrapper: {
        paddingTop: 9,
        paddingBottom: 13,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    sideBarButtonIcon: {
        width: 42,
        height: 42
    },
    sideBarButtonText: {
        fontSize: 12,
        color: '#535d7e',
        marginTop: 6
    },
    sideBarButtonActiveWrapper: {
        backgroundColor: '#f1f4ff'
    },
    triangle: {
        position: 'absolute',
        right: -12,
        top: '60%',

        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 11,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#f1f4ff',
        transform: [
            { rotate: '90deg' }
        ]
    },

    /* 
        content
    */

    contentWrapper: {
        flex: 1
    }

});