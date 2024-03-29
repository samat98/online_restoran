package kg.restoran;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    // салам алейкум тест
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("kg.restoran");

        noClasses()
            .that()
                .resideInAnyPackage("kg.restoran.service..")
            .or()
                .resideInAnyPackage("kg.restoran.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..kg.restoran.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
