package com.example.CheckInApi.controller;


import com.example.CheckInApi.modal.Sitener;
import com.example.CheckInApi.modal.Timekeeping;
import com.example.CheckInApi.repository.CheckinRepository;
import com.example.CheckInApi.repository.TimeKeepingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TimekeepingController {
    @Autowired
    private TimeKeepingRepository timeKeepingRepository;
    @Autowired
    private CheckinRepository checkinRepository;

    @GetMapping(path = "/createTimeK")
    public Timekeeping createTimeK(@RequestBody Timekeeping newTimeK) {

        return timeKeepingRepository.save(newTimeK);
    }

    @GetMapping(path="/getTimeK")
    public @ResponseBody
    List<Timekeeping> getAllCheckin() {

        return timeKeepingRepository.findAll();
    }

}
