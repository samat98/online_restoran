package kg.restoran.web.rest;

import kg.restoran.domain.Restoran;
import kg.restoran.service.RestoranService;
import kg.restoran.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link kg.restoran.domain.Restoran}.
 */
@RestController
@RequestMapping("/api")
public class RestoranResource {

    private final Logger log = LoggerFactory.getLogger(RestoranResource.class);

    private static final String ENTITY_NAME = "restoran";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RestoranService restoranService;

    public RestoranResource(RestoranService restoranService) {
        this.restoranService = restoranService;
    }

    /**
     * {@code POST  /restorans} : Create a new restoran.
     *
     * @param restoran the restoran to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new restoran, or with status {@code 400 (Bad Request)} if the restoran has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/restorans")
    public ResponseEntity<Restoran> createRestoran(@RequestBody Restoran restoran) throws URISyntaxException {
        log.debug("REST request to save Restoran : {}", restoran);
        if (restoran.getId() != null) {
            throw new BadRequestAlertException("A new restoran cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Restoran result = restoranService.save(restoran);
        return ResponseEntity.created(new URI("/api/restorans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /restorans} : Updates an existing restoran.
     *
     * @param restoran the restoran to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated restoran,
     * or with status {@code 400 (Bad Request)} if the restoran is not valid,
     * or with status {@code 500 (Internal Server Error)} if the restoran couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/restorans")
    public ResponseEntity<Restoran> updateRestoran(@RequestBody Restoran restoran) throws URISyntaxException {
        log.debug("REST request to update Restoran : {}", restoran);
        if (restoran.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Restoran result = restoranService.save(restoran);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, restoran.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /restorans} : get all the restorans.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of restorans in body.
     */
    @GetMapping("/restorans")
    public List<Restoran> getAllRestorans() {
        log.debug("REST request to get all Restorans");
        return restoranService.findAll();
    }

    /**
     * {@code GET  /restorans/:id} : get the "id" restoran.
     *
     * @param id the id of the restoran to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the restoran, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/restorans/{id}")
    public ResponseEntity<Restoran> getRestoran(@PathVariable Long id) {
        log.debug("REST request to get Restoran : {}", id);
        Optional<Restoran> restoran = restoranService.findOne(id);
        return ResponseUtil.wrapOrNotFound(restoran);
    }

    /**
     * {@code DELETE  /restorans/:id} : delete the "id" restoran.
     *
     * @param id the id of the restoran to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/restorans/{id}")
    public ResponseEntity<Void> deleteRestoran(@PathVariable Long id) {
        log.debug("REST request to delete Restoran : {}", id);
        restoranService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
