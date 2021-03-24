package kg.restoran.service.impl;

import kg.restoran.service.OrderService;
import kg.restoran.domain.Order;
import kg.restoran.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Order}.
 */
@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order save(Order order) {
        log.debug("Request to save Order : {}", order);
        return orderRepository.save(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> findAll() {
        log.debug("Request to get all Orders");
        return orderRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Order> findOne(Long id) {
        log.debug("Request to get Order : {}", id);
        return orderRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Order : {}", id);
        orderRepository.deleteById(id);
    }

    @Override
    public List<Order> findByUserIsCurrentUser() {
        return orderRepository.findByUserIsCurrentUser();
    }

    @Override
    public Optional<Order> findOneByUserIsCurrentUser(Long id) {
        return orderRepository.findOneByUserIsCurrentUser(id);
    }
}
