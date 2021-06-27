/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.CheckInApi.modal;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Admin
 */
@Entity
@Table(name = "checkin")

public class Checkin implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "checkinTime")
    @Temporal(TemporalType.DATE)
    private Date checkinTime;
    @JoinColumn(name = "sitenerID", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Sitener sitener;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JoinColumn(name = "timekeepingID", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Timekeeping timekeeping;

    public Checkin() {
    }

    public Checkin(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getCheckinTime() {

        return checkinTime;
    }

    public void setCheckinTime(Date checkinTime) {

        this.checkinTime = checkinTime;
    }

    public Sitener getSitener() {

        return sitener;
    }

    public void setSitener(Sitener sitener) {
        this.sitener = sitener;
    }

    public Timekeeping getTimekeeping() {

        return timekeeping;
    }


    public void setTimekeeping(Timekeeping timekeeping) {
        this.timekeeping = timekeeping;
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
        if (!(object instanceof Checkin)) {
            return false;
        }
        Checkin other = (Checkin) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "db.Checkin[ id=" + id + " ]";
    }

}
