package com.example.CheckInApi.repository;

import com.example.CheckInApi.modal.Timekeeping;
import org.springframework.data.jpa.repository.JpaRepository;



public interface TimeKeepingRepository extends JpaRepository<Timekeeping, Integer> {
}
