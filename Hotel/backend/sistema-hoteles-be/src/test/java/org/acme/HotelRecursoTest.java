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
public class HotelRecursoTest {

    @TestHTTPResource("/hoteles")
    URI endpointUrl;

    @Test
    public void testHotelOperations() throws Exception {
        HttpClient client = HttpClient.newHttpClient();

        // Crear un nuevo hotel
        String newHotelJson = "{\"nombre\":\"Hotel Argentina\", \"ubicacion\":\"La Roja\"}";
        HttpRequest postRequest = HttpRequest.newBuilder()
            .uri(endpointUrl)
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(newHotelJson))
            .build();
        HttpResponse<String> postResponse = client.send(postRequest, BodyHandlers.ofString());
        assertEquals(200, postResponse.statusCode());

        // Obtener el hotel recién creado
        HttpRequest getRequest = HttpRequest.newBuilder()
            .uri(endpointUrl)
            .GET()
            .build();
        HttpResponse<String> getResponse = client.send(getRequest, BodyHandlers.ofString());
        assertEquals(200, getResponse.statusCode());
        assertTrue(getResponse.body().contains("Hotel Acme"));
        assertTrue(getResponse.body().contains("Ciudad Acme"));

        // Actualizar el hotel
        String updateHotelJson = "{\"nombre\":\"Hotel Renovado\", \"ubicacion\":\"Ciudad Nueva Acme\"}";
        URI hotelIdUri = URI.create(endpointUrl.toString() + "/1"); // Asumiendo que el ID del hotel es 1
        HttpRequest putRequest = HttpRequest.newBuilder()
            .uri(hotelIdUri)
            .header("Content-Type", "application/json")
            .PUT(HttpRequest.BodyPublishers.ofString(updateHotelJson))
            .build();
        HttpResponse<String> putResponse = client.send(putRequest, BodyHandlers.ofString());
        assertEquals(200, putResponse.statusCode());
        assertTrue(putResponse.body().contains("Hotel Renovado"));
        assertTrue(putResponse.body().contains("Ciudad Nueva Acme"));

        // Eliminar el hotel
        HttpRequest deleteRequest = HttpRequest.newBuilder()
            .uri(hotelIdUri)
            .DELETE()
            .build();
        HttpResponse<String> deleteResponse = client.send(deleteRequest, BodyHandlers.ofString());
        assertEquals(204, deleteResponse.statusCode());
    }
}
