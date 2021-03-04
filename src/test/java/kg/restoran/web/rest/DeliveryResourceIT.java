package kg.restoran.web.rest;

import kg.restoran.OnlineRestoranApp;
import kg.restoran.domain.Delivery;
import kg.restoran.repository.DeliveryRepository;
import kg.restoran.service.DeliveryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import kg.restoran.domain.enumeration.Status;
/**
 * Integration tests for the {@link DeliveryResource} REST controller.
 */
@SpringBootTest(classes = OnlineRestoranApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DeliveryResourceIT {

    private static final LocalDate DEFAULT_DEPARTURTIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DEPARTURTIME = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_ARRIVALTIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ARRIVALTIME = LocalDate.now(ZoneId.systemDefault());

    private static final Status DEFAULT_STATUS = Status.Preparing;
    private static final Status UPDATED_STATUS = Status.Onroad;

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private DeliveryService deliveryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDeliveryMockMvc;

    private Delivery delivery;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Delivery createEntity(EntityManager em) {
        Delivery delivery = new Delivery()
            .departurtime(DEFAULT_DEPARTURTIME)
            .arrivaltime(DEFAULT_ARRIVALTIME)
            .status(DEFAULT_STATUS);
        return delivery;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Delivery createUpdatedEntity(EntityManager em) {
        Delivery delivery = new Delivery()
            .departurtime(UPDATED_DEPARTURTIME)
            .arrivaltime(UPDATED_ARRIVALTIME)
            .status(UPDATED_STATUS);
        return delivery;
    }

    @BeforeEach
    public void initTest() {
        delivery = createEntity(em);
    }

    @Test
    @Transactional
    public void createDelivery() throws Exception {
        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();
        // Create the Delivery
        restDeliveryMockMvc.perform(post("/api/deliveries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isCreated());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate + 1);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getDeparturtime()).isEqualTo(DEFAULT_DEPARTURTIME);
        assertThat(testDelivery.getArrivaltime()).isEqualTo(DEFAULT_ARRIVALTIME);
        assertThat(testDelivery.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createDeliveryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryRepository.findAll().size();

        // Create the Delivery with an existing ID
        delivery.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryMockMvc.perform(post("/api/deliveries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDeliveries() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        // Get all the deliveryList
        restDeliveryMockMvc.perform(get("/api/deliveries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(delivery.getId().intValue())))
            .andExpect(jsonPath("$.[*].departurtime").value(hasItem(DEFAULT_DEPARTURTIME.toString())))
            .andExpect(jsonPath("$.[*].arrivaltime").value(hasItem(DEFAULT_ARRIVALTIME.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getDelivery() throws Exception {
        // Initialize the database
        deliveryRepository.saveAndFlush(delivery);

        // Get the delivery
        restDeliveryMockMvc.perform(get("/api/deliveries/{id}", delivery.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(delivery.getId().intValue()))
            .andExpect(jsonPath("$.departurtime").value(DEFAULT_DEPARTURTIME.toString()))
            .andExpect(jsonPath("$.arrivaltime").value(DEFAULT_ARRIVALTIME.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDelivery() throws Exception {
        // Get the delivery
        restDeliveryMockMvc.perform(get("/api/deliveries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDelivery() throws Exception {
        // Initialize the database
        deliveryService.save(delivery);

        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // Update the delivery
        Delivery updatedDelivery = deliveryRepository.findById(delivery.getId()).get();
        // Disconnect from session so that the updates on updatedDelivery are not directly saved in db
        em.detach(updatedDelivery);
        updatedDelivery
            .departurtime(UPDATED_DEPARTURTIME)
            .arrivaltime(UPDATED_ARRIVALTIME)
            .status(UPDATED_STATUS);

        restDeliveryMockMvc.perform(put("/api/deliveries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDelivery)))
            .andExpect(status().isOk());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
        Delivery testDelivery = deliveryList.get(deliveryList.size() - 1);
        assertThat(testDelivery.getDeparturtime()).isEqualTo(UPDATED_DEPARTURTIME);
        assertThat(testDelivery.getArrivaltime()).isEqualTo(UPDATED_ARRIVALTIME);
        assertThat(testDelivery.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingDelivery() throws Exception {
        int databaseSizeBeforeUpdate = deliveryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryMockMvc.perform(put("/api/deliveries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(delivery)))
            .andExpect(status().isBadRequest());

        // Validate the Delivery in the database
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDelivery() throws Exception {
        // Initialize the database
        deliveryService.save(delivery);

        int databaseSizeBeforeDelete = deliveryRepository.findAll().size();

        // Delete the delivery
        restDeliveryMockMvc.perform(delete("/api/deliveries/{id}", delivery.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Delivery> deliveryList = deliveryRepository.findAll();
        assertThat(deliveryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
