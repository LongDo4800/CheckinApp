import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Icon } from 'native-base';
import styles from "./HeaderStyle";
import NavHeader from "./NavHeader";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      isSearch: false,
      searchString: '',
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isSearch !== state.isSearch) {
      return {
        isSearch: props.isSearch,
      };
    }
    if (props.title !== state.title) {

      return {
        title: props.title,
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  fn_search = (e) => {
    console.log(this.state.searchString, e, this.secondTextInput, 'strinng');
    this.setState({
      searchString: e
    }, () => {
      this.props.search(e)
    })
  }

  render() {
    return (
      <View>
        {this.props.NoNavHeader ? null : <NavHeader />}
        <View style={[styles.viewHeader, this.props.backgroundColor]}>
          {this.props.IconLeft ? (
            <TouchableOpacity
              style={styles.IconLeft}
              onPress={() => this.props.leftFunction()}>
              <Icon
                name={this.props.IconLeft.name}
                type={this.props.IconLeft.type}
                style={[
                  { color: '#fff', fontSize: this.props.IconLeft.size ?? RFValue(20) },
                ]}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.IconLeft} />
          )}
          {
            !this.state.isSearch ? <View style={styles.ContentHeader}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: RFValue(16),
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                {this.state.title}
              </Text>
            </View>
              :
              <View style={styles.wrapSearch}>
                <TextInput value={this.state.searchString}
                  ref={(input) => { this.secondTextInput = input; }}
                  onChange={(e) => this.fn_search(e.nativeEvent.text)}
                  style={styles.searchInput}
                  placeholder="  Search by name"
                  placeholderTextColor={'#fff'}
                  onTouchStart={() => console.log('on start')}
                  onBlur={() => {
                    // this.props.onChangeSearch(false);
                  }} />
              </View>
          }
          <View>
            {this.props.IconRight1 ? (
              <TouchableOpacity
                style={styles.IconLeft}
                onPress={() => {
                  this.props.rightFunction1();
                  if (this.state.searchString) {
                    this.setState({
                      searchString: ''
                    })
                  }
                  setTimeout(() => {
                    if (this.state.isSearch) this.secondTextInput.focus();
                  }, 100);
                }}>
                <Icon
                  name={this.props.IconRight1.name}
                  type={this.props.IconRight1.type}
                  style={{ color: '#fff', fontSize: this.props.IconRight1.size ?? 25 }}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.IconLeft} />
            )}
            {this.props.IconRight2 ? (
              <TouchableOpacity
                style={styles.IconLeft}
                onPress={() => this.props.rightFunction2()}>
                <Icon
                  name={this.props.IconRight2.name}
                  type={this.props.IconRight2.type}
                  style={{ color: '#fff', fontSize: this.props.IconRight2.size ?? 25 }}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.IconLeft} />
            )}
          </View>
        </View>
      </View>
    );
  }
}


