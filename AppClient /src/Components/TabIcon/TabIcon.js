import React, {Component} from 'react';
import {  View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import { Colors } from "../../Themes";
export default class TabIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
        content:this.props.content
    }
  }
  render() {
      const content = this.state.content;
      const color = content.isActive?Colors.mainColor:'#bdbdbd'
    return (
      <View style={styles.tabItem}>
        <View
          style={{
            height: 35,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={content.nameIcon}
            type={content.typeIcon}
            style={{color: color, fontSize: 30}}
          />
          <View style={{position: 'absolute', right: -10, top: -3}}>
            <Text style={{fontSize: 12, color: color}}>{content.number}</Text>
          </View>
        </View>
        <Text style={{color: color}}>{content.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      shadowColor: Colors.mainColor,
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.2,
      elevation: 5,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      borderColor: '#bdbdbd',
      paddingVertical: 6,
    },
  });