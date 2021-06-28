package com.example.CheckInApi.repository;

import com.example.CheckInApi.modal.Checkin;
import com.example.CheckInApi.modal.Profile;
import com.example.CheckInApi.modal.Sitener;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface SitenerRepository extends JpaRepository<Sitener, Integer> {
    @Query("select a from Sitener a where a.profile.id=:id")
    Sitener findSitenerByProfileId(Integer id);
}
