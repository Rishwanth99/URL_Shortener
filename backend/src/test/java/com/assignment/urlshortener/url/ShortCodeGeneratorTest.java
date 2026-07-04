package com.assignment.urlshortener.url;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ShortCodeGeneratorTest {
    @Test
    void generateReturnsUrlSafeSevenCharacterCode() {
        ShortCodeGenerator generator = new ShortCodeGenerator();

        String code = generator.generate();

        assertThat(code).matches("^[A-Za-z0-9]{7}$");
    }
}

