package com.example.CheckInApi.controller;
import com.example.CheckInApi.exception.ObjectNotFoundException;
import com.example.CheckInApi.modal.Checkin;
import com.example.CheckInApi.modal.Sitener;
import com.example.CheckInApi.repository.CheckinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;

import static com.example.CheckInApi.utils.RespondUtil.ok;

@RestController
public class CheckinController {
    @Autowired
    private CheckinRepository repository;
    
    @PostMapping(path = "/createCheckin") // Map ONLY POST Requests
    public Checkin createCheckin(@RequestBody Checkin newCheckin) {

        return repository.save(newCheckin);
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
