/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_quarkus;

import java.util.Objects;

/**
 *
 * @author root
 */

public class Temperatura {
    
    private String ciudad;
    private int minima;
    private int maxima;

    public Temperatura() {
        
    }

    public Temperatura(String ciudad, int minima, int maxima) {
        this.ciudad = ciudad;
        this.minima = minima;
        this.maxima = maxima;
    }

    public String getCiudad() {
        return ciudad;
    }

    public int getMinima() {
        return minima;
    }

    public int getMaxima() {
        return maxima;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public void setMinima(int minima) {
        this.minima = minima;
    }

    public void setMaxima(int maxima) {
        this.maxima = maxima;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 89 * hash + Objects.hashCode(this.ciudad);
        hash = 89 * hash + this.minima;
        hash = 89 * hash + this.maxima;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Temperatura other = (Temperatura) obj;
        if (this.minima != other.minima) {
            return false;
        }
        if (this.maxima != other.maxima) {
            return false;
        }
        return Objects.equals(this.ciudad, other.ciudad);
    }

    @Override
    public String toString() {
        return "Temperatura{" + "ciudad=" + ciudad + ", minima=" + minima + ", maxima=" + maxima + '}';
    }
    
    
    
}
