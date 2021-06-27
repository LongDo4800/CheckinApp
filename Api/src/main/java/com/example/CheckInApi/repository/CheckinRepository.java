package com.example.CheckInApi.repository;

import com.example.CheckInApi.modal.Checkin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
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
    Checkin findByTimekeepingID(int timekeepingID);


}