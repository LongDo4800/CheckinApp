import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Colors } from "../../Themes";
export default function Loading(){
    return (
        <View style={{ height: "100%", backgroundColor: 'rgba(52, 52, 52, 0.3)', position: 'absolute', top: 0, width: '100%', alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator color={Colors.mainColor} size={28} />
            </View>
        </View>
    )
    
}