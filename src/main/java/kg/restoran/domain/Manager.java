package kg.restoran.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * The Manager entity.\n@author A true hipster
 */
@ApiModel(description = "The Manager entity.\n@author A true hipster")
@Entity
@Table(name = "manager")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Manager implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * number_tel
     */
    @NotNull
    @ApiModelProperty(value = "number_tel", required = true)
    @Column(name = "number_tel", nullable = false)
    private String numberTel;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToOne
    @JsonIgnoreProperties(value = "managers", allowSetters = true)
    private Restoran restoran;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumberTel() {
        return numberTel;
    }

    public Manager numberTel(String numberTel) {
        this.numberTel = numberTel;
        return this;
    }

    public void setNumberTel(String numberTel) {
        this.numberTel = numberTel;
    }

    public User getUser() {
        return user;
    }

    public Manager user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Restoran getRestoran() {
        return restoran;
    }

    public Manager restoran(Restoran restoran) {
        this.restoran = restoran;
        return this;
    }

    public void setRestoran(Restoran restoran) {
        this.restoran = restoran;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Manager)) {
            return false;
        }
        return id != null && id.equals(((Manager) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Manager{" +
            "id=" + getId() +
            ", numberTel='" + getNumberTel() + "'" +
            "}";
    }
}
