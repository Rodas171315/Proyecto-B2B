/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_quarkus;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author root
 */

@ApplicationScoped
public class TemperaturasService implements ITemperaturaService {
    
    private List<Temperatura> valores = new ArrayList<>();
    
    @Override
    public void addTemperatura(Temperatura t){
        valores.add(t);
    }
    
    @Override
    public List<Temperatura> obtenerTemperaturas(){
        return Collections.unmodifiableList(valores);
    }
    
    @Override
    public boolean isEmpty(){
        return valores.isEmpty();
    }
    
    @Override
    public int maxima() {
        return valores.stream().mapToInt(Temperatura::getMaxima).max().getAsInt();
    }

    @Override
    public Optional<Temperatura> sacarTemperatura(String ciudad) {
        return valores.stream()
                .filter(t -> t.getCiudad().equals(ciudad))
                .findAny();
    }
    
}
