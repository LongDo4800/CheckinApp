import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import { Colors } from "../../Themes";
export default function LoaderForBox() {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator
        style={{alignItems: 'center'}}
        color={Colors.mainColor}
      />
    </View>
  );
}
