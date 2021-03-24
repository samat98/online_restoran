package kg.restoran.web.rest;

import kg.restoran.domain.Manager;
import kg.restoran.service.ManagerService;
import kg.restoran.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link kg.restoran.domain.Manager}.
 */
@RestController
@RequestMapping("/api")
public class ManagerResource {

    private final Logger log = LoggerFactory.getLogger(ManagerResource.class);

    private static final String ENTITY_NAME = "manager";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ManagerService managerService;

    public ManagerResource(ManagerService managerService) {
        this.managerService = managerService;
    }

    /**
     * {@code POST  /managers} : Create a new manager.
     *
     * @param manager the manager to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new manager, or with status {@code 400 (Bad Request)} if the manager has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/managers")
    public ResponseEntity<Manager> createManager(@Valid @RequestBody Manager manager) throws URISyntaxException {
        log.debug("REST request to save Manager : {}", manager);
        if (manager.getId() != null) {
            throw new BadRequestAlertException("A new manager cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Manager result = managerService.save(manager);
        return ResponseEntity.created(new URI("/api/managers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /managers} : Updates an existing manager.
     *
     * @param manager the manager to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated manager,
     * or with status {@code 400 (Bad Request)} if the manager is not valid,
     * or with status {@code 500 (Internal Server Error)} if the manager couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/managers")
    public ResponseEntity<Manager> updateManager(@Valid @RequestBody Manager manager) throws URISyntaxException {
        log.debug("REST request to update Manager : {}", manager);
        if (manager.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Manager result = managerService.save(manager);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, manager.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /managers} : get all the managers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of managers in body.
     */
    @GetMapping("/managers")
    public List<Manager> getAllManagers() {
        log.debug("REST request to get all Managers");
        return managerService.findAll();
    }

    /**
     * {@code GET  /managers/:id} : get the "id" manager.
     *
     * @param id the id of the manager to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the manager, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/managers/{id}")
    public ResponseEntity<Manager> getManager(@PathVariable Long id) {
        log.debug("REST request to get Manager : {}", id);
        Optional<Manager> manager = managerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(manager);
    }

    /**
     * {@code DELETE  /managers/:id} : delete the "id" manager.
     *
     * @param id the id of the manager to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/managers/{id}")
    public ResponseEntity<Void> deleteManager(@PathVariable Long id) {
        log.debug("REST request to delete Manager : {}", id);
        managerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
