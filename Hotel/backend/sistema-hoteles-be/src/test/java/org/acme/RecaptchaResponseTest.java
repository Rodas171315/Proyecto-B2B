package org.acme;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RecaptchaResponseTest {

    private RecaptchaResponse recaptchaResponse;

    @BeforeEach
    public void setUp() {
        recaptchaResponse = new RecaptchaResponse();
    }

    @Test
    public void testSetAndGetSuccess() {
        recaptchaResponse.setSuccess(true);
        Assertions.assertTrue(recaptchaResponse.isSuccess());
        recaptchaResponse.setSuccess(false);
        Assertions.assertFalse(recaptchaResponse.isSuccess());
    }

    @Test
    public void testSetAndGetChallenge_ts() {
        String challenge_ts = "2023-04-01T12:34:56Z";
        recaptchaResponse.setChallenge_ts(challenge_ts);
        Assertions.assertEquals(challenge_ts, recaptchaResponse.getChallenge_ts());
    }

    @Test
    public void testSetAndGetHostname() {
        String hostname = "example.com";
        recaptchaResponse.setHostname(hostname);
        Assertions.assertEquals(hostname, recaptchaResponse.getHostname());
    }

    @Test
    public void testSetAndGetErrorCodes() {
        String[] errorCodes = new String[]{"missing-input-secret", "invalid-input-secret"};
        recaptchaResponse.setErrorCodes(errorCodes);
        Assertions.assertArrayEquals(errorCodes, recaptchaResponse.getErrorCodes());
    }
}
