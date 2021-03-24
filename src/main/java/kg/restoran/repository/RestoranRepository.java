package kg.restoran.repository;

import kg.restoran.domain.Restoran;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Restoran entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestoranRepository extends JpaRepository<Restoran, Long> {
}
