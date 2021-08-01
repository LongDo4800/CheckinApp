import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StylesShare from '../style/styles';
import SelectModalReactNative from './SelectModal';

export default class SelectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            label: this.props.label,
            data: this.props.data,
            openModal: false,
            disable: this.props.disable
        };
        this.openSelecter = this.openSelecter.bind(this);
    }

    openSelecter() {
        if(this.state.disable){
            this.props.callBackFnWhenDisable();
            return;
        }
        this.openModal();
    }

    componentWillReceiveProps(prop) {
        console.log(prop.data)
        this.setState({
            title: prop.title,
            label: prop.label,
            data: prop.data ? prop.data : this.state.data,
        });
        if(this.state.disable != prop.disable){
            this.setState({
                disable: prop.disable
            })
        }
    }

    openModal() {
        if(this.ModalSelect){
            this.ModalSelect.openModal();
        }
    }

    closeModal() {
        if(this.ModalSelect){
            this.ModalSelect.closeModal();
        }
    }
    

    render() {
        return (
            <>
                <View
                    style={
                        this.props.styleWrap ? this.props.styleWrap : styles.WrapDropDown
                    }>
                    <Text
                        style={{
                            display: this.state.title ? 'flex' : 'none',
                            color: "#bdbdbd",
                            paddingVertical: 10,
                            // fontWeight: 'bold',
                        }}>
                        {this.state.title}
                    </Text>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 5,
                        }}
                        onPress={this.openSelecter}>
                        <Text>{this.state.label}</Text>
                        <Icon name="arrow-drop-down" size={18} />
                    </TouchableOpacity>
                </View>
                <SelectModalReactNative
                    ref ={ref => {this.ModalSelect = ref}}
                    // closeModal={() => this.openModal()}
                    openModal={this.state.openModal}
                    data={this.state.data}
                    getItem={this.props.getSelectData}
                    title={this.props.label}
                    ConfigSelect={this.props.ConfigSelect}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    WrapDropDown: {
        marginHorizontal: 15,
        marginTop: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#bdbdbd',
        paddingBottom: 5,
    },
});
