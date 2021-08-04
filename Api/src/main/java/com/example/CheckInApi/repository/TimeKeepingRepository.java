package com.example.CheckInApi.repository;

import com.example.CheckInApi.modal.Timekeeping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;


public interface TimeKeepingRepository extends JpaRepository<Timekeeping, Integer> {
    

    @Query("select a from Timekeeping a where a.secret=?1")
    Timekeeping findByTimeKeepingFromSecret(String secret);

    @Query("select a.id from Timekeeping a where a.checkinDate between :fromDate AND :toDate")
    List<Integer> findTimekeepingByDate(@Param("fromDate") Date fromDate, @Param("toDate") Date toDate);


}
