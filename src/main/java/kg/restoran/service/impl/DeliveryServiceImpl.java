package kg.restoran.service.impl;

import kg.restoran.service.DeliveryService;
import kg.restoran.domain.Delivery;
import kg.restoran.repository.DeliveryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Delivery}.
 */
@Service
@Transactional
public class DeliveryServiceImpl implements DeliveryService {

    private final Logger log = LoggerFactory.getLogger(DeliveryServiceImpl.class);

    private final DeliveryRepository deliveryRepository;

    public DeliveryServiceImpl(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    @Override
    public Delivery save(Delivery delivery) {
        log.debug("Request to save Delivery : {}", delivery);
        return deliveryRepository.save(delivery);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Delivery> findAll(Pageable pageable) {
        log.debug("Request to get all Deliveries");
        return deliveryRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Delivery> findOne(Long id) {
        log.debug("Request to get Delivery : {}", id);
        return deliveryRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Delivery : {}", id);
        deliveryRepository.deleteById(id);
    }
}
