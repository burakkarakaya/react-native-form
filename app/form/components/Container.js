import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Animated,
    Easing,
    Image
} from 'react-native';
import { 
    FORMSTYLE, 
    ICONS 
} from '../helper/Constant';

class Container extends Component {
    constructor(props) {
        super(props);

        const _self = this;
        _self.state = {
            anim: new Animated.Value(1)
        };
    }

    componentDidMount() {
        const _self = this,
            { titleShow = true } = _self.props;
        this._animate(titleShow);
    }

    componentWillReceiveProps(nextProps) {
        const _self = this;
        if (nextProps.titleShow != _self.props.titleShow)
            _self._animate(nextProps.titleShow)
    }

    _animate = (status, callback) => {
        const _self = this,
            { titleShow } = _self.props;

        Animated.timing(
            _self.state.anim,
            {
                toValue: status ? 1 : 0,
                duration: 222,
                easing: Easing.inOut(Easing.quad)
            }
        ).start(() => {
            if (typeof callback !== 'undefined')
                callback();
        });
    }

    render() {
        const _self = this,
            { theme = 'DARK', containerStyle = {}, wrapperStyle = {}, errorMsgStyle = {}, showHeader = true, showErrorIco = true } = _self.props,
            { container, wrapper, titleSty, errorMsgSty } = styles,
            { BORDER_WIDTH = 1, BORDER_COLOR = '#dddddd', TITLE_COLOR = '#9b9b9b', ERROR_COLOR = '#d3838d', BACKGROUND_COLOR = '#FFFFFF' } = FORMSTYLE[theme],
            children = _self.props.children,
            op = _self.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
            }),
            translateY = _self.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0]
            });

        let { title = null, error = false, errorMsg = null } = _self.props,
            errorIco = null,
            color = BORDER_COLOR;

        if (error) {
            errorMsg = <Text numberOfLines={1} style={[errorMsgSty, { color: ERROR_COLOR }, errorMsgStyle]}>{errorMsg}</Text>
            color = ERROR_COLOR;

            if (showErrorIco)
                errorIco = (
                    <Image
                        source={(ICONS['error'])}
                        style={{
                            position: 'absolute',
                            right: 10,
                            width: 30,
                            height: 30,
                            resizeMode: 'contain',
                            backgroundColor: '#FFFFFF'
                        }}
                    />
                );
        }

        if (title)
            title = <Animated.Text style={[titleSty, { transform: [{ translateY: translateY }], opacity: op, color: TITLE_COLOR }]}>{title}</Animated.Text>

        let header = null;
        if (showHeader)
            header = (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <View>
                        {title}
                    </View>
                    <View>
                        {errorMsg}
                    </View>
                </View>
            );

        return (
            <View style={[container, containerStyle]}>
                {header}
                <View style={[wrapper, { borderWidth: BORDER_WIDTH, borderColor: color, backgroundColor: BACKGROUND_COLOR, }, wrapperStyle]}>
                    {children}
                    {errorIco}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 13,
        position: 'relative',
        overflow: 'hidden'
    },
    wrapper: {
        height: 50,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 3,
    },
    titleSty: {
        fontSize: 13,
    },
    errorMsgSty: {
        fontSize: 13,
    },
});

export { Container };