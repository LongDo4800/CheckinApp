package com.example.CheckInApi.controller;


import com.example.CheckInApi.exception.ObjectNotFoundException;
import com.example.CheckInApi.modal.Checkin;
import com.example.CheckInApi.modal.Sitener;
import com.example.CheckInApi.modal.Timekeeping;
import com.example.CheckInApi.repository.CheckinRepository;
import com.example.CheckInApi.repository.ProfileRepository;
import com.example.CheckInApi.repository.SitenerRepository;
import com.example.CheckInApi.repository.TimeKeepingRepository;
import org.hibernate.annotations.Check;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.CheckInApi.utils.RespondUtil.ok;

@CrossOrigin
@RestController
public class SitenerController {
    @Autowired
    private SitenerRepository sitenerRepository;

        @Autowired
    private CheckinRepository checkinRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private TimeKeepingRepository timeKeepingRepository;
    @PostMapping(path = "/createSitener") // Map ONLY POST Requests
    public Sitener createSitener(@RequestBody Sitener newSitener) {

        return sitenerRepository.save(newSitener);
    }

    @GetMapping(path="/getSitener")
    public @ResponseBody
    List<Sitener> getAllSitener() {
        // This returns a JSON or XML with the users
        List<Sitener> siteners = sitenerRepository.findAll();
        List<Sitener> res = siteners.stream().map(sitener -> {
            Sitener newSitener = new Sitener();
            newSitener.setName(sitener.getName());
            newSitener.setClassID(sitener.getClassID());
            newSitener.setId(sitener.getId());
            newSitener.setBirthday(sitener.getBirthday());
            newSitener.setAvatar(sitener.getAvatar());
            return newSitener;
        }).collect(Collectors.toList());
        return res;
    }

    @GetMapping(path = "/getSitener/{id}")
    public Sitener getSitener(@PathVariable int id) {
        // This returns a JSON or XML with the users
        return sitenerRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Could not found id:"+id));
    }
    @DeleteMapping(path="/deleteSitener/{id}")
    public Map<String,String> deleteSitenerById(@PathVariable int id){

        //Checkin checkin = checkinRepository.findBySitenerID(id);
        //checkin.setTimekeepingID(null);
//        checkinRepository.delete(checkin);
        Sitener sitener = sitenerRepository.findById(id).orElseThrow(()-> new ObjectNotFoundException("Could not found id:"+id));


        checkinRepository.deleteBySitenerId(id);

        sitenerRepository.delete(sitener);
        profileRepository.deleteById(sitener.getProfile().getId());
        return ok();
    }
    @PutMapping(path = "/updateSitener/{id}")
    public Sitener updateSitener(@RequestBody Sitener newSitener, @PathVariable int id) {
        return sitenerRepository.findById(id).map(sitener -> {
            sitener.setName(newSitener.getName());
            sitener.setBirthday(newSitener.getBirthday());
            sitener.setClassID(newSitener.getClassID());
            sitener.setEmail(newSitener.getEmail());
            sitener.setAddress(newSitener.getAddress());
            sitener.setPhoneNo(newSitener.getPhoneNo());
            sitener.setAvatar(newSitener.getAvatar());
            
            return sitenerRepository.save(sitener);
        }).orElseGet(() -> {
            return sitenerRepository.save(newSitener);
        });

    }
}
