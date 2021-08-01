import { StyleSheet } from "react-native";
import { Colors, UtillSize } from "../../Themes";
import { Dimensions } from "react-native";
const widthItem = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },

    wrapItem: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    avatar: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 50,
        marginRight: 20
    },
    wrapInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: widthItem - 100,
        paddingVertical: 5
    },
    name: {
        fontWeight: '500',
        fontSize: UtillSize.memSizeText,
        marginBottom: 5
    },
    desInfor: {
        color: '#aeafb7',
        fontSize: UtillSize.smallFontSize
    },
    wrapInforUser: {
        flexDirection: 'row',
        paddingVertical: 7,
        // alignItems: 'center'
    },
    labelInfor: {
        width: '40%',
        fontSize: UtillSize.titleFontSize
    },
    textInfor: {
        width: '80%',
        fontSize: 15,
        paddingTop : 4
    },
    styleAvatarProfile: {
        // width : 400,
        height: 300,
        resizeMode: "stretch",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    viewModal: {
        borderRadius: 10, width: 300, height: 510, alignSelf: 'center'
    },

    btnClose: {
        position: 'absolute',
        top: 50,
        right: 0,
        zIndex: 99,
    },
    iconClose: {
        fontSize: 30,
        color: '#1591e7'

    }

});
export default styles;