package kg.restoran.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * The Restoran entity.\n@author A true hipster
 */
@ApiModel(description = "The Restoran entity.\n@author A true hipster")
@Entity
@Table(name = "restoran")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Restoran implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * address
     */
    @ApiModelProperty(value = "address")
    @Column(name = "address")
    private String address;

    /**
     * name
     */
    @ApiModelProperty(value = "name")
    @Column(name = "name")
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public Restoran address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public Restoran name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Restoran)) {
            return false;
        }
        return id != null && id.equals(((Restoran) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Restoran{" +
            "id=" + getId() +
            ", address='" + getAddress() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
