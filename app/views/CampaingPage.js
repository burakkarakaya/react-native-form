import React, { Component, PureComponent } from "react";
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { CampaingSlider } from './';

/* 
    global variable
*/
const ScreenWidth = Math.round(Dimensions.get('window').width),
    SideBarWidth = 100,
    padding = 60, // border + margin
    contentImageButtonSizeWidth = Math.round((ScreenWidth - SideBarWidth - padding) * .5);

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
    _getArrImgPath: .json dosyasında tanımlı olan resimleri array olarak
*/

const _getArrImgPath = (data) => {
    let arr = [];

    if (data.length > 0)
        Object
            .entries(data)
            .forEach(([key, item]) => {
                const { catName = '', imageUrl = '', childs = [] } = item;

                if (imageUrl != '') {
                    let o = {};
                    o[catName] = imageUrl.replace('/UPLOAD/APP/assets/menu/imgs/', '');
                    arr.push(o);
                }

                if (childs) {
                    const k = _getArrImgPath(childs);
                    arr = arr.concat(k);
                }

            });

    return arr;
}


/* 
    Contents
*/
class ContentButton extends PureComponent {
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
            { catName = '', imageUrl = '' } = _self.props.data || {};

        return (
            <TouchableOpacity onPress={_self.onPress} activeOpacity={.8} style={styles.contentImageButtonContainer}>
                <Image
                    style={[styles.contentImageButtonImage]}
                    source={{ uri: Utils.getImage(imageUrl) }}
                />
                <Text style={styles.contentImageButtonText}>{catName}</Text>
            </TouchableOpacity>

        );
    }
}

class Content extends PureComponent {
    constructor(props) {
        super(props);
    }

    _getView = () => {

        let _self = this,
            { data = [] } = _self.props || {},
            view = null,
            onPress = (obj) => {
                const { callback } = _self.props;
                if (callback)
                    callback(obj);
            };

        if (Utils.detect(data)) {
            const btn = Object
                .keys(data['childs'] || [])
                .map(key => {
                    const item = data['childs'][key] || {};

                    return (
                        <ContentButton onPress={onPress} key={key} data={item} />
                    )
                }),
                campaing = <CampaingSlider size={ScreenWidth - SideBarWidth - 40} type={'type-2'} firstNElemenet={3} data={data} />;

            view = (
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ padding: 20 }}
                >
                    {campaing}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 }}>
                        {btn}
                    </View>

                </ScrollView>
            );
        }
        return view
    }

    render() {
        const _self = this,
            view = _self._getView();

        return view;
    }
}

/* 
    Routes
*/
class Routes extends PureComponent {
    constructor(props) {
        super(props);
        this.Ref = null;
    }

    componentDidMount() {
        const _self = this,
            { onRef } = _self.props;
        if (onRef) onRef(this);
    }

    componentWillUnmount() {
        const _self = this,
            { onRef } = _self.props;
        if (onRef) onRef(null);
    }

    _contentCallback = (obj) => {
        const _self = this,
            { callback } = _self.props;
        if (callback)
            callback(obj);
    }

    _get = () => {
        const _self = this,
            { data = [] } = _self.props,
            _routes = {};


        Object
            .keys(data)
            .map(key => {
                const item = data[key] || {},
                    { catName = '' } = item;

                _routes[catName] = {
                    screen: props => <Content callback={_self._contentCallback} data={item} {...props} />,
                    navigationOptions: {
                        title: catName,
                    }
                };
            });

        return _routes;
    }

    _Navigator = createBottomTabNavigator(
        this._get(),
        {
            tabBarComponent: () => { return null; },
            lazy: true,
            tabBarPosition: 'top',
        }
    );

    /* 
        public func.
    */
    _focused = ({ routesName }) => {
        const _self = this;
        if (_self.Ref)
            _self.Ref._navigation.navigate({ routeName: routesName });
    }

