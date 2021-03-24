package kg.restoran.service;

import kg.restoran.domain.Restoran;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Restoran}.
 */
public interface RestoranService {

    /**
     * Save a restoran.
     *
     * @param restoran the entity to save.
     * @return the persisted entity.
     */
    Restoran save(Restoran restoran);

    /**
     * Get all the restorans.
     *
     * @return the list of entities.
     */
    List<Restoran> findAll();


    /**
     * Get the "id" restoran.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Restoran> findOne(Long id);

    /**
     * Delete the "id" restoran.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
