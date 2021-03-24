package kg.restoran.service.impl;

import kg.restoran.service.ManagerService;
import kg.restoran.domain.Manager;
import kg.restoran.repository.ManagerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Manager}.
 */
@Service
@Transactional
public class ManagerServiceImpl implements ManagerService {

    private final Logger log = LoggerFactory.getLogger(ManagerServiceImpl.class);

    private final ManagerRepository managerRepository;

    public ManagerServiceImpl(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    @Override
    public Manager save(Manager manager) {
        log.debug("Request to save Manager : {}", manager);
        return managerRepository.save(manager);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Manager> findAll() {
        log.debug("Request to get all Managers");
        return managerRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Manager> findOne(Long id) {
        log.debug("Request to get Manager : {}", id);
        return managerRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Manager : {}", id);
        managerRepository.deleteById(id);
    }
}