    render() {
        const _self = this,
            Navigator = createAppContainer(_self._Navigator);
        return <Navigator ref={ref => _self.Ref = ref} />
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

    _measureDimensions = (e) => {
        console.log(e.nativeEvent.layout)
    }

    render() {
        const _self = this,
            { catName = '', active = false } = _self.props.data || {},
            ico = _self._getIcon(),
            activeButtonWrapper = active ? styles.sideBarButtonActiveWrapper : {},
            triangle = active ? <View style={styles.triangle} /> : null;

        return (
            <TouchableOpacity
                onLayout={e => this._measureDimensions(e)}
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

class SideBar extends Component {
    constructor(props) {
        super(props);
        const _self = this;
        this.state = {
            temp: 0, // bir önceki aktif buton indexi tutulur
            data: _self.props.data || [], // tüm kategori datası
        };
    }

    _focused = (sequence) => {
        const _self = this,
            h = 85, //  buton yüksekliği eşit olduğu için fix yazılır
            y = Math.round((sequence - 1) * h);

        _self.ScrollView.scrollTo({ X: y });
    }

    _onPress = (obj) => {
        const _self = this,
            { callback } = _self.props,
            { data, temp = 0 } = _self.state,
            { sequence = 0 } = obj;

        data[temp]['active'] = false;
        data[sequence]['active'] = true;

        _self.setState({ data: data, temp: sequence }, () => {
            _self._focused(sequence);
        });

        if (callback)
            callback({ data: data[sequence]['childs'] || [], routesName: data[sequence]['catName'] || '', sequence: sequence });
    }

    _getView = () => {
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
                            onPress={_self._onPress}
                        />
                    )
                });

            view = (
                <ScrollView
                    ref={ref => _self.ScrollView = ref}
                    keyboardShouldPersistTaps='handled'
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.sideBarScrollerWrapper}
                >
                    {btn}
                </ScrollView>
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

/* 
    Main
*/

class Main extends Component {
    constructor(props) {
        super(props);
        const _self = this;
        _self.Navigator = null;

        _self.state = {
            data: [], // tüm kategorinin datası
        };
    }

    componentDidMount() {
        const _self = this;
        _self._isMounted = true;

        /* 
            ajax metod
            tüm kategori listesi çekilir 
            _self._setAjx({ uri: Utils.getURL({ key: 'product', subKey: 'getCategoryList' }) });
        */

        /* 
            manuel metod
        */
        const data = require('../../data/menu.json');
        data[0]['active'] = true; //-> sidebar da ilk butonu seçili hale getiririz.
        //console.log(JSON.stringify(_getArrImgPath(data)));
        setTimeout(() => {
            _self.setState({ data: data });
        }, 1);
    }

    componentWillUnmount() {
        const _self = this;
        _self._resetData();
        _self._isMounted = false;
    }

    _resetData = () => {
        let _self = this,
            { data = [] } = _self.state || {};

        if (Utils.detect(data))
            Object
                .keys(data)
                .map(key => {
                    const item = data[key] || {};
                    item['active'] = false;
                });
    }

    _setAjx = ({ uri = '', data = {} }, callback) => {
        const _self = this;
        Utils.fetch(uri, JSON.stringify(data), (res) => {
            if (_self._isMounted) {

                if (res.status != 200) return false;

                const data = res['data']['categories'] || [];

                //console.log( JSON.stringify(data) );
                console.log(JSON.stringify(_getArr(data)));

                _self.setState({ data: data });
            }
        });
    }

    /* 
        Sidebar
    */
    _getSideBar = () => {
        let _self = this,
            { data = [] } = _self.state,
            view = null,
            callback = (obj) => {
                if (_self.Navigator)
                    _self.Navigator._focused(obj);
            };

        if (Utils.detect(data))
            view = <SideBar callback={callback} data={data} />;

        return view;
    }

    /* 
        Routes
    */

    _routesCallback = (obj) => {
        const _self = this;
        _self.props.navigation.navigate('Detail', obj);
    }

    _getRoutes = () => {
        let _self = this,
            { data = [] } = _self.state || {},
            view = null;

        if (Utils.detect(data))
            view = <Routes callback={_self._routesCallback} onRef={ref => _self.Navigator = ref} data={data} />;

        return view;
    }

    render() {
        const _self = this,
            sideBar = _self._getSideBar(),
            routes = _self._getRoutes();

        return (
            <View style={styles.wrapper}>
                {sideBar}
                {routes}
                <View style={styles.sideBarWrapper}>
                    
                </View>
                <View style={styles.contentWrapper}>
                    
                </View>
            </View>
        );
    }
}

/* 
    Detail
*/

class Detail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        let _self = this,
            { state = {} } = _self.props.navigation,
            { params = {} } = state || {},
            childs = params['childs'] || [],
            data = [...childs];

        data.unshift({ catId: params.catId, catName: 'Tümü' })

        _self.setState({ data: data });
    }

    _onPress = (obj) => {
        console.log(obj);
    }

    _getButton = (obj) => {
        const _self = this;

        return (
            <TouchableOpacity onPress={_self._onPress.bind(this, obj)} activeOpacity={.8}>
                <Text style={styles.detailButtonText}>{obj.catName}</Text>
            </TouchableOpacity>
        );
    }

    _getView = () => {
        let _self = this,
            { data = [] } = _self.state || {},
            view = null;

        if (Utils.detect(data)) {
            const btn = Object
                .keys(data)
                .map(key => {
                    const item = data[key] || {};

                    return _self._getButton(item);
                });

            view = (
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    style={styles.sideBarScrollerWrapper}
                    contentContainerStyle={{ paddingHorizontal: 40, paddingVertical: 30 }}
                >
                    {btn}
                </ScrollView>
            );
        }

        return view;
    }

    render() {
        const _self = this;
        return _self._getView();
    }
}


/* 
    Navigator
*/

const CampaingPage = createAppContainer(createStackNavigator(
    {
        Main: {
            screen: props => <Main {...props} />,
            navigationOptions: () => ({
                header: null
            }),
        },

        Detail: {
            screen: props => <Detail {...props} />,
        },
    }
));

export { CampaingPage };

/* 
    Styles
*/

const styles = StyleSheet.create({
    /* 
        general
    */
    wrapper: {
        flex: 1,
        flexDirection: 'row'
    },

    /* 
        sidebar
    */
    sideBarWrapper: {
        width: SideBarWidth,
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        borderRightColor: '#ebedf6',
        zIndex: 2
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
        flex: 1,
        zIndex: 1
    },
    contentImageButtonContainer: {
        alignItems: 'center',
        width: contentImageButtonSizeWidth,
        marginBottom: 20
    },
    contentImageButtonImage: {
        borderColor: '#ebedf6',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        overflow: 'hidden',
        width: contentImageButtonSizeWidth,
        height: Math.floor(contentImageButtonSizeWidth / (107 / 108)),
        marginBottom: 11
    },
    contentImageButtonText: {
        color: '#535d7e',
        fontSize: 12,
        textAlign: 'center'
    },

    /* 
        detail
    */
    detailButtonText: {
        color: '#535d7e',
        fontSize: 15,
        marginTop: 30
    }
}); 