package com.example.CheckInApi.repository;

import com.example.CheckInApi.modal.Checkin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface CheckinRepository extends JpaRepository<Checkin, Integer> {
    @Query("delete from Checkin a where a.sitener.id=?1")
    @Transactional
    @Modifying
    int deleteBySitenerId(int sitenerID);

    @Query("select a from Checkin a where a.sitener.id=?1")
    Checkin findBySitenerID(int sitenerID);

    @Query("delete from Checkin a where a.timekeeping.id=?1")
    @Transactional
    @Modifying
    int deleteByTimekeepingId(int timekeepingID);

    @Query("select a from Checkin a where a.timekeeping.id=?1")
    List<Checkin> findByTimekeepingID(int timekeepingID);


    @Query("select a from Checkin a Where a.timekeeping.id  in ?1 and a.sitener.id=?2")
    List<Checkin> getCheckinFromTo(List<Integer> SitenerIds, Integer sitenerId);
}