package com.example.CheckInApi.repository;

import com.example.CheckInApi.modal.Checkin;
import com.example.CheckInApi.modal.Timekeeping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface TimeKeepingRepository extends JpaRepository<Timekeeping, Integer> {

    @Query("select a from Timekeeping a where a.secret=?1")
    Timekeeping findByTimeKeepingFromSecret(String secret);
}
