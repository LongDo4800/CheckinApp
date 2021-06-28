package com.example.CheckInApi.controller;


import com.example.CheckInApi.exception.ObjectNotFoundException;
import com.example.CheckInApi.modal.Sitener;
import com.example.CheckInApi.repository.CheckinRepository;
import com.example.CheckInApi.repository.ProfileRepository;
import com.example.CheckInApi.repository.SitenerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.example.CheckInApi.utils.RespondUtil.ok;

@RestController
public class SitenerController {
    @Autowired
    private SitenerRepository sitenerRepository;

        @Autowired
    private CheckinRepository checkinRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @PostMapping(path = "/createSitener") // Map ONLY POST Requests
    public Sitener createSitener(@RequestBody Sitener newSitener) {

        return sitenerRepository.save(newSitener);
    }

    @GetMapping(path="/getSitener")
    public @ResponseBody
    List<Sitener> getAllSitener() {
        // This returns a JSON or XML with the users
        return sitenerRepository.findAll();
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
            sitener.setTeam(newSitener.getTeam());
            sitener.setAvatar(newSitener.getAvatar());
            sitener.setProfile(newSitener.getProfile());
            return sitenerRepository.save(sitener);
        }).orElseGet(() -> {
            return sitenerRepository.save(newSitener);
        });

    }
}
