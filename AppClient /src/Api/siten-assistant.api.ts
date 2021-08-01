import mushroom, { defineAsyncResource, IMushroom, MushroomBatchDeleteResource, MushroomCreateResource, MushroomDeleteResource, MushroomFindByIdResource, MushroomListResource, MushroomPartialUpdateResource, MushroomResourceBase } from "mushroomjs";
import { IMushroomAuth, useAuth } from "mushroomjs-auth";
import AuthAsyncStorage from "mushroomjs-auth-rn-async-storage";
import { IMushroomFile, useFile } from "mushroomjs-file";
import AsyncStorage from "@react-native-async-storage/async-storage";


defineAsyncResource<Sa_version>({ name: 'sa_version', actions: { findMany: { clientCache: true }, findById: { clientCache: true } } });
defineAsyncResource<Schedule>({ name: 'schedule', actions: { findMany: { clientCache: true }, updatePartially: {} } });
defineAsyncResource<Sa_housekeeping>({ name: 'sa_housekeeping', actions: { findMany: { clientCache: true } } });
defineAsyncResource<Sa_dayoff>({ name: 'sa_dayoff', actions: { findMany: { clientCache: true } } });
defineAsyncResource<Device>({ name: 'device', actions: { findMany: { clientCache: true }, findById: { clientCache: true }, createOne: {}, updatePartially: {}, deleteOne: {}, deleteMany: {} } });
defineAsyncResource<Timer>({ name: 'timer', actions: { findMany: { clientCache: true }, findById: { clientCache: true } } });
(async function(){
    let keys = await AsyncStorage.getAllKeys();
    console.log(keys , 'keyskeys');
    for (let i = 0; i < keys.length; i++) {
      console.log(keys[i], await AsyncStorage.getItem(keys[i]), 'keyssss');
    }
    useAuth(AuthAsyncStorage);
    keys = await AsyncStorage.getAllKeys();
    console.log(keys , 'keyskeyseeee');
    for (let i = 0; i < keys.length; i++) {
      console.log(keys[i], await AsyncStorage.getItem(keys[i]), 'keyssssgggggg');
    }
})();

useFile();

mushroom.$using("https://assistant-api.timwook.com/api/assistant/v1/");


type ISODateString = string | Date;
type IdString = string;

//#region Schedule
export enum SCHEDULE_WORKING_STATUS {
    FULLTIME = "Cả ngày",
    DAYOFF = "Nghỉ",
    MORNING = "Sáng",
    AFTERNOON = "Chiều",
    ONSITE = "Công tác",
    ONSITE_MORNING = "CT Sáng",
    ONSITE_AFTERNOON = "CT Chiều",
    MORNING_AND_ONSITE = "Sáng & CT",
    AFTERNOON_AND_ONSITE = "Chiều & CT"
}

interface Schedule {
    id?: IdString,
    userId?: IdString,
    date?: ISODateString,
    value?: string,
    initValue?: string,
    userValue?: SCHEDULE_WORKING_STATUS,
    assistantValue?: SCHEDULE_WORKING_STATUS,
    reason?: string,
    timekeeping?: ISODateString,
    autoTimekeeping?: ISODateString
}
//#endregion

//#region Sa_version
interface Sa_version {
    id?: IdString,
    platform?: string,
    current?: number,
    min?: number,
    link?: string,
}
//#endregion

//#region Sa_dayoff
interface Sa_dayoff {
    id?: IdString,
    date?: ISODateString,
    reason?: string
}
//#endregion

//#region Sa_housekeeping
interface Sa_housekeeping {
    id?: IdString,
    dow?: 2 | 3 | 4 | 5 | 6 | 7,
    userIds?: IdString[],
    createdTime?: ISODateString,
    lastModifiedTime?: ISODateString
}
//#endregion

//#region Device
export enum DEVICE_INFORMATION_OS_ENUM {
    IOS = "iOS",
    ANDROID = "Android"
}

export enum DEVICE_NOTIFICATION_SERVICE_ENUM {
    FIREBASE = "Firebase",
    SNS = "SNS",
    ONESIGNAL = "OneSignal",
    NOTIFICATIONHUB = "NotificationHub"
}

interface Device {
    id?: IdString,
    user_id?: IdString,
    device_id?: string,
    information?: {
        os?: DEVICE_INFORMATION_OS_ENUM,
        os_version?: string,
        name?: string,
        screen?: {
            device_width?: number,
            device_height?: number,
            window_width?: number,
            window_height?: number,
            pixelRatio?: number
        },
        other?: string
    },
    notification?: {
        service?: DEVICE_NOTIFICATION_SERVICE_ENUM,
        token?: string
    },
    created_time?: ISODateString,
    last_modified_time?: ISODateString
}
//#endregion

//#region Timer
interface Timer {
    id?: IdString,
    name?: string,
    email?: string,
    avatar?: IdString,
    description?: string,
    position?: string,
    phone?: string,
    address?: string,
    timIds?: IdString[],
    creatorId?: IdString,
    lastModifiedUserId?: IdString,
    createdTime?: ISODateString,
    lastModifiedTime?: ISODateString,
    fromDate?: ISODateString,
    toDate?: ISODateString,
    birthday?: ISODateString,
    companyId?: IdString,
    userId?: IdString,
    isWorking?: boolean,
    type?: string,
    feedback?: {
        content?: string,
        isShow?: boolean
    }
}
//#endregion

interface IApi extends IMushroom {
    sa_version: MushroomResourceBase & MushroomListResource<Sa_version> & MushroomFindByIdResource<Sa_version>,
    schedule: MushroomResourceBase & MushroomListResource<Schedule> & MushroomPartialUpdateResource<Schedule>,
    sa_housekeeping: MushroomResourceBase & MushroomListResource<Sa_housekeeping>,
    sa_dayoff: MushroomResourceBase & MushroomListResource<Sa_version>,
    device: MushroomResourceBase & MushroomListResource<Device> & MushroomFindByIdResource<Device> & MushroomCreateResource<Device> & MushroomPartialUpdateResource<Device> & MushroomDeleteResource & MushroomBatchDeleteResource,
    timer: MushroomResourceBase & MushroomListResource<Timer> & MushroomFindByIdResource<Timer>
}

type SitenAssistantApi = IMushroomAuth & IMushroomFile & IApi;

export default mushroom as SitenAssistantApi;