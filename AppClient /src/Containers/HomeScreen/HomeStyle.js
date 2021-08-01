import { StyleSheet } from "react-native";
import { Colors, UtillSize } from "../../Themes";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    wrapContent: {
        margin: 20,
    },
    wrapTapChecked: {
        padding: 15,
        borderColor: Colors.mainColor,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        //  alignItems: 'center',
        borderBottomRightRadius: 20,

    },

    wrapTapCheckin: {
        padding: 15,
        borderColor: Colors.mainColor,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 20,

    },
    textTap: {
        color: Colors.mainColor,
        fontSize: RFPercentage(2),
        fontWeight: 'bold'
    },
    iconTap: {
        color: Colors.mainColor,
        marginTop: 5,
    },
    wrapListCheck: {
        marginTop: 10,
        margin: 20
    },
    wrapItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //   backgroundColor: '#fbd140', 
        padding: 10,
        alignItems: 'center',
        
    },
    wrapItemLeft: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    TitleItemTextLarge: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20
    },
    TitleItemTextSmall: {
        color: '#fff',
        fontSize: 13,
        marginTop: 7,
        marginLeft: 5
    },
    textItem: {
        color: '#fff'
    }
});
export default styles;