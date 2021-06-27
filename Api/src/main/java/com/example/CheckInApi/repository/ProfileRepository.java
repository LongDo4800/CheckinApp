package com.example.CheckInApi.repository;

import com.example.CheckInApi.modal.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ProfileRepository extends JpaRepository<Profile, Integer> {

}