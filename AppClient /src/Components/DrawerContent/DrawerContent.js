import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {NavHeader} from '../Header';
import {Fonts, Colors} from '../../Themes';
import {Icon} from 'native-base';
class DrawerContent extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <NavHeader />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
            backgroundColor: Colors.mainColor,
          }}>
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: 'cover',
              borderRadius: 70,
            }}
            source={{
              uri:
                'https://i1-ione.vnecdn.net/2019/07/03/0-1-4015-1562137097.jpg?w=460&h=0&q=100&dpr=1&fit=crop&s=9pXGZ50Lc922QdJ9608fwg',
            }}
          />
          <Text
            style={[
              Fonts.normal,
              {paddingTop: 10, fontWeight: '600', color: '#fff'},
            ]}>
            ???????
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors.mainColor,
              paddingBottom: 5,
            }}>
            <TouchableOpacity style={styles.item} >
              <View style={styles.wrapIcon}>
                <Icon name="md-time" type="Ionicons" style={styles.icon} />
              </View>
              <Text style={styles.Text}>Chờ ký</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <View style={styles.wrapIcon}>
                <Icon name="remove" type="FontAwesome" style={styles.icon} />
              </View>
              <Text style={styles.Text}>Từ chối ký</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <View style={styles.wrapIcon}>
                <Icon name="checklist" type="Octicons" style={styles.icon} />
              </View>
              <Text style={styles.Text}>Đã ký</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <View style={styles.wrapIcon}>
                <Icon name="user-tie" type="FontAwesome5" style={styles.icon} />
              </View>
              <Text style={styles.Text}>Văn bản tôi tạo</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 5}}>
            <TouchableOpacity style={styles.item}>
              <View style={styles.wrapIcon}>
                <Icon name="shield" type="Feather" style={styles.icon} />
              </View>
              <Text style={styles.Text}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <View style={styles.wrapIcon}>
                <Icon
                  name="logout"
                  type="AntDesign"
                  style={[styles.icon, {fontSize: 18}]}
                />
              </View>
              <Text style={styles.Text}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  icon: {
    color: Colors.mainColor,
    fontSize: 20,
  },
  wrapIcon: {
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: Colors.mainColor,
    fontSize: 15,
  },
});

export default DrawerContent;
