package com.assignment.urlshortener.common.exception;

public class AliasAlreadyExistsException extends RuntimeException {
    public AliasAlreadyExistsException(String alias) {
        super("Short code or alias already exists: " + alias);
    }
}

