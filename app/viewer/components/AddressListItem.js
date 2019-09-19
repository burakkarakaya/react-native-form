import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    SET_FORM,
    SET_CART_ADDRESS,
    SET_ADDRESS_ITEM_CLICK,
} from '../helper/Constant';
import { connect } from 'react-redux';
import { BoxButton } from '../UI';

const Translation = require('../helper/Translation.js');

class AddressList extends Component {
    /*
        {
            "address": "DAVUTPAŞA DAVUTPAŞA DAVUTPAŞA DAVUTPAŞA DAVUTPAŞA DAVUTPAŞA DAVUTPAŞA DAVUTPAŞA DAVUTPAŞA DAVUTPAŞA DAVUTPAŞA DAVUTPAŞA",
            "addressId": 473044,
            "addressName": "TEST P",
            "cityId": 1,
            "cityName": "İstanbul",
            "companyName": "",
            "corprateFl": false,
            "countryId": 1,
            "countryName": "Türkiye",
            "districtId": 980,
            "districtName": "ESENLER",
            "fullName": "Proj-E Proj-E",
            "mobilePhone": "900(555) 5555555",
            "phone": "",
            "readOnly": false,
            "taxNumber": "",
            "taxOffice": "",
            "tckn": "26072013304",
            "zipCode": "34080",
        }
    */

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        const _self = this;
        _self._isMounted = true;
    }

    componentWillUnmount() {
        const _self = this;
        _self._isMounted = false;
    }

    _onPress = () => {
        const _self = this,
            { callback, data = {} } = _self.props,
            { readOnly = false } = data;

        if (callback)
            callback({
                showPopup: true,
                type: SET_FORM,
                itemType: 'setAddress',
                modalTitle: readOnly ? 'ADRES GÖRÜNTÜLE' : 'ADRES DÜZENLE',
                postData: { addressId: data['addressId'] || '' }
            });
    }

    _onRemove = () => {
        const _self = this,
            { data, onRemove } = _self.props;
        Utils.confirm({ message: Translation['confirm']['removeMessage'] }, ({ type }) => {
            if (type == 'ok') {
                const { addressId } = data;

                Utils.fetch(Utils.getURL({ key: 'address', subKey: 'deleteAddress' }), JSON.stringify({ addressId: addressId }), (res) => {
                    if (_self._isMounted) {
                        const { status, message } = res;
                        if (onRemove && status == 200)
                            setTimeout(() => {
                                onRemove({ key: 'addressId', value: addressId });
                            }, 100);
                    }
                })
            }
        });
    }

    _onCallback = () => {
        const _self = this,
            { callback } = _self.props;

        setTimeout(() => {
            if (callback) {
                callback({
                    type: SET_ADDRESS_ITEM_CLICK,
                    data: {}
                });
            }
        }, 10);
    }

    _onShipAddressPress = () => {
        const _self = this,
            { addressId } = _self.props.data;


        _self.props.dispatch({ type: SET_CART_ADDRESS, value: { addressId: addressId, addressType: 'shipAddress' } });
        _self._onCallback();
    }

    _getShipAddressButton = () => {
        const _self = this,
            { data = {} } = _self.props,
            { addressId } = data,
            { optin = {} } = _self.props.cart || {},
            { shipAddressId, differentAddress } = optin;
        let { selectShipAddress, selectedShipAddress, select, selected } = Translation['address'] || {};

        if (!differentAddress) {
            selectShipAddress = select;
            selectedShipAddress = selected;
        }

        let view = null;
        if (addressId == shipAddressId)
            view = (
                <BoxButton
                    wrapperStyle={{ backgroundColor: 'rgb(255, 43, 148)', borderColor: 'rgb(255, 43, 148)', minWidth: 130, paddingLeft: 0, paddingRight: 0, marginLeft: 10 }}
                    textStyle={{ color: '#FFFFFF' }}
                    callback={_self._onShipAddressPress}>
                    {selectedShipAddress}
                </BoxButton>
            );
        else
            view = (
                <BoxButton
                    wrapperStyle={{ minWidth: 130, paddingLeft: 0, paddingRight: 0, marginLeft: 10 }}
                    callback={_self._onShipAddressPress}>
                    {selectShipAddress}
                </BoxButton>
            );

        return view;
    }

    _onBillAddressPress = () => {
        const _self = this,
            { addressId } = _self.props.data;

        _self.props.dispatch({ type: SET_CART_ADDRESS, value: { addressId: addressId, addressType: 'billAddress' } });
        _self._onCallback();
    }

    _getBillAddressButton = () => {
        const _self = this,
            { data = {} } = _self.props,
            { addressId } = data,
            { optin = {} } = _self.props.cart || {},
            { billAddressId, differentAddress } = optin,
            { selectBillAddress, selectedBillAddress } = Translation['address'] || {};

        let view = null;
        if (differentAddress) {
            if (addressId == billAddressId)
                view = (
                    <BoxButton
                        wrapperStyle={{ backgroundColor: 'rgb(255, 43, 148)', borderColor: 'rgb(255, 43, 148)', minWidth: 130, paddingLeft: 0, paddingRight: 0 }}
                        textStyle={{ color: '#FFFFFF' }}
                        callback={_self._onBillAddressPress}>
                        {selectedBillAddress}
                    </BoxButton>
                );
            else
                view = (
                    <BoxButton
                        wrapperStyle={{ minWidth: 130, paddingLeft: 0, paddingRight: 0 }}
                        callback={_self._onBillAddressPress}>
                        {selectBillAddress}
                    </BoxButton>
                );
        }

        return view;
    }

    _getItemType = () => {
        const _self = this,
            { readOnly = false } = _self.props.data,
            { itemButtonType = 'default' } = _self.props.config,
            { remove, edit, viewer } = Translation['address'] || {},
            buttonText = readOnly ? viewer : edit;

        /* adres düzenleme ve sepet adımlarındaki seçimlerde ayrım yapmak için kullanırız. */
        let view = null;
        if (itemButtonType == 'default')
            view = (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 21 }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={_self._onRemove}>
                        <Text style={{ fontFamily: 'RegularTyp2', fontSize: 15 }}>{remove}</Text>
                    </TouchableOpacity>
                    <BoxButton callback={_self._onPress}>{buttonText}</BoxButton>
                </View>
            );
        else if (itemButtonType == 'cart')
            view = (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 21 }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={_self._onPress}>
                        <Text style={{ fontFamily: 'RegularTyp2', fontSize: 15 }}>{buttonText}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        {_self._getBillAddressButton()}
                        {_self._getShipAddressButton()}
                    </View>

                </View>
            );

        return view;
    }

    render() {
        const _self = this,
            { fullName, address } = _self.props.data,
            itemButtonType = _self._getItemType();

        return (
            <View style={{ flexDirection: 'column', marginLeft: 10, marginRight: 10, marginBottom: 10, paddingTop: 16, paddingBottom: 12, paddingRight: 10, paddingLeft: 10, borderBottomColor: '#dcdcdc', borderBottomWidth: 1, }}>
                <View>
                    <Text style={{ fontFamily: 'Medium', fontSize: 15 }}>{fullName}</Text>
                    <Text style={{ fontFamily: 'RegularTyp2', fontSize: 13, color: '#555555' }}>{address}</Text>
                </View>
                {itemButtonType}
            </View>
        )
    }
}


function mapStateToProps(state) { return state }
const AddressListItem = connect(mapStateToProps)(AddressList);
export { AddressListItem };