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
import {
    SelectBox,
} from "../form/components/";

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

        console.log(arr);

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

    _getBrandName = () => {
        let _self = this,
            { brandNameData = [] } = _self.state,
            view = null,
            onPress = (k) => {
                _self.setState({ activeBrandID: k }, () => {
                    _self._setFilterData();
                });
            };

        if (Utils.detect(brandNameData)) {
            const btn = [];
            Object
                .entries(brandNameData)
                .forEach(([ind, item]) => {
                    const { key, value } = item;
                    btn.push(
                        <TouchableOpacity onPress={onPress.bind(this, value)} activeOpacity={.8}>
                            <Text>{key}</Text>
                        </TouchableOpacity>
                    );
                });

            view = (
                <View style={{ flex: 1 }}>
                    {btn}
                </View>
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
            const btn = [];
            Object
                .entries(temp)
                .forEach(([ind, value]) => {
                    let { id, img, title } = value;

                    btn.push(
                        <TouchableOpacity activeOpacity={.8}>
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={{ uri: Utils.getImage(img) }}
                            />
                            <Text>{title}</Text>
                        </TouchableOpacity>
                    );
                });

            view = (
                <View style={{ flex: 1 }}>
                    {btn}
                </View>
            );
        }

        return view;
    }

    render() {
        const _self = this,
            category = _self._getCategory(),
            brandName = _self._getBrandName(),
            brand = _self._getBrand();

        return (
            <ScrollView
                keyboardShouldPersistTaps='handled'
                style={{ flex: 1 }}
                contentContainerStyle={{ padding: 20 }}
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

});