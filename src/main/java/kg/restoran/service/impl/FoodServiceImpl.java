package kg.restoran.service.impl;

import kg.restoran.service.FoodService;
import kg.restoran.domain.Food;
import kg.restoran.repository.FoodRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Food}.
 */
@Service
@Transactional
public class FoodServiceImpl implements FoodService {

    private final Logger log = LoggerFactory.getLogger(FoodServiceImpl.class);

    private final FoodRepository foodRepository;

    public FoodServiceImpl(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Override
    public Food save(Food food) {
        log.debug("Request to save Food : {}", food);
        return foodRepository.save(food);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Food> findAll(Pageable pageable) {
        log.debug("Request to get all Foods");
        return foodRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Food> findOne(Long id) {
        log.debug("Request to get Food : {}", id);
        return foodRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Food : {}", id);
        foodRepository.deleteById(id);
    }
}
