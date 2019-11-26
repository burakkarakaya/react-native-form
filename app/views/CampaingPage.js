import React, { Component, PureComponent } from "react";
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList
} from "react-native";
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

const AllCampaing = require('../../data/allCampaing.js');

/* 
    global variable
*/
const ScreenWidth = Math.round(Dimensions.get('window').width),
    padding = 40, // border + margin
    contentImageButtonSizeWidth = Math.round(ScreenWidth - padding);

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
            { title = '', img = '' } = _self.props.data || {};

        return (
            <TouchableOpacity onPress={_self.onPress} activeOpacity={.8} style={styles.contentImageButtonContainer}>
                <Image
                    style={[styles.contentImageButtonImage]}
                    source={{ uri: Utils.getImage(img) }}
                />
                <Text style={styles.contentImageButtonText}>{title}</Text>
            </TouchableOpacity>

        );
    }
}

class Content extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        const _self = this,
            { data = {} } = _self.props;
        _self.setState({ data: AllCampaing['allCampaign'][0][data['catId']]['children'] || [] });
    }

    _getView = () => {

        let _self = this,
            { data = [] } = _self.state || {},
            view = null,
            onPress = (obj) => {
                // getDataByUrl tetiklenecek
            };

        if (Utils.detect(data)) {
            view = (
                <FlatList
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <ContentButton data={item} />
                        );
                    }}
                    keyExtractor={item => item.title}
                />
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

    /* 
        navigationState => 2 kere tetiklenme olayını engellmek için ekstra değişken oluşturulur. Tıklama yapılırsa false değeri atanır.
    */

    constructor(props) {
        super(props);
        this.Ref = null;
        this.navigationState = true;
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

    _callback = (obj) => {
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
                    screen: props => <Content data={item} {...props} />,
                    navigationOptions: {
                        title: catName,
                    }
                };
            });

        return _routes;
    }

    _Navigator = createMaterialTopTabNavigator(
        this._get(),
        {
            tabBarComponent: () => { return null; },
            lazy: true,
            tabBarPosition: 'top'
        }
    );

    /* 
        public func.
    */
    _focused = ({ routesName }) => {
        const _self = this;
        if (_self.Ref)
            _self.Ref._navigation.navigate({ routeName: routesName });


        _self.navigationState = false;
    }

    render() {
        const _self = this,
            Navigator = createAppContainer(_self._Navigator);

        return (
            <Navigator
                onNavigationStateChange={(prevState, currentState = {}) => {
                    /* 
                        dinamik oluşturulan routes içerisinde aktif routes döndürür,
                        bununlada sidebar nesnesinde aktif item seçili hale getirilir
                    */

                    if (_self.navigationState)
                        _self._callback({ value: currentState.index || 0, type: 'currentRouteIndex' });

                    _self.navigationState = true;
                }}
                ref={ref => _self.Ref = ref}
            />
        );
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
        //console.log(e.nativeEvent.layout)
    }

    render() {
        const _self = this,
            { catName = '', active = false } = _self.props.data || {},
            ico = _self._getIcon(),
            activeButtonWrapper = active ? styles.sideBarButtonActiveWrapper : {},
            activeButtonText = active ? styles.sideBarButtonActiveText : {},
            triangle = active ? <View style={styles.triangle} /> : null;

        return (
            <TouchableOpacity
                onLayout={e => this._measureDimensions(e)}
                activeOpacity={.8}
                style={[styles.sideBarButtonWrapper, activeButtonWrapper]}
                onPress={_self._onPress}>
                {triangle}
                {ico}
                <Text style={[styles.sideBarButtonText, activeButtonText]}>{catName}</Text>
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

    _scrollTo = (sequence) => {
        const _self = this,
            h = 85, //  buton yüksekliği eşit olduğu için fix yazılır
            y = Math.round((sequence - 1) * h);

        _self.ScrollView.scrollTo({ x: y });
    }

    _focused = (obj) => {
        const _self = this,
            { callback } = _self.props,
            { data, temp = 0 } = _self.state,
            { sequence = 0 } = obj; console.log('_onPress', sequence);

        data[temp]['active'] = false;
        data[sequence]['active'] = true;

        _self.setState({ data: data, temp: sequence }, () => {
            _self._scrollTo(sequence);
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
                            onPress={_self._focused}
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
                    contentContainerStyle={{ paddingHorizontal: 20 }}
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
        }, 10);
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
            view = (
                <SideBar
                    onRef={(ref) => _self.SideBar = ref}
                    callback={callback}
                    data={data}
                />
            );

        return view;
    }

    /* 
        Routes
    */

    _routesCallback = (obj) => {
        const _self = this,
            type = obj['type'] || '';


        switch (type) {
            case 'currentRouteIndex':
                _self.SideBar._focused({ sequence: obj['value'] || 0 });
                break;

            default:
                break;
        }
    }

    _getRoutes = () => {
        let _self = this,
            { data = [] } = _self.state || {},
            view = null;

        if (Utils.detect(data))
            view = (
                <Routes
                    onRef={ref => _self.Navigator = ref}
                    callback={_self._routesCallback}
                    data={data}
                />
            );

        return view;
    }

    render() {
        const _self = this,
            sideBar = _self._getSideBar(),
            routes = _self._getRoutes();

        return (
            <View style={styles.wrapper}>
                <View style={styles.sideBarWrapper}>
                    {sideBar}
                </View>
                <View style={styles.contentWrapper}>
                    {routes}
                </View>
            </View>
        );
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
        //flexDirection: 'row'
    },

    /* 
        sidebar
    */
    sideBarWrapper: {
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        borderRightColor: '#ebedf6',
        zIndex: 2
    },
    sideBarScrollerWrapper: {
        //flex: 1,
        overflow: 'visible'
    },
    sideBarButtonWrapper: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#ebedf6',
        borderBottomStyle: 'solid',
    },
    sideBarButtonIcon: {
        width: 42,
        height: 42
    },
    sideBarButtonText: {
        fontSize: 12,
        color: '#535d7e',
        marginTop: 6,
    },
    sideBarButtonActiveWrapper: {

    },
    sideBarButtonActiveText: {
        //fontWeight: 'bold'
    },
    triangle: {
        position: 'absolute',
        bottom: -12,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 11,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#ebedf6',
        transform: [
            { rotate: '180deg' }
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