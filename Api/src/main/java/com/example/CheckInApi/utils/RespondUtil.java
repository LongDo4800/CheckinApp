package com.example.CheckInApi.utils;

import java.util.HashMap;
import java.util.Map;

public class RespondUtil {
    public static Map<String, String> ok(){
        Map<String,String> a = new HashMap<>();
        a.put("data","ok");
        return a;
    }
    public static Map<String, String> error(String msg){
        Map<String,String> a = new HashMap<>();
        a.put("error",msg);
        return a;
    }

}
