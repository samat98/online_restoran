package kg.restoran.service.impl;

import kg.restoran.service.OrderDetailsService;
import kg.restoran.domain.OrderDetails;
import kg.restoran.repository.OrderDetailsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link OrderDetails}.
 */
@Service
@Transactional
public class OrderDetailsServiceImpl implements OrderDetailsService {

    private final Logger log = LoggerFactory.getLogger(OrderDetailsServiceImpl.class);

    private final OrderDetailsRepository orderDetailsRepository;

    public OrderDetailsServiceImpl(OrderDetailsRepository orderDetailsRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
    }

    @Override
    public OrderDetails save(OrderDetails orderDetails) {
        log.debug("Request to save OrderDetails : {}", orderDetails);
        return orderDetailsRepository.save(orderDetails);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDetails> findAll() {
        log.debug("Request to get all OrderDetails");
        return orderDetailsRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<OrderDetails> findOne(Long id) {
        log.debug("Request to get OrderDetails : {}", id);
        return orderDetailsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderDetails : {}", id);
        orderDetailsRepository.deleteById(id);
    }
}
