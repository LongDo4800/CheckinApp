import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
  Image,
  Dimensions,
  BackHandler,
  Switch,
  ActivityIndicator
} from "react-native";
import { NavHeader, Header } from "../../Components/Header";
import styles from "./HomeStyle";
import { Icon } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import { Colors, UtillSize } from "../../Themes";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import NetInfo from '@react-native-community/netinfo';
import { HideMessage, ShowMessage } from "../../Components/Message";
import allReducers from "../../Redux/Reducers";
import mushroom from "../../Api/siten-assistant.api";

class HomeScreen extends Component {
  isConnected;
  constructor(props) {
    super(props);
    this.state = {
      noInternet: false,
      indexTabActive: 0,
      dataToday: null,
      timeChecking: null,
      idToday: null,
      listSchedule: [],
      isLoadingScrollView: false,
      loadingTodayStatus: 'loading',
      isMonthMode: false,
      listScheduleMonth: [],
      listScheduleWeek: [],
      fromDate: '',
      toDate: '',
      listDayoffs: []
    };
  }

  componentDidMount() {
    StatusBar.setBackgroundColor('#03abed');
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.unsubcribeNetworkInfor = NetInfo.addEventListener(s => {
      console.log(s.isConnected, 'internnet');
      if (s.isConnected) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
      }
    });
    this.fetchingTodayTimekeepingStatus();
    this.getSchedules();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.unsubcribeNetworkInfor();
  }

  handleBackButtonClick() {
    console.log('go');
    return true;
  }

  today() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  async fetchingTodayTimekeepingStatus() {
    let strDataToday = await AsyncStorage.getItem('dataToday');
    let dataToday = strDataToday ? JSON.parse(strDataToday) : null;

    this.setState({
      loadingTodayStatus: 'loading'
    });

    if (!this.isConnected && dataToday && dataToday.date && new Date(dataToday.date).getTime() == this.today().getTime()) {
      if (dataToday) {
        this.setState({
          dataToday,
          loadingTodayStatus: 'hasValue'
        });
      }
      else {
        this.setState({
          loadingTodayStatus: 'error'
        });
      }
      return;
    }


    try {
      let data = await mushroom.schedule.listAsync({
        filters: ['userId=$$user_id', 'date>=$$today', 'date<$$today+1days'],
        fields: 'id,date,userValue,timekeeping',
        limit: 1
      });
      this.setState({
        dataToday: data.result,
        idToday: data.result.length > 0 ? data.result[0].id : null,
        loadingTodayStatus: 'hasValue',
        isLoadingScrollView: false
      });
      await AsyncStorage.setItem('dataToday', JSON.stringify(data.result));

    } catch (error) {
      this.setState({
        loadingTodayStatus: 'error'
      });
    }


  }

  getModay(d) {
    d = new Date(d);
    let day = d.getDay()
    let diff = d.getDate() - day + (day == 0 ? -6 : 1);
    let monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  async getSchedules() {

    this.setState({
      isLoadingScrollView: true
    });

    let today = new Date();
    let monday = this.getModay(new Date());
    let strMonday = monday.toISOString();
    let firstDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    // console.log(firstDate, firstDate.toISOString(), lastDate.toISOString(), 'lastDate');

    let sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);
    sunday.setHours(0, 0, 0, 0);

    let strSunday = sunday.toISOString();
    let listScheduleMonth = await AsyncStorage.getItem('listScheduleMonth');
    let listScheduleWeek = await AsyncStorage.getItem('listScheduleWeek');
    let scheduleDayoff = await AsyncStorage.getItem('scheduleDayoff');

    if (this.isConnected) {
      let schedulesResponseMonth;
      let schedulesResponseWeek;
      try {
        schedulesResponseMonth = mushroom.schedule.listAsync({
          filters: ['userId=$$user_id', 'date>=' + firstDate.toISOString(), 'date<=' + lastDate.toISOString()],
          limit: 31,
          fields: ['id', 'date', 'userValue', 'timekeeping']
        });

        scheduleDayoff = mushroom.sa_dayoff.listAsync({
          filters: ['date>=$$today-1months', 'date<=$$today+1months'],
        });

        schedulesResponseWeek = await mushroom.schedule.listAsync({
          filters: ['userId=$$user_id', 'date>=' + strMonday, 'date<=' + strSunday],
          limit: 31,
          fields: ['id', 'date', 'userValue', 'timekeeping']
        });


        schedulesResponseMonth = await schedulesResponseMonth;
        scheduleDayoff = await scheduleDayoff;

      } catch (error) {
        console.log();
        ShowMessage('Unable to get schedule data. Please try again.', 'danger', 3000);
        this.setState({
          isLoadingScrollView: false
        });
        return;
      }

      let arr = [];
      schedulesResponseWeek.result.forEach(e => {
        if (monday.getTime() <= new Date(e.date).getTime() && new Date(e.date).getTime() <= sunday.getTime()) {
          arr.push(e);
        }

      });
      this.setState({
        // listSchedule: schedulesResponseWeek.result,
        listScheduleWeek: schedulesResponseWeek.result,
        listScheduleMonth: schedulesResponseMonth.result,
        listDayoffs: scheduleDayoff.result,
        listSchedule: this.state.isMonthMode ? schedulesResponseMonth.result : schedulesResponseWeek.result
      });

      await AsyncStorage.setItem('listScheduleMonth', JSON.stringify(schedulesResponseMonth.result));
      await AsyncStorage.setItem('listScheduleWeek', JSON.stringify(schedulesResponseWeek.result));
      await AsyncStorage.setItem('listDayoffs', JSON.stringify(scheduleDayoff.result));

      this.setState({
        isLoadingScrollView: false
      });
    } else {
      const newState = {
        listScheduleWeek: listScheduleWeek ? JSON.parse(listScheduleWeek) : [],
        listScheduleMonth: listScheduleMonth ? JSON.parse(listScheduleMonth) : [],
        listDayoffs: scheduleDayoff ? JSON.parse(scheduleDayoff) : [],
        isLoadingScrollView: false
      };
      newState.listSchedule = this.state.isMonthMode ? newState.listScheduleMonth : newState.listScheduleWeek;
      this.setState(newState);
    }

  }

  checkin = async () => {
    if (this.isConnected) {
      try {
        await mushroom.schedule.partialUpdateAsync({
          id: this.state.idToday,
          timekeeping: new Date()
        })
      } catch (error) {
        Alert.alert(
          "Alert",
          error.code === 1000
            ? 'You must be in Siten\'s office to use this function'
            : 'Error occurred while processing',
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
          ],
          { cancelable: false }
        );
        return;
      }
      this.fetchingTodayTimekeepingStatus();
      this.getSchedules();
    } else {
      ShowMessage('Whoops! No internet connection found. Check your connection and try again!', 'danger', 3000);
    }
  }

  getItemColors(timeKeeping, userValue, date) {
    let colors = {
      backgroundColor: '#eee',
      colorText: 'black'
    }

    let today = new Date().getTime();
    date = (new Date(date)).getTime();

    let time8h30 = new Date(date);
    time8h30.setHours(8, 31, 0, 0);

    let time9h = new Date(date);
    time9h.setHours(9, 1, 0, 0);

    let time13h30 = new Date(date);
    time13h30.setHours(13, 31, 0, 0);

    let time14h = new Date();
    time14h.setHours(14, 1, 0, 0);

    if (!timeKeeping) {
      if (today > date) {
        colors.backgroundColor = '#a9a9a9'; // gray
        colors.colorText = 'black';
      } else {
        colors.backgroundColor = '#cceef7'; // light blue
        colors.colorText = 'black';
      }

    } else {
      let timekeeping = new Date(timeKeeping).getTime();

      if (userValue === 'Cả ngày' || userValue === 'Sáng' || userValue === 'Sáng & CT') {
        if (timekeeping <= time8h30.getTime()) {
          colors.backgroundColor = '#00bfff'; // blue
          colors.colorText = 'white';
        } else if (time8h30.getTime() < timekeeping && timekeeping <= time9h.getTime()) {
          colors.backgroundColor = '#fdd043'; // yellow
          colors.colorText = 'white';
        } else if (timekeeping > time9h.getTime()) {
          colors.backgroundColor = '#e74c3c';
          colors.colorText = 'white';
        }
      } else if (userValue === 'Chiều' || userValue === 'Chiều & CT') {
        if (timekeeping <= time13h30.getTime()) {
          colors.backgroundColor = '#00bfff'; //blue
          colors.colorText = 'white';
        } else if (time13h30.getTime() < timekeeping && timekeeping <= time14h.getTime()) {
          colors.backgroundColor = '#ffd700';//yellow
          colors.colorText = 'white';
        } else if (timekeeping > time14h.getTime()) {
          colors.backgroundColor = 'red';
          colors.colorText = 'white';
        }
      }

    }
    return colors
  }

  checkWarning(time, userValue, date) {
    let warning = false;

    let time13h30 = new Date(date);
    time13h30.setHours(13, 30, 0, 0);

    let time12h = new Date(date);
    time12h.setHours(12, 0, 0, 0);

    let pass = new Date(date);
    let today = new Date();

    if (pass.getTime() < today.getTime()) {
      let timeKeeping;
      timeKeeping = time ? new Date(time).getTime() : ''
      if (userValue === 'Cả ngày' || userValue === 'Sáng' || userValue === 'Sáng & CT') {
        if (timeKeeping) {
          if (timeKeeping >= time13h30.getTime()) {
            warning = true
          } else warning = false
        } else warning = true
      } else if (userValue === 'Chiều' || userValue === 'Chiều & CT') {
        if (timeKeeping) {
          if (timeKeeping < time12h.getTime()) {
            warning = true
          } else warning = false
        } else warning = true
      } else if (userValue === 'Nghỉ' || userValue === 'Công tác' || userValue === 'CT Sáng' || userValue === 'CT Chiều' || userValue === 'WFH' || userValue === 'WFH Sáng' || userValue === 'WFH Chiều') {
        if (timeKeeping) {
          warning = true
        } else warning = false
      } else {
        if (timeKeeping) {
          warning = true
        } else warning = false;
      }
    }

    return warning;
  }

  renderItem(item, index) {

    let colors = this.getItemColors(item.timekeeping, item.userValue, item.date);
    let warning = this.checkWarning(item.timekeeping, item.userValue, item.date);
    let timeKeeping = item.timekeeping ? 'Checked-in: ' + moment(new Date(item.timekeeping).toString()).format('h:mm A') : 'N/A';
    let date = moment(new Date(item.date)).format('dddd');
    let day = moment(new Date(item.date)).format('MMMM DD YYYY');

    let a = new Date(item.date);
    let b = new Date();
    b.setHours(0, 0, 0, 0);
    if (a.getTime() === b.getTime()) {
      date = 'Today'
    }

    let scheduleWork;
    switch (item.userValue) {
      case "Cả ngày":
        scheduleWork = 'Full time';
        break;
      case "Nghỉ":
        scheduleWork = 'Off';
        break;
      case "Sáng":
        scheduleWork = 'Morning';
        break;
      case "Chiều":
        scheduleWork = 'Afternoon';
        break;
      case "Công tác":
        scheduleWork = 'On-site';
        break;
      case "CT Sáng":
        scheduleWork = 'On-site morning';
        break;
      case "CT Chiều":
        scheduleWork = 'On-site afternoon';
        break;
      case "Sáng & CT":
        scheduleWork = 'Morning & On-site';
        break;
      case "Chiều & CT":
        scheduleWork = 'Afternoon & On-site';
        break;
      case "WFH":
        scheduleWork = 'Work from home';
        break;
      case "WFH Sáng":
        scheduleWork = 'WFH morning';
        break;
      case "WFH Chiều":
        scheduleWork = 'WFH afternoon';
        break;
      case null:
      case "":
      case undefined:
        scheduleWork = (new Date(item.date).getDay()) === 0 || this.state.listDayoffs.map(d => new Date(d.date).getTime()).includes(new Date(item.date).getTime()) ? 'Off' : 'N/A';
        break;
      default:
        scheduleWork = 'Other';
        break;
    }

    let borderTop = index === 0 ? 5 : 0;
    let borderBottom = index === this.state.listSchedule.length - 1 ? 5 : 0;

    return (
      <View key={item.id} style={{
        backgroundColor: colors.backgroundColor,
        borderBottomLeftRadius: borderBottom,
        borderBottomRightRadius: borderBottom,
        borderTopLeftRadius: borderTop,
        borderTopRightRadius: borderTop,
        marginBottom: 1
      }}>
        <View style={styles.wrapItem} >
          <View style={{ flex: 6.75 }}>
            <View style={styles.wrapItemLeft}>
              <View>
                <Text style={{
                  fontWeight: 'bold',
                  color: colors.colorText,
                  fontSize: RFValue(18)
                }}>{date}</Text>
              </View>
              <View>
                <Text style={{
                  color: colors.colorText,
                  fontSize: RFValue(12),
                  fontSize: RFValue(12),
                  marginTop: 5,
                  marginLeft: 5
                }}>{day}</Text>
              </View>
            </View>
            <Text style={{ color: colors.colorText, fontSize: RFValue(12) }}>{timeKeeping}</Text>
          </View>
          <View style={{ flex: 1 }}>
            {warning ?
              <Icon name="warning" type='AntDesign' style={{ fontSize: RFValue(16), color: 'yellow' }} />
              : null
            }
          </View>
          <View style={{ flex: 2.25 }}>
            <Text style={{ color: colors.colorText, fontSize: RFValue(12), textAlign: 'right' }}>{scheduleWork}</Text>
          </View>
        </View>
      </View>

    )

  }

  switchMode = (e) => {
    if (e) {
      this.monthMode();
    }
    else {
      this.weekMode();
    }
  }

  monthMode = () => {
    this.setState({
      listSchedule: this.state.listScheduleMonth,
      isMonthMode: true
    })
  }

  weekMode = () => {
    this.setState({
      listSchedule: this.state.listScheduleWeek,
      isMonthMode: false
    })
  }

  todayTimekeepingStatusTap() {
    // TODO: kiểm tra nếu quá ngày thì refresh: 
    mushroom.schedule.invalidCache();
    this.fetchingTodayTimekeepingStatus()
  }

  onRefreshScroll() {
    console.log('onRefresh');
    mushroom.schedule.invalidCache();
    this.fetchingTodayTimekeepingStatus();
    this.getSchedules();
  }

  renderTodayTimekeepingLoading() {
    return (
      <View style={styles.wrapContent}>
        <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
          <View style={{ flex: 8.5 }}>
            <Text style={styles.textTap}>Loading today status ...</Text>
            <Text style={{ fontSize: RFValue(12), color: 'gray', paddingTop: 8 }}> </Text>
          </View>
          <View style={{ flex: 1.5 }}>
            <ActivityIndicator style={{ alignItems: 'center' }} color={Colors.mainColor} />
          </View>
        </View>
      </View>)
  }

  renderTodayTimekeepingError() {
    return (
      <View style={styles.wrapContent}>
        <TouchableOpacity style={styles.wrapTapChecked} onPress={() => this.fetchingTodayTimekeepingStatus()}>
          <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
            <View style={{ flex: 8.5 }}>
              <Text style={styles.textTap}>Error occurred while fetching data</Text>
              <Text style={{ fontSize: RFValue(12), color: 'gray', paddingTop: 8 }}>Tap to refresh</Text>
            </View>
            <View style={{ flex: 1.5 }}>
              <Icon name="warning" type='AntDesign' style={{ fontSize: RFValue(40), color: Colors.error, marginBottom: 5 }} />
            </View>
          </View>
        </TouchableOpacity>
      </View>)
  }

  renderTodayTimekeepingNotYet() {
    return (
      <View style={styles.wrapContent}>
        <TouchableOpacity style={styles.wrapTapCheckin} onPress={() => { this.checkin() }}>
          <Text style={styles.textTap}>Tap to mark as being at Siten's office</Text>
          <Icon name="gesture-double-tap" type='MaterialCommunityIcons' style={styles.iconTap} />
        </TouchableOpacity>
      </View>
    );
  }

  renderTodayTimekeepingHasValue() {
    return (
      <View style={styles.wrapContent}>
        <TouchableOpacity style={styles.wrapTapChecked} onPress={() => { this.todayTimekeepingStatusTap() }}>
          <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 5 }}>
            <View style={{ flex: 8.5 }}>
              <Text style={styles.textTap}>You've been at Siten's office today</Text>
              <Text style={{ fontSize: RFValue(12), color: 'gray', paddingTop: 8 }}>Checked-in at: {moment(new Date(this.state.dataToday[0].timekeeping)).format('hh:mm A')}</Text>
            </View>
            <View style={{ flex: 1.5 }}>
              <Icon name="check" type='MaterialCommunityIcons' style={{ fontSize: RFValue(40), color: Colors.mainColor, marginBottom: 5 }} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }



  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <NavHeader />
        <Header
          leftFunction={() => this.props.navigation.openDrawer()}
          IconLeft={{ name: "menu", type: "Ionicons" }}
          title={"Timekeeping"}
          NoNavHeader
        />

        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          {(() => {
            switch (this.state.loadingTodayStatus) {
              case 'loading':
                return this.renderTodayTimekeepingLoading();
              case 'error':
                return this.renderTodayTimekeepingError();
              case 'hasValue':
                console.log(this.state.dataToday[0], "this.state.dataToday[0]");
                return this.state.dataToday[0].timekeeping
                  ? this.renderTodayTimekeepingHasValue()
                  : this.renderTodayTimekeepingNotYet();
            }
          })()}

          <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: 20, marginBottom: 10, alignItems: 'center' }}>
            <TouchableOpacity onPress={this.weekMode}>
              <Text style={{ color: !this.state.isMonthMode ? styles.textTap.color : 'black' }}>Week</Text>
            </TouchableOpacity>
            <Switch
              trackColor={{ false: "#ddd", true: "#ddd" }}
              thumbColor={this.state.isMonthMode ? "white" : "white"}
              ios_backgroundColor="#ddd"
              onValueChange={this.switchMode}
              value={this.state.isMonthMode}
              style={{ marginHorizontal: 10 }}
            />
            <TouchableOpacity onPress={this.monthMode}>
              <Text style={{ color: this.state.isMonthMode ? styles.textTap.color : 'black' }}>Month</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={['rgb(0, 138, 203)']}
                onRefresh={() => this.onRefreshScroll()}
                refreshing={this.state.isLoadingScrollView}
              />
            }
          >
            {this.state.listSchedule
              ? <View style={styles.wrapListCheck}>
                {this.state.listSchedule.map((item, index) =>
                  this.renderItem(item, index)
                )}
              </View> : null
            }
          </ScrollView>
        </SafeAreaView>
      </View >
    );
  }
}
export default HomeScreen;
