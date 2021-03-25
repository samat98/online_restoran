package kg.restoran.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

import kg.restoran.domain.enumeration.Status;

/**
 * The Delivery entity.\n@author A true hipster
 */
@ApiModel(description = "The Delivery entity.\n@author A true hipster")
@Entity
@Table(name = "delivery")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Delivery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * departur_time
     */
    @ApiModelProperty(value = "departur_time")
    @Column(name = "departurtime")
    private LocalDate departurtime;

    /**
     * arrival_time
     */
    @ApiModelProperty(value = "arrival_time")
    @Column(name = "arrivaltime")
    private LocalDate arrivaltime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDeparturtime() {
        return departurtime;
    }

    public Delivery departurtime(LocalDate departurtime) {
        this.departurtime = departurtime;
        return this;
    }

    public void setDeparturtime(LocalDate departurtime) {
        this.departurtime = departurtime;
    }

    public LocalDate getArrivaltime() {
        return arrivaltime;
    }

    public Delivery arrivaltime(LocalDate arrivaltime) {
        this.arrivaltime = arrivaltime;
        return this;
    }

    public void setArrivaltime(LocalDate arrivaltime) {
        this.arrivaltime = arrivaltime;
    }

    public Status getStatus() {
        return status;
    }

    public Delivery status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Delivery)) {
            return false;
        }
        return id != null && id.equals(((Delivery) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Delivery{" +
            "id=" + getId() +
            ", departurtime='" + getDeparturtime() + "'" +
            ", arrivaltime='" + getArrivaltime() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
