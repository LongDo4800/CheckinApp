/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.CheckInApi.modal;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Admin
 */
@Entity
@Table(name = "sitener")

public class Sitener implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @Column(name = "name")
    private String name;
    @Basic(optional = false)
    @Column(name = "birthday")
    @Temporal(TemporalType.DATE)
    private Date  birthday;
    @Basic(optional = false)
    @Column(name = "classID")
    private String classID;
    @Column(name = "email")
    private String email;
    @Column(name = "address")
    private String address;
    @Column(name = "phoneNo")
    private String phoneNo;
    @Column(name = "avatar")
    private String avatar;


    @JoinColumn(name = "profileID", referencedColumnName = "id")
    @OneToOne(optional = false)
    private Profile profile;


    public Sitener() {
    }

    public Sitener(Integer id, String name, Date birthday, String classID,String email,String address,String phoneNo, String avatar){
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.classID = classID;
        this.email = email;
        this.address = address;
        this.phoneNo = phoneNo;
        this.avatar = avatar;
        this.profile=null;
    }

    public Sitener(Integer id) {
        this.id = id;
    }

    public Sitener(Integer id, String name, Date birthday, String classID) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.classID = classID;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getClassID() {
        return classID;
    }

    public void setClassID(String classID) {
        this.classID = classID;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public String getAddress(){
        return address;
    }
    public void setAddress(String address){
        this.address = address;
    }
    public String getPhoneNo(){
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }




    public Profile getProfile() {

        return profile;
    }

    public void setProfile(Profile profileID) {
        this.profile = profileID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Sitener)) {
            return false;
        }
        Sitener other = (Sitener) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "db.Sitener[ id=" + id + " ]";
    }
    
}
