import React from "react";
import { Button } from "react-native-elements";
import { Colors } from "../../Themes";
export default function ButtonTemp(props){
    return (
        <Button buttonStyle={{alignSelf:'center', paddingHorizontal:15, backgroundColor:Colors.mainColor}} title={props.title} onPress={()=> props.onPress()}/>
    )
}