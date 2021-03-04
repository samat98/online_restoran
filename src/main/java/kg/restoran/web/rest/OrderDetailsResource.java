package kg.restoran.web.rest;

import kg.restoran.domain.OrderDetails;
import kg.restoran.service.OrderDetailsService;
import kg.restoran.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link kg.restoran.domain.OrderDetails}.
 */
@RestController
@RequestMapping("/api")
public class OrderDetailsResource {

    private final Logger log = LoggerFactory.getLogger(OrderDetailsResource.class);

    private static final String ENTITY_NAME = "orderDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrderDetailsService orderDetailsService;

    public OrderDetailsResource(OrderDetailsService orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }

    /**
     * {@code POST  /order-details} : Create a new orderDetails.
     *
     * @param orderDetails the orderDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orderDetails, or with status {@code 400 (Bad Request)} if the orderDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/order-details")
    public ResponseEntity<OrderDetails> createOrderDetails(@RequestBody OrderDetails orderDetails) throws URISyntaxException {
        log.debug("REST request to save OrderDetails : {}", orderDetails);
        if (orderDetails.getId() != null) {
            throw new BadRequestAlertException("A new orderDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderDetails result = orderDetailsService.save(orderDetails);
        return ResponseEntity.created(new URI("/api/order-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /order-details} : Updates an existing orderDetails.
     *
     * @param orderDetails the orderDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orderDetails,
     * or with status {@code 400 (Bad Request)} if the orderDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orderDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/order-details")
    public ResponseEntity<OrderDetails> updateOrderDetails(@RequestBody OrderDetails orderDetails) throws URISyntaxException {
        log.debug("REST request to update OrderDetails : {}", orderDetails);
        if (orderDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderDetails result = orderDetailsService.save(orderDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orderDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /order-details} : get all the orderDetails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderDetails in body.
     */
    @GetMapping("/order-details")
    public List<OrderDetails> getAllOrderDetails() {
        log.debug("REST request to get all OrderDetails");
        return orderDetailsService.findAll();
    }

    /**
     * {@code GET  /order-details/:id} : get the "id" orderDetails.
     *
     * @param id the id of the orderDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orderDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/order-details/{id}")
    public ResponseEntity<OrderDetails> getOrderDetails(@PathVariable Long id) {
        log.debug("REST request to get OrderDetails : {}", id);
        Optional<OrderDetails> orderDetails = orderDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(orderDetails);
    }

    /**
     * {@code DELETE  /order-details/:id} : delete the "id" orderDetails.
     *
     * @param id the id of the orderDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/order-details/{id}")
    public ResponseEntity<Void> deleteOrderDetails(@PathVariable Long id) {
        log.debug("REST request to delete OrderDetails : {}", id);
        orderDetailsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
