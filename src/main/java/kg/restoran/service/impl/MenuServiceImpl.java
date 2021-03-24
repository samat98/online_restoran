package kg.restoran.service.impl;

import kg.restoran.service.MenuService;
import kg.restoran.domain.Menu;
import kg.restoran.repository.MenuRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Menu}.
 */
@Service
@Transactional
public class MenuServiceImpl implements MenuService {

    private final Logger log = LoggerFactory.getLogger(MenuServiceImpl.class);

    private final MenuRepository menuRepository;

    public MenuServiceImpl(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    @Override
    public Menu save(Menu menu) {
        log.debug("Request to save Menu : {}", menu);
        return menuRepository.save(menu);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Menu> findAll() {
        log.debug("Request to get all Menus");
        return menuRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Menu> findOne(Long id) {
        log.debug("Request to get Menu : {}", id);
        return menuRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Menu : {}", id);
        menuRepository.deleteById(id);
    }
}
