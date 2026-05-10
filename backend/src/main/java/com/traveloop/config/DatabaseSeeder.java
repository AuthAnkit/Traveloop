package com.traveloop.config;

import com.traveloop.repository.CityRepository;
import com.traveloop.repository.PopularPlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final CityRepository cityRepository;
    private final PopularPlaceRepository popularPlaceRepository;
    private final DataSource dataSource;

    @Override
    public void run(String... args) throws Exception {
        if (cityRepository.count() == 0 || popularPlaceRepository.count() == 0) {
            log.info("Database is empty or missing popular places. Running seed scripts...");
            try {
                ResourceDatabasePopulator populator = new ResourceDatabasePopulator(
                        new ClassPathResource("india_seed.sql"),
                        new ClassPathResource("popular_places_seed.sql")
                );
                populator.execute(dataSource);
                log.info("Database seeding completed successfully.");
            } catch (Exception e) {
                log.error("Failed to seed database: {}", e.getMessage());
            }
        } else {
            log.info("Database already contains data. Skipping seeding.");
        }
    }
}
