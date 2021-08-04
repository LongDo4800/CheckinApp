package com.example.CheckInApi.controller;
import com.example.CheckInApi.exception.ObjectNotFoundException;
import com.example.CheckInApi.modal.Checkin;
import com.example.CheckInApi.modal.Sitener;
import com.example.CheckInApi.modal.Timekeeping;
import com.example.CheckInApi.repository.CheckinRepository;
import com.example.CheckInApi.repository.SitenerRepository;
import com.example.CheckInApi.repository.TimeKeepingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.example.CheckInApi.utils.RespondUtil.ok;

@CrossOrigin
@RestController
public class CheckinController {
    @Autowired
    private CheckinRepository repository;
    @Autowired
    private TimeKeepingRepository timeKeepingRepository;
    @Autowired
    private SitenerRepository sitenerRepository;
    @Value("${valid.ip}")
    private String rootIP;
    
    @PostMapping(path = "/createCheckin") // Map ONLY POST Requests
    public Checkin createCheckin(@RequestBody Map<String,Object> body) throws Exception {
        if (!rootIP.equals(body.get("ip"))) {
            throw new ObjectNotFoundException("ip not allowed");
        }
        Timekeeping tk = timeKeepingRepository.findByTimeKeepingFromSecret(body.get("secret").toString());
        Optional<Sitener> stn = sitenerRepository.findById(Integer.parseInt(body.get("sitener_id").toString()));
        LocalDateTime ldt = LocalDateTime.now();
        Sitener sitener = stn.get();
        LocalDate reqDate = ldt.atZone(ZoneId.systemDefault()).toLocalDate();
//        LocalDate tkDate = tk.getCheckinDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        if (!reqDate.toString().equals(tk.getCheckinDate().toString())) {
            throw new ObjectNotFoundException("timekeeping expired");
        }
        System.out.println(reqDate + " " + tk.getCheckinDate());
        Checkin newCheckin = new Checkin();
        newCheckin.setTimekeeping(tk);
        newCheckin.setCheckinTime(Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant()));
        newCheckin.setSitener(sitener);

        return newCheckin;
//            return repository.save(newCheckin);
    }

    @GetMapping(path = "/getCheckinFrom")
    public @ResponseBody
    List<Checkin> getAllCheckinFrom() {

        return repository.findAll();
    }

    @GetMapping(path = "/getCheckin")
    public @ResponseBody
    List<Checkin> getAllCheckin() {

        return repository.findAll();
    }

    @GetMapping(path = "/getCheckin/{id}")
    public Checkin getCheckin(@PathVariable int id) {
        // This returns a JSON or XML with the users
        return repository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Could not found id:"+id));
    }

    @DeleteMapping(path = "/deleteCheckin/{id}")
    public Map<String,String> deleteCheckinById(@PathVariable int id) {
        Checkin checkin = repository.findById(id).orElseThrow(()-> new ObjectNotFoundException("Could not found id:"+id));
        repository.deleteById(id);
        return ok();
    }

    @PutMapping(path = "/updateCheckin/{id}")
    public Checkin updateCheckin(@RequestBody Checkin newCheckin, @PathVariable int id) {
        return repository.findById(id).map(checkin -> {
            checkin.setSitener(newCheckin.getSitener());
            checkin.setTimekeeping(newCheckin.getTimekeeping());
            checkin.setCheckinTime(newCheckin.getCheckinTime());
            return repository.save(checkin);
        }).orElseGet(() -> {
            return repository.save(newCheckin);
        });

    }

}
