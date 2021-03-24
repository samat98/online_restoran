package kg.restoran.service.impl;

import kg.restoran.service.RestoranService;
import kg.restoran.domain.Restoran;
import kg.restoran.repository.RestoranRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Restoran}.
 */
@Service
@Transactional
public class RestoranServiceImpl implements RestoranService {

    private final Logger log = LoggerFactory.getLogger(RestoranServiceImpl.class);

    private final RestoranRepository restoranRepository;

    public RestoranServiceImpl(RestoranRepository restoranRepository) {
        this.restoranRepository = restoranRepository;
    }

    @Override
    public Restoran save(Restoran restoran) {
        log.debug("Request to save Restoran : {}", restoran);
        return restoranRepository.save(restoran);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Restoran> findAll() {
        log.debug("Request to get all Restorans");
        return restoranRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Restoran> findOne(Long id) {
        log.debug("Request to get Restoran : {}", id);
        return restoranRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Restoran : {}", id);
        restoranRepository.deleteById(id);
    }
}
