package com.example.CheckInApi.controller;


import com.example.CheckInApi.exception.ObjectNotFoundException;
import com.example.CheckInApi.modal.Checkin;
import com.example.CheckInApi.modal.CheckinResponse;
import com.example.CheckInApi.modal.Sitener;
import com.example.CheckInApi.modal.Timekeeping;
import com.example.CheckInApi.repository.CheckinRepository;
import com.example.CheckInApi.repository.ProfileRepository;
import com.example.CheckInApi.repository.SitenerRepository;
import com.example.CheckInApi.repository.TimeKeepingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

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
            sitener.setClassID(newSitener.getClassID());
            sitener.setEmail(newSitener.getEmail());
            sitener.setAddress(newSitener.getAddress());
            sitener.setPhone_no(newSitener.getPhone_no());
            sitener.setAvatar(newSitener.getAvatar());
            
            return sitenerRepository.save(sitener);
        }).orElseGet(() -> {
            return sitenerRepository.save(newSitener);
        });

    }

    @GetMapping(path = "/getSitenerFromDate/from={from}&to={to}&sitenerID={sitenerID}")
    public CheckinResponse getSitenerFromDate(@PathVariable String from, @PathVariable String to, @PathVariable Integer sitenerID) throws ParseException {
        CheckinResponse checkinRes = new CheckinResponse();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date fromDate = sdf.parse(from);
        Date toDate = sdf.parse(to);
       List<Integer> timekeepingIDs = timeKeepingRepository.findTimekeepingByDate(fromDate, toDate);
       List<Checkin> checkins = checkinRepository.getCheckinFromTo(timekeepingIDs,sitenerID);
        if(checkins!=null&&!(checkins.isEmpty())){
            List<Checkin> filteredCheckin = new ArrayList<>();
            for( int i =0; i< checkins.size(); i++){
                Checkin item = new Checkin(checkins.get(i).getId(), checkins.get(i).getCheckinTime(),checkins.get(i).getTimekeeping());
                filteredCheckin.add(item);
            }
            checkinRes.setCheckins(filteredCheckin);
            checkinRes.setStatus(true);
        }else{
            checkinRes.setCheckins(null);
            checkinRes.setStatus(false);
        }
    return checkinRes;
    }
}
