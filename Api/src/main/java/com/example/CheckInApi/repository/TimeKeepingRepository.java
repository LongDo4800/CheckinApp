package com.example.CheckInApi.repository;

import com.example.CheckInApi.modal.Checkin;
import com.example.CheckInApi.modal.Timekeeping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;


public interface TimeKeepingRepository extends JpaRepository<Timekeeping, Integer> {


}
