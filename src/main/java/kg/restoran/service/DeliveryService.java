package kg.restoran.service;

import kg.restoran.domain.Delivery;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Delivery}.
 */
public interface DeliveryService {

    /**
     * Save a delivery.
     *
     * @param delivery the entity to save.
     * @return the persisted entity.
     */
    Delivery save(Delivery delivery);

    /**
     * Get all the deliveries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Delivery> findAll(Pageable pageable);


    /**
     * Get the "id" delivery.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Delivery> findOne(Long id);

    /**
     * Delete the "id" delivery.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
