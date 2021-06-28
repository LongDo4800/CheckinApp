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
    @Column(name = "team")
    private String team;
    @Column(name = "avatar")
    private String avatar;


    @JoinColumn(name = "profileID", referencedColumnName = "id")
    @OneToOne(optional = false)
    private Profile profile;


    public Sitener() {
    }

    public Sitener(Integer id, String name, Date birthday, String team, String avatar){
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.team = team;
        this.avatar = avatar;
        this.profile=null;
    }

    public Sitener(Integer id) {
        this.id = id;
    }

    public Sitener(Integer id, String name, Date birthday, String team) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
        this.team = team;
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

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
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
