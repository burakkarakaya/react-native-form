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
        categoryData => gelen datanın içinden oluşturulur. Kategorileri tutar
    */
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            temp: [],
            catNameData: [],
            brandNameData: []
        };
    }

    componentDidMount() {
        const _self = this;
        _self.setState({ data: Brand }, () => {
            _self._setData();
        });
    }

    /* 
        kategori ve marka isimlerini tekilleştirmek için kullanacağız
    */
    _setData = () => {
        const _self = this,
            { data = [] } = _self.state,
            obj = {
                catName: {

                },
                title: {

                }
            },
            brandNameData = [],
            catNameData = [];

        Object
            .entries(data)
            .forEach(([ind, value]) => {
                let { catName, catID, title } = value,
                    k = obj['catName'][catName] || '';

                /* 
                    kategori isimlerini tekilleştirme
                */
                if (k == '') {
                    obj['catName'][catName] = catID;
                    catNameData.push({ key: catName, value: catID });
                }

                /* marka isimlerini tekilleştirme  */
                title = title.substr(0, 1)
                k = obj['title'][title] || '';
                if (k == '') {
                    obj['title'][title] = title;
                    brandNameData.push({ key: title, value: title });
                }

            });

        catNameData.unshift({ key: 'Tümü', value: -1 });
        brandNameData.unshift({ key: 'Tümü', value: -1 });

        console.log(catNameData, brandNameData);

        _self.setState({ catNameData: catNameData, brandNameData: brandNameData });
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