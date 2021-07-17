package com.example.CheckInApi.modal;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class DateModal {
    @JsonFormat(pattern = "dd-MM-yyyy")
    public Date beginDate;
    @JsonFormat(pattern = "dd-MM-yyyy")
    public Date endDate;
}
