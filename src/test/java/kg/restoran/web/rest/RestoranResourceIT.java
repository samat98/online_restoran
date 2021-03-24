package kg.restoran.web.rest;

import kg.restoran.OnlineRestoranApp;
import kg.restoran.domain.Restoran;
import kg.restoran.repository.RestoranRepository;
import kg.restoran.service.RestoranService;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RestoranResource} REST controller.
 */
@SpringBootTest(classes = OnlineRestoranApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RestoranResourceIT {

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private RestoranRepository restoranRepository;

    @Autowired
    private RestoranService restoranService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRestoranMockMvc;

    private Restoran restoran;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Restoran createEntity(EntityManager em) {
        Restoran restoran = new Restoran()
            .address(DEFAULT_ADDRESS)
            .name(DEFAULT_NAME);
        return restoran;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Restoran createUpdatedEntity(EntityManager em) {
        Restoran restoran = new Restoran()
            .address(UPDATED_ADDRESS)
            .name(UPDATED_NAME);
        return restoran;
    }

    @BeforeEach
    public void initTest() {
        restoran = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestoran() throws Exception {
        int databaseSizeBeforeCreate = restoranRepository.findAll().size();
        // Create the Restoran
        restRestoranMockMvc.perform(post("/api/restorans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(restoran)))
            .andExpect(status().isCreated());

        // Validate the Restoran in the database
        List<Restoran> restoranList = restoranRepository.findAll();
        assertThat(restoranList).hasSize(databaseSizeBeforeCreate + 1);
        Restoran testRestoran = restoranList.get(restoranList.size() - 1);
        assertThat(testRestoran.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testRestoran.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createRestoranWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restoranRepository.findAll().size();

        // Create the Restoran with an existing ID
        restoran.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestoranMockMvc.perform(post("/api/restorans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(restoran)))
            .andExpect(status().isBadRequest());

        // Validate the Restoran in the database
        List<Restoran> restoranList = restoranRepository.findAll();
        assertThat(restoranList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRestorans() throws Exception {
        // Initialize the database
        restoranRepository.saveAndFlush(restoran);

        // Get all the restoranList
        restRestoranMockMvc.perform(get("/api/restorans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restoran.getId().intValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getRestoran() throws Exception {
        // Initialize the database
        restoranRepository.saveAndFlush(restoran);

        // Get the restoran
        restRestoranMockMvc.perform(get("/api/restorans/{id}", restoran.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(restoran.getId().intValue()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingRestoran() throws Exception {
        // Get the restoran
        restRestoranMockMvc.perform(get("/api/restorans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestoran() throws Exception {
        // Initialize the database
        restoranService.save(restoran);

        int databaseSizeBeforeUpdate = restoranRepository.findAll().size();

        // Update the restoran
        Restoran updatedRestoran = restoranRepository.findById(restoran.getId()).get();
        // Disconnect from session so that the updates on updatedRestoran are not directly saved in db
        em.detach(updatedRestoran);
        updatedRestoran
            .address(UPDATED_ADDRESS)
            .name(UPDATED_NAME);

        restRestoranMockMvc.perform(put("/api/restorans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRestoran)))
            .andExpect(status().isOk());

        // Validate the Restoran in the database
        List<Restoran> restoranList = restoranRepository.findAll();
        assertThat(restoranList).hasSize(databaseSizeBeforeUpdate);
        Restoran testRestoran = restoranList.get(restoranList.size() - 1);
        assertThat(testRestoran.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testRestoran.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingRestoran() throws Exception {
        int databaseSizeBeforeUpdate = restoranRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRestoranMockMvc.perform(put("/api/restorans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(restoran)))
            .andExpect(status().isBadRequest());

        // Validate the Restoran in the database
        List<Restoran> restoranList = restoranRepository.findAll();
        assertThat(restoranList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRestoran() throws Exception {
        // Initialize the database
        restoranService.save(restoran);

        int databaseSizeBeforeDelete = restoranRepository.findAll().size();

        // Delete the restoran
        restRestoranMockMvc.perform(delete("/api/restorans/{id}", restoran.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Restoran> restoranList = restoranRepository.findAll();
        assertThat(restoranList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
