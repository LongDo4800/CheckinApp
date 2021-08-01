import React, { useState, useEffect } from "react";
import { NavHeader, Header } from "../../Components/Header";
import styles from "./ContactStyle";
import Modal from "react-native-modal";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  UIManager,
  RefreshControl
} from "react-native";
import { Colors } from "../../Themes";
import mushroom from "../../Api/siten-assistant.api";
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from "native-base";
import { MethodService } from "../../Services";
import NetInfo from '@react-native-community/netinfo';
import { HideMessage, ShowMessage } from "../../Components/Message";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

let isConnected,
  listContactsGoc;


function ContactScreen({ navigation }) {
  const [userSelect, setUserSelect] = useState({});
  const [listContacts, setListContact] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [numOfMember, setNumOfMember] = useState('');
  const [isSearch, setSearch] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [Icons, setIcon] = useState({ name: 'search1', type: 'AntDesign' });

  // const checkNetwork = 

  const getListContact = async () => {
    console.log(isConnected, 'isConnected');
    if (!isConnected) {
      let dataMembers = await AsyncStorage.getItem('dataMembers');
      if (dataMembers) {
        console.log('case 2');
        listContactsGoc = JSON.parse(dataMembers);
        setListContact(JSON.parse(dataMembers));
      } else {
        ShowMessage('Whoops! No internet connection found. Check your connection and try again!', 'danger', 3000);
        return;
      }
    } else {
      let res = await mushroom.timer.listAsync({
        filters: ['companyId=59ba313d71c39b2990b48eee', 'isWorking=true'],
        fields: "userId,name,position,email,birthday,phone,address,avatar",
        limit: 100
      });
      listContactsGoc = res.result;
      console.log(res.result, 'result data  members');
      console.log(JSON.stringify(res.result), 'data  contact  stringtify');
      let data = JSON.stringify(res.result);
      await AsyncStorage.setItem('dataMembers', data);
      setListContact(JSON.parse(data));
    }

    setLoading(false);
    setNumOfMember(listContactsGoc.length);
  }

  const fn_search = (text) => {
    setTimeout(() => {
      if (!listContactsGoc) return;
      if ((text && !text.trim()) || !text) {
        setListContact(listContactsGoc);
      } else {
        const resultSearch = listContactsGoc.filter(e => (MethodService.xoa_dau(e.name).indexOf(MethodService.xoa_dau(text).trim()) != -1 || e.name.toUpperCase().indexOf(MethodService.xoa_dau(text).trim()) != -1));
        setListContact(resultSearch);
      }
    }, 50);

  }
  useEffect(() => {
    NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      isConnected = state.isConnected;
    });
    console.log(isConnected, 'this.isConnected');
    getListContact();
  }, []);

  const fn_selectUser = (data) => {
    setUserSelect(data);
    setModalVisible(true);
  }

  const onChangeSearch = (val) => {
    setSearch(val);
  }

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  }

  const imgaeDefaul = 'https://i1-ione.vnecdn.net/2019/07/03/0-1-4015-1562137097.jpg?w=460&h=0&q=100&dpr=1&fit=crop&s=9pXGZ50Lc922QdJ9608fwg';
  return (
    <View style={{ flex: 1 }}>
      <NavHeader />
      <Header
        leftFunction={() => navigation.openDrawer()}
        IconLeft={{ name: "menu", type: "Ionicons" }}
        IconRight1={{ name: Icons.name, type: Icons.type }}
        rightFunction1={() => {
          console.log(numOfMember, 'numOfMember');
          if (!isSearch) {
            setSearch(true);
            setIcon({ name: 'remove', type: 'FontAwesome' });
          } else {
            setSearch(false);
            setIcon({ name: 'search', type: 'Feather' });
            setListContact(listContactsGoc);
          }

        }}
        onChangeSearch={(val) => onChangeSearch(val)}
        isSearch={isSearch}
        title={numOfMember + ' Siteners'}
        search={(e) => fn_search(e)}
        NoNavHeader
      />
      {
        loading
          ? <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size='small' color='blue'>
            </ActivityIndicator>
          </View>
          : <View style={styles.Container}>

            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  colors={["blue"]}
                  onRefresh={() => {
                    setLoading(true);
                    getListContact();
                  }}
                  refreshing={loading}
                />
              }
            >
              {listContacts.map((item, index) => {
                return (
                  <TouchableOpacity style={styles.wrapItem} key={index} onPress={() => fn_selectUser(item)}>
                    <Image style={styles.avatar}
                      source={{
                        uri: item.avatar ? mushroom.$file.linkBuilder.thumb.id(item.avatar).square(512).build() : imgaeDefaul
                      }} />
                    <View style={styles.wrapInfo}>
                      <View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.desInfor}>{item.position.trim()}</Text>
                      </View>
                      <Text style={styles.desInfor}>{item.birthday ? moment(item.birthday).format('MMM DD YYYY') : ''}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
      }
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={[styles.viewModal, { backgroundColor: '#fff' }]}>
          <Image style={styles.styleAvatarProfile}
            source={{
              uri: userSelect.avatar ? mushroom.$file.linkBuilder.thumb.id(userSelect.avatar).square(512).build() : imgaeDefaul
            }} />
          <ScrollView>

            <View style={{ padding: 10 }}>
              <View >
                <View style={styles.wrapInforUser}>
                  <Icon
                    name="user"
                    type="AntDesign"
                    style={{ fontSize: 25, alignSelf: 'center', paddingEnd: 20 }}
                  />
                  <Text style={styles.textInfor}>{userSelect.name}</Text>
                </View>
                <View style={styles.wrapInforUser}>
                  <Icon
                    name="address"
                    type="Entypo"
                    style={{ fontSize: 25, alignSelf: 'center', paddingEnd: 20 }}
                  />
                  <Text style={styles.textInfor}>{userSelect.address}</Text>
                </View>
                <View style={styles.wrapInforUser}>
                  <Icon
                    name="team"
                    type="AntDesign"
                    style={{ fontSize: 25, alignSelf: 'center', paddingEnd: 20 }}
                  />
                  <Text style={styles.textInfor}>{userSelect.position}</Text>
                </View>
                {
                  expanded &&
                  <View style={{}}>
                    <View style={styles.wrapInforUser}>
                      <Icon
                        name="phone"
                        type="AntDesign"
                        style={{ fontSize: 25, alignSelf: 'center', paddingEnd: 20 }}
                      />
                      <TouchableOpacity style={styles.textInfor} onPress={() => Linking.openURL(`tel:${userSelect.phone}`)}>
                        <Text style={[styles.textInfor, { color: Colors.mainColor }]}>{userSelect.phone ?? ''}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapInforUser}>
                      <Icon
                        name="mail"
                        type="AntDesign"
                        style={{ fontSize: 25, alignSelf: 'center', paddingEnd: 20 }}
                      />
                      <TouchableOpacity onPress={() => Linking.openURL('mailto:' + userSelect.email)}>
                        <Text style={{ color: '#1591e7', fontSize: 15, paddingTop: 4 }}>{userSelect.email}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                }
                <TouchableOpacity style={{ paddingVertical: 5 }} onPress={() => toggleExpand()}>
                  <Icon name={expanded ? 'down' : 'up'} type="AntDesign" style={{ fontSize: 20, alignSelf: 'center' }} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                  <TouchableOpacity style={{ paddingBottom: 5 }} onPress={() => Linking.openURL(`tel:${userSelect.phone}`)}>
                    <Icon
                      name="phone"
                      type="AntDesign"
                      style={{ fontSize: 25, alignSelf: 'center' }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingBottom: 5 }} onPress={() => Linking.openURL(`sms:${userSelect.phone}`)}>
                    <Icon
                      name="message1"
                      type="AntDesign"
                      style={{ fontSize: 25, alignSelf: 'center' }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingBottom: 5 }} onPress={() => Linking.openURL('mailto:' + userSelect.email)}>
                    <Icon
                      name="mail"
                      type="AntDesign"
                      style={{ fontSize: 25, alignSelf: 'center' }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingBottom: 5 }} onPress={() => setModalVisible(false)}>
                    <Icon
                      name="closecircleo"
                      type="AntDesign"
                      style={{ fontSize: 25, alignSelf: 'center' }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View >
  )
}
export default ContactScreen;
