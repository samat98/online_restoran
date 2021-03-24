package kg.restoran.repository;

import kg.restoran.domain.Order;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select order from Order order where order.user.login = ?#{principal.username}")
    List<Order> findByUserIsCurrentUser();

    @Query("select order from Order order where order.user.login = ?#{principal.username} AND order.id = ?1")
    Optional<Order> findOneByUserIsCurrentUser(Long id);
}
