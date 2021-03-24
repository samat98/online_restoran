package kg.restoran.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import kg.restoran.web.rest.TestUtil;

public class RestoranTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Restoran.class);
        Restoran restoran1 = new Restoran();
        restoran1.setId(1L);
        Restoran restoran2 = new Restoran();
        restoran2.setId(restoran1.getId());
        assertThat(restoran1).isEqualTo(restoran2);
        restoran2.setId(2L);
        assertThat(restoran1).isNotEqualTo(restoran2);
        restoran1.setId(null);
        assertThat(restoran1).isNotEqualTo(restoran2);
    }
}
