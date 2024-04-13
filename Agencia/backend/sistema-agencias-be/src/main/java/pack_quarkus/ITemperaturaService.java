/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package pack_quarkus;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author root
 */

public interface ITemperaturaService {
    
    void addTemperatura(Temperatura t);
    
    List<Temperatura> obtenerTemperaturas();
    
    Optional<Temperatura> sacarTemperatura(String ciudad);
    
    boolean isEmpty();
    
    int maxima();
    
}
