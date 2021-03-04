package kg.restoran.repository;

import kg.restoran.domain.Delivery;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Delivery entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
}
