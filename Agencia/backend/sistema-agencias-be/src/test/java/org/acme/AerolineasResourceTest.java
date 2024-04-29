package org.acme;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.common.http.TestHTTPResource;
import org.junit.jupiter.api.Test;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
public class AerolineasResourceTest {

    @TestHTTPResource("/aerolineas")
    URI endpointUrl;

    @Test
    public void testAerolineasOperations() throws Exception {
        HttpClient client = HttpClient.newHttpClient();

        String newAerolineaJson = "{\"nombre\":\"Quarkus Airways\", \"descripcion\":\"Fast and efficient.\"}";
        HttpRequest postRequest = HttpRequest.newBuilder()
            .uri(endpointUrl)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(newAerolineaJson))
            .build();
        HttpResponse<String> postResponse = client.send(postRequest, BodyHandlers.ofString());
        assertEquals(200, postResponse.statusCode());  


        
        HttpRequest getRequest = HttpRequest.newBuilder()
                .uri(endpointUrl) 
                .GET()
                .build();
        HttpResponse<String> getResponse = client.send(getRequest, BodyHandlers.ofString());
        assertEquals(200, getResponse.statusCode());
        assertTrue(getResponse.body().contains("Quarkus Airways"));

        
        assertTrue(getResponse.body().contains("descripcion"));
        assertTrue(getResponse.body().contains("Fast and efficient."));
    }
}



