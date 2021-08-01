import React, { Component } from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { MethodService } from "../../Services";
import { UtillSize, Colors } from "../../Themes";
import { Icon } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from 'react-native-modal';
import {LoaderForBox} from "../Loader";

export default class SelectModal extends Component {
    ConfigSelect = this.props.ConfigSelect ? this.props.ConfigSelect : { id: 'id', label: 'label' };
    constructor(props) {
        super(props);
        this.state = {
            selectId: this.props.selectId ? this.props.selectId : '',
            data: this.props.data ? this.props.data : [],
            showSearch: false,
            valueSearch: '',
            openModal: false,
        }
    }

    selectItem(item) {
        this.closeModal();
        this.props.getItem(item);
        this.setState({
            valueSearch: '',
            selectId: item[this.ConfigSelect.id],
            openModal: false
        });

    }

    closeModal() {
        this.setState({
            openModal: false
        })
    }

    openModal() {
        this.setState({
            openModal: true
        })
    }

    componentWillReceiveProps(prop) {
        if (this.state.selectId != prop.selectId) {
            this.setState({
                selectId: prop.selectId
            })
        }
        if (this.state.data != prop.data) {
            this.setState({
                data: prop.data
            })
        }
        
    }

    render() {
        return (
            <Modal isVisible={this.state.openModal} style={styles.modal4} onBackdropPress={() => this.setState({openModal: false})}>
                <View style={{height: UtillSize.screenHeight/2, backgroundColor:'#fff'}}>
                    <View style={{ display: this.state.showSearch == false ? 'flex' : 'none' }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingVertical: 10, alignSelf: 'center', color: Colors.mainColor }}>{this.props.title}</Text>
                        <TouchableOpacity onPress={() => this.setState({ showSearch: true })} style={{ position: 'absolute', right: 8, top: 7 }}>
                            <Icon name='search' style={{ color: Colors.mainColor }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ display: this.state.showSearch == false ? 'none' : 'flex' }}>
                        <TextInput placeholder="Nhập nội dung" style={{ height: 40, marginLeft: 15 }} onChangeText={(val) => this.setState({ valueSearch: val })} />
                        <TouchableOpacity onPress={() => this.setState({ showSearch: false })} style={{ position: 'absolute', right: 8, top: 7 }}>
                            <FontAwesome size={23} name='remove' style={{ color: Colors.mainColor }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', borderTopWidth: 1, borderTopColor: Colors.mainColor, flex:1 }}>
                        {this.state.data.length > 0?<ScrollView style={{ marginBottom: 50 }}>
                            {this.state.data.map((item, index) => {
                                let label = item[this.ConfigSelect.label].toLowerCase();
                                label = MethodService.xoa_dau(label);
                                let valueSearch = this.state.valueSearch.toLowerCase();
                                valueSearch = MethodService.xoa_dau(valueSearch)
                                if (label.indexOf(valueSearch) != -1) {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => this.selectItem(item)}>
                                            <View style={{ padding: 15, backgroundColor: this.state.selectId == item[this.ConfigSelect.id] ? '#bdbdbd' : '#fff' }}>
                                                <Text>{item[this.ConfigSelect.label]}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }

                            })}
                        </ScrollView>
                        :
                        <LoaderForBox/>
                        }
                        
                    </View>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    modal4: {
        height: 300,
        justifyContent: 'flex-end',
        margin: 0,
        // backgroundColor: '#fff'
    },
});
