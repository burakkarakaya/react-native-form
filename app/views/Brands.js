import React, { Component, PureComponent } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";

const Brand = require('../../data/brands.js');

class Brands extends PureComponent {
    /* 
        data => tüm markaların bulunduğı data
        temp => Datanın içerisinde filtrelenen dataları tutar 
        catNameData => gelen datanın içinden oluşturulur. Tekilleştirilmiş kategorileri tutar
        brandNameData => gelen datanın içinden oluşturulur. Tekilleştirilmiş marka isimlerinin baş harflerini tutar
        activeCatID => seçili kategori idsini tutar. Varsayılan -1 yani hepsini gösterir
        activeBrandID => seçili marka isminin boş harfini tutar. Varsayılan -1 yani hepsini gösterir

    */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            temp: [],
            catNameData: [],
            brandNameData: [],
            activeCatID: 21885, // aksesuar kategorisi
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

        arr.unshift({ key: 'Tümü', value: -1 });

        _self.setState({ brandNameData: arr });
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

        _self.setState({ catNameData: arr });
    }

    render() {
        return null;
    }
}

export { Brands };

/* 
    Styles
*/

const styles = StyleSheet.create({

});