package com.assignment.urlshortener.url;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class ShortCodeGenerator {
    private static final char[] ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();
    private static final int DEFAULT_LENGTH = 7;
    private final SecureRandom random = new SecureRandom();

    public String generate() {
        char[] result = new char[DEFAULT_LENGTH];
        for (int i = 0; i < DEFAULT_LENGTH; i++) {
            result[i] = ALPHABET[random.nextInt(ALPHABET.length)];
        }
        return new String(result);
    }
}

