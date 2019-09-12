import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    Image,
} from 'react-native';
import { Container } from './';
import {
    SHOW_CUSTOM_POPUP,
    SET_VIEWER,
    ICONS,
} from '../helper/Constant';
import { store } from '../../store';
import { ParserHTML } from './';

class CheckBox extends Component {
    constructor(props) {
        super(props);
        const { value = false } = this.props.data;

        this.state = {
            value: value,
            anim: new Animated.Value(value ? 1 : 0),
        }
    }

    /* 
    updated: checkbox redux bağladığımızda yapılan değişikliğin yansıması için kullanırız. Diğer durumlar için çalıştırmamak gerekiyor.
    */
    componentWillReceiveProps(nextProps) {
        const _self = this,
            { value, updated = false } = nextProps.data;
        if (_self.state.value != value && updated) {
            _self.setState({ value: value });
            setTimeout(() => {
                _self.onChange();
            }, 10);
        }
    }

    _onPress = () => {
        const _self = this,
            { closed = false } = _self.props;

        _self.setState((prevState) => ({
            value: !prevState.value
        }), this.onChange);

        setTimeout(() => {
            /* closed değeri true dönünce her bir tıklamada callback çalışsın */
            if (closed)
                _self._callback();
        }, 10);
    }

    onChange = () => {
        Animated.timing(
            this.state.anim, {
            toValue: this.state.value ? 1 : 0,
            duration: 150,
            easing: Easing.out(Easing.cubic),
        }
        ).start();
    }

    _callback = () => {
        const { title, id, validation } = this.props.data;
        const { callback } = this.props;
        if (callback)
            callback({ key: id, title: title, value: this.state.value, validation: validation });
    }

    _onOpenModal = () => {
        const _self = this,
            { modal = {} } = _self.props.data;

        store.dispatch({ type: SHOW_CUSTOM_POPUP, value: { visibility: true, type: SET_VIEWER, data: modal } });
    }

    render() {

        const _self = this,
            { error = false, errorMsg = null, desc = '', modal = '', switchStyle = true } = _self.props.data,
            { control = false, containerStyle = {}, wrapperStyle = {} } = _self.props,
            { value, anim } = _self.state,
            { checkBox } = styles,
            active = value ? { borderColor: '#3BC9A9' } : {};

        let _image = value ? <Image source={ICONS['checkBig']} style={{ width: 20, height: 20, resizeMode: 'contain' }} /> : null;

        if (switchStyle) {
            let _color = value ? '#3BC9A9' : '#ccc';


            const _left = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 12],
            });

            check = (
                <Animated.View style={{ position: 'relative', width: 36, height: 24, borderRadius: 12, backgroundColor: _color, marginRight: 8, }}>
                    <Animated.View style={{ position: 'absolute', width: 20, height: 20, borderRadius: 10, margin: 2, backgroundColor: '#ffffff', left: _left, overflow: 'hidden' }}>
                        {_image}
                    </Animated.View>
                </Animated.View>
            );
        }
        else
            check = (
                <View style={[checkBox, active]}>
                    {_image}
                </View>
            );

        if (control)
            _self._callback();



        let view = null;

        if (modal != '')
            view = (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.8} onPress={this._onPress}>
                        {check}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={this._onOpenModal}>
                        <ParserHTML wrapperStyle={{ flex: 1 }}>{desc}</ParserHTML>
                    </TouchableOpacity>
                </View>
            )
        else
            view = (
                <TouchableOpacity style={{ flexDirection: 'row' }} activeOpacity={0.8} onPress={this._onPress}>
                    {check}
                    <ParserHTML wrapperStyle={{ flex: 1 }}>{desc}</ParserHTML>
                </TouchableOpacity>
            );

        return (
            <Container showErrorIco={false} titleShow={true} error={error} errorMsg={errorMsg} containerStyle={{ ...containerStyle }} wrapperStyle={[{ paddingLeft: 0, borderWidth: 0, height: 'auto' }, { ...wrapperStyle }]}>
                {view}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    checkBox: {
        width: 22,
        height: 22,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#aaaaaa',
        backgroundColor: '#FFFFFF',
        marginRight: 10,
        marginTop: 1,
    }
});

export { CheckBox };
