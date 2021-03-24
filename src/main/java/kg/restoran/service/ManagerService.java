package kg.restoran.service;

import kg.restoran.domain.Manager;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Manager}.
 */
public interface ManagerService {

    /**
     * Save a manager.
     *
     * @param manager the entity to save.
     * @return the persisted entity.
     */
    Manager save(Manager manager);

    /**
     * Get all the managers.
     *
     * @return the list of entities.
     */
    List<Manager> findAll();


    /**
     * Get the "id" manager.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Manager> findOne(Long id);

    /**
     * Delete the "id" manager.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
