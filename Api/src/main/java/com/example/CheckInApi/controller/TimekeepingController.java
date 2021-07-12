package com.example.CheckInApi.controller;


import com.example.CheckInApi.exception.ObjectNotFoundException;
import com.example.CheckInApi.modal.Sitener;
import com.example.CheckInApi.modal.Timekeeping;
import com.example.CheckInApi.repository.CheckinRepository;
import com.example.CheckInApi.repository.ProfileRepository;
import com.example.CheckInApi.repository.SitenerRepository;
import com.example.CheckInApi.repository.TimeKeepingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.example.CheckInApi.utils.RespondUtil.ok;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TimekeepingController {
    @Autowired
    private TimeKeepingRepository timeKeepingRepository;
    @Autowired
    private CheckinRepository checkinRepository;

    @Autowired
    private SitenerRepository sitenerRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping(path = "/createTimeK")
    public Timekeeping createTimeK(@RequestBody Timekeeping newTimeK) {

        return timeKeepingRepository.save(newTimeK);
    }

    @GetMapping(path="/getTimeK")
    public @ResponseBody
    List<Timekeeping> getAllCheckin() {

        return timeKeepingRepository.findAll();
    }

    @GetMapping(path = "/getTimeK/{id}")
    public Timekeeping getTimeK(@PathVariable int id) {
        // This returns a JSON or XML with the users
        return timeKeepingRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Could not found id:"+id));
    }

    @DeleteMapping(path="/deleteTimeK/{id}")
    public Map<String,String> deleteTimeKById(@PathVariable int id){


        Timekeeping timekeeping = timeKeepingRepository.findById(id).orElseThrow(()-> new ObjectNotFoundException("Could not found id:"+id));


        checkinRepository.deleteByTimekeepingId(id);

        timeKeepingRepository.delete(timekeeping);

        return ok();
    }

    @PutMapping(path="/updateTimeK/{id}")
    public Timekeeping updateTimeK(@RequestBody Timekeeping newTimeK, @PathVariable int id) {
        Timekeeping time_keeping = timeKeepingRepository.findById(id).orElseThrow(()-> new ObjectNotFoundException("Could not found id:"+id));

        return timeKeepingRepository.findById(id).map(timekeeping -> {
            timekeeping.setCheckinDate(newTimeK.getCheckinDate());
            return timeKeepingRepository.save(timekeeping);
        }).orElseGet(() -> {
            return timeKeepingRepository.save(newTimeK);
        });

    }
}
