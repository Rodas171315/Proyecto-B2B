/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

/**
 * Clase repositorio para entidades de tipo Usuario.
 * Esta clase utiliza PanacheRepository para proporcionar operaciones CRUD simplificadas para la entidad Usuarios.
 * @see Usuarios
 */
@ApplicationScoped
public class UsuarioRepositorio implements PanacheRepository<Usuarios> {
    
}
