import { StyleSheet } from "react-native";
import { Colors, UtillSize } from "../../Themes";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
    Container: {
        flex: 1, 
        backgroundColor: "#03abed"
    },
    button: {
        paddingHorizontal:15,
        paddingVertical:10,
        borderWidth:0.7,
        borderColor: 'red',
        borderRadius: 8,
        alignSelf:'center'
    },
    wrapHeader: {
        justifyContent:'center',
        alignItems:'center'
    },
    textTitleHeader: {
        fontFamily:'Zocial',
        letterSpacing: 3,
        fontWeight: 'bold',
        color:'#fff'
    },
    textDesHeader: {
        color: '#fff',
        letterSpacing: 5
    },
    wrapViewContent: {
       
    },
    viewInput: {
        height: UtillSize.heightInput,
        borderRadius: 10,
        borderWidth:1,
        borderColor: '#fff',
        marginBottom: 15
    },
    ButtonLogin: {
        backgroundColor: '#fff',
        height: UtillSize.heightInput,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    wrapTextForgot: {
        paddingVertical: 10,
        marginBottom: 10,
        alignItems:'flex-end'
    },
    textForGot: {
        color: "#fff",
        fontSize:RFValue(12) 
    },
    textLogin: {
        color: Colors.mainColor,
        fontWeight: 'bold',
        fontSize: RFValue(15)
    }
});
export default styles;