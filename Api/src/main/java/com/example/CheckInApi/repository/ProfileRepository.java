package com.example.CheckInApi.repository;

import com.example.CheckInApi.modal.Checkin;
import com.example.CheckInApi.modal.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;
// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    @Query("select a.username from Profile a")
    ArrayList findUsernames();

    @Query("select a from Profile a where a.username =:username")
    Profile findUsername(String username);

    @Query("select a.id from Profile a where a.username =:username and a.password =:password")
    ArrayList getProfileByUserNamePassword(String username, String password);

    @Query("select a.password from Profile a where a.id =:id")
    String findPassById(Integer id);
}