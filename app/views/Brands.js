import React, { Component, PureComponent } from "react";
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList,
} from "react-native";
import {
    SelectBox,
} from "../form/components/";

const ScreenWidth = Math.round(Dimensions.get('window').width),
    padding = 90, // border + margin
    brandButtonSizeWidth = Math.round((ScreenWidth - padding) * .5);

const Brand = require('../../data/brands.js');

class Brands extends PureComponent {
    /* 
        data => tüm markaların bulunduğı data
        temp => Datanın içerisinde filtrelenen dataları tutar 
        categoryData => gelen datanın içinden oluşturulur. Tekilleştirilmiş kategorileri tutar
        brandNameData => gelen datanın içinden oluşturulur. Tekilleştirilmiş marka isimlerinin baş harflerini tutar
        activeCatID => seçili kategori idsini tutar. Varsayılan -1 yani hepsini gösterir
        activeBrandID => seçili marka isminin boş harfini tutar. Varsayılan -1 yani hepsini gösterir

    */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            temp: [],
            categoryData: [],
            brandNameData: [],
            activeCatID: -1,
            activeBrandID: -1
        };
    }

    componentDidMount() {
        const _self = this;
        _self.setState({ data: Brand }, () => {
            _self._setCategoryData();
            _self._setBrandData();
            _self._setFilterData();
        });
    }

    /* 
        marka ve kategori filtresine göre kalan datayı süzer
    */
    _setFilterData = () => {
        const _self = this,
            { data = [], activeCatID = -1, activeBrandID = -1 } = _self.state,
            arr = [];

        Object
            .entries(data)
            .forEach(([ind, value]) => {
                const { catID, title } = value;
                if ((activeCatID == -1 || catID == activeCatID) && (activeBrandID == -1 || title.substr(0, 1) == activeBrandID))
                    arr.push(value);
            });

        _self.setState({ temp: arr });
    }

    /* 
        marka isimlerinin ilk harflerini tekilleştirmek için kullanacağız burada önemli olan eğer herhangi bir kategori seçiliyse markalarında süzülmesi

        ex: ['Loreal', 'Nivea', 'Nivea', 'Loreal']
        result: ['L', 'N']  
    */
    _setBrandData = () => {
        const _self = this,
            { data = [], activeCatID = -1 } = _self.state,
            obj = {},
            arr = [];

        Object
            .entries(data)
            .forEach(([ind, value]) => {
                let { catID, title } = value;
                if (activeCatID == -1 || catID == activeCatID) {
                    title = title.substr(0, 1);
                    const k = obj[title] || '';
                    if (k == '') {
                        obj[title] = title;
                        arr.push({ key: title, value: title });
                    }
                }
            });

        arr.unshift({ key: '#', value: -1 });

        _self.setState({ brandNameData: arr });
    }

    _getBrandShortName = () => {
        let _self = this,
            { brandNameData = [], activeBrandID = -1 } = _self.state,
            view = null,
            onPress = (k) => {
                _self.setState({ activeBrandID: k }, () => {
                    _self._setFilterData();
                });
            };

        if (Utils.detect(brandNameData)) {
            const btn = [],
                lngth = brandNameData.length - 1;

            Object
                .entries(brandNameData)
                .forEach(([ind, item]) => {
                    const { key, value } = item,
                        activeButtonWrapper = activeBrandID == value ? styles.brandShortNameActivebuttonWarpper : {},
                        activeButtonText = activeBrandID == value ? styles.brandShortNameActivebuttonText : {},
                        marginRight = ind == lngth ? { marginRight: 0 } : {};

                    btn.push(
                        <TouchableOpacity style={[styles.brandShortNamebuttonWarpper, activeButtonWrapper, marginRight]} onPress={onPress.bind(this, value)} activeOpacity={.8}>
                            <Text style={[styles.brandShortNamebuttonText, activeButtonText]}>{key}</Text>
                        </TouchableOpacity>
                    );
                });

            view = (
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ flex: 1, marginBottom: 30 }}
                    contentContainerStyle={{ paddingHorizontal: 40 }}
                >
                    {btn}
                </ScrollView>
            );
        }

        return view;
    }

    /* 
        Gelen datadan kategori isimlerini tekileştiririz. 1 defa çalışmalıdır
        ex: ['Makyaj', 'Makyaj','Makyaj','Makyaj','Cilt Bakım','Makyaj']
        result: ['Cilt Bakım','Makyaj']
    */
    _setCategoryData = () => {
        const _self = this,
            { data = [] } = _self.state,
            obj = {},
            arr = [];

        Object
            .entries(data)
            .forEach(([ind, value]) => {
                let { catName, catID } = value,
                    k = obj[catName] || '';

                if (k == '') {
                    obj[catName] = catID;
                    arr.push({ key: catName, value: catID });
                }

            });

        arr.unshift({ key: 'Tümü', value: -1 });

        _self.setState({ categoryData: arr });
    }

    _onChangeCategory = ({ value = -1 }) => {
        const _self = this;
        _self.setState({ activeCatID: value, activeBrandID: -1 }, () => {
            _self._setBrandData();
            _self._setFilterData();
        });
    }

    _getCategory = () => {
        let _self = this,
            { categoryData = [] } = _self.state,
            view = null;

        if (Utils.detect(categoryData))
            view = (
                <SelectBox
                    containerStyle={{ paddingHorizontal: 40, }}
                    showHeader={false}
                    closed={true}
                    callback={_self._onChangeCategory}
                    data={{ values: categoryData, value: -1 }}
                />
            );

        return view;
    }

    /* 
        filtrelenen markalar
    */

    _getBrand = () => {
        let _self = this,
            { temp = [] } = _self.state,
            view = null;

        if (Utils.detect(temp)) {
            view = (
                <FlatList
                    style={{ flex: 1, flexDirection: "column", paddingHorizontal: 40 }}
                    numColumns={2}
                    data={temp}
                    renderItem={({ item }) => {
                        const { id, img, title } = item;
                        return (
                            <TouchableOpacity style={styles.brandButtonWrapper} activeOpacity={.8}>
                                <Image
                                    style={styles.brandButtonImage}
                                    source={{ uri: Utils.getImage(img) }}
                                />
                                <Text>{title}</Text>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={item => item.id}
                />
            );
        }

        return view;
    }

    render() {
        const _self = this,
            category = _self._getCategory(),
            brandName = _self._getBrandShortName(),
            brand = _self._getBrand();

        return (
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 20 }}
            >
                {category}
                {brandName}
                {brand}
            </ScrollView>
        );

    }
}

export { Brands };

/* 
    Styles
*/

const styles = StyleSheet.create({
    brandShortNamebuttonWarpper: {
        borderRadius: 18,
        width: 36,
        height: 36,
        backgroundColor: '#FFFFFF',
        borderColor: '#ebedf6',
        borderWidth: 1,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    brandShortNamebuttonText: {
        color: '#535d7e',
        fontSize: 14
    },
    brandShortNameActivebuttonWarpper: {
        backgroundColor: '#fc2f6b',
        borderColor: '#fc2f6b',
    },
    brandShortNameActivebuttonText: {
        color: '#FFFFFF'
    },

    brandButtonWrapper: {
        width: brandButtonSizeWidth,
        height: Math.floor(brandButtonSizeWidth / (142 / 86)),
        borderColor: '#ebedf6',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        overflow: 'hidden',
        marginBottom: 11,
        marginRight: 11
    },
    brandButtonImage: {
        width: brandButtonSizeWidth,
        height: Math.floor(brandButtonSizeWidth / (142 / 86)),
        resizeMode: 'contain'
    }
});