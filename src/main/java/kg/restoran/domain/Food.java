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
 * The Food entity.\n@author A true hipster
 */
@ApiModel(description = "The Food entity.\n@author A true hipster")
@Entity
@Table(name = "food")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Food implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * name
     */
    @NotNull
    @ApiModelProperty(value = "name", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    /**
     * image of Food
     */
    @ApiModelProperty(value = "image of Food")
    @Lob
    @Column(name = "img")
    private byte[] img;

    @Column(name = "img_content_type")
    private String imgContentType;

    @Size(max = 250)
    @Column(name = "description", length = 250)
    private String description;

    @ManyToOne
    @JsonIgnoreProperties(value = "foods", allowSetters = true)
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties(value = "foods", allowSetters = true)
    private Menu menu;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Food name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public Food price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public byte[] getImg() {
        return img;
    }

    public Food img(byte[] img) {
        this.img = img;
        return this;
    }

    public void setImg(byte[] img) {
        this.img = img;
    }

    public String getImgContentType() {
        return imgContentType;
    }

    public Food imgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
        return this;
    }

    public void setImgContentType(String imgContentType) {
        this.imgContentType = imgContentType;
    }

    public String getDescription() {
        return description;
    }

    public Food description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public Food category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Menu getMenu() {
        return menu;
    }

    public Food menu(Menu menu) {
        this.menu = menu;
        return this;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Food)) {
            return false;
        }
        return id != null && id.equals(((Food) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Food{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", img='" + getImg() + "'" +
            ", imgContentType='" + getImgContentType() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
