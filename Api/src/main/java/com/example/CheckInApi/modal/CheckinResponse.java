package com.example.CheckInApi.modal;

import java.util.List;

public class CheckinResponse {
    List<Checkin> checkins;
    public boolean status;

    public List<Checkin> getCheckins() {
        return checkins;
    }

    public void setCheckins(List<Checkin> checkins) {
        this.checkins = checkins;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }


}
