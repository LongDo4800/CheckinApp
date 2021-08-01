import React from "react";
import { NavHeader, Header } from "../../Components/Header";
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Linking
} from "react-native";
import { Icon } from "native-base";

//async 
function Aptech({ navigation, route }) {

    let token = route.params.token;
    console.log("token", token)
    const myInjectedJs = "alert(10)";

    return (
        <View style={{ flex: 1 }}>
            <NavHeader />
            <Header
                leftFunction={() => navigation.openDrawer()}
                IconLeft={{ name: "menu", type: "Ionicons" }}
                title={"SUPPORT"}
                NoNavHeader
            />
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ padding: 20 }}>
                        <View style={{ paddingVertical: 10 }}>
                            <Text style={styles.Title}>
                                Address 1
                            </Text>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="address"
                                    type="Entypo"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${'aptech1@aprotrain.com'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>285 Đội Cấn, Q. Ba Đình, Hà Nội</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="mail"
                                    type="AntDesign"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${'aptech1@aprotrain.com'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>aptech1@aprotrain.com</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="phone"
                                    type="AntDesign"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`tel:${'18001141'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>1800 1141</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ paddingVertical: 10 }}>
                            <Text style={styles.Title}>
                                Address 2
                            </Text>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="address"
                                    type="Entypo"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${'aptech1@aprotrain.com'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>212 - 214 Nguyễn Đình Chiểu, Q.3, TP.HCM</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="mail"
                                    type="AntDesign"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${'aptech2@aprotrain.com'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>aptech2@aprotrain.com</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="phone"
                                    type="AntDesign"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`tel:${'1800 1779'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>1800 1779</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ paddingVertical: 10 }}>
                            <Text style={styles.Title}>
                                Address 3
                            </Text>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="address"
                                    type="Entypo"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${'aptech2@aprotrain.com'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>54 - 56 Lê Thanh Nghị, Bách Khoa, Q. Hai Bà Trưng, Hà Nội</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="mail"
                                    type="AntDesign"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${'aptech2@aprotrain.com'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>aptech2@aprotrain.com</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="phone"
                                    type="AntDesign"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`tel:${'1800 1147'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>1800 1147</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ paddingVertical: 10 }}>
                            <Text style={styles.Title}>
                                Follow Aptech
                            </Text>
                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="facebook-square"
                                    type="FontAwesome"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`${'https://www.facebook.com/aptechvietnam.com.vn/'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>https://www.facebook.com/aptechvietnam.com.vn/</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                                <Icon
                                    name="youtube"
                                    type="FontAwesome"
                                    style={{ fontSize: 15, alignSelf: 'center', paddingRight: 10 }}
                                />
                                <TouchableOpacity onPress={() => Linking.openURL(`${'https://www.youtube.com/aprotrainaptech'}`)}>
                                    <Text style={[styles.text], { color: "#1591e7" }}>https://www.youtube.com/aprotrainaptech</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>

                        <View style={{alignItems : 'center' , paddingTop : 10 , paddingHorizontal : 30 , }}>
                        <Text style={styles.Title}>
                                About Aptech
                            </Text>
                            <Text style={[styles.text , {textAlign: 'justify'}]} >
                            With 34 years of experience in the field of Information Technology (IT) training, we are proud to be a leading career training company in the world based in Mumbai, India. Present in more than 40 countries with more than 1,350 facilities, Aptech has trained more than 6.8 million students worldwide and more than 100,000 programmers in Vietnam.

                            </Text>
                        </View>


                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    Title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 17,
    }
});
export default Aptech;
