package pack_hotel;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDateTime;


@ApplicationScoped
public class RegistroBusquedaRepositorio implements PanacheRepository<RegistroBusqueda> {

    public void registrarBusqueda(String parametros, Long usuarioId, String tipoAcceso, boolean esAutenticado) {
        RegistroBusqueda registro = new RegistroBusqueda();
        registro.setParametrosBusqueda(parametros);
        registro.setUsuarioId(usuarioId);
        registro.setFechaHora(LocalDateTime.now());
        registro.setTipoAcceso(tipoAcceso);
        registro.setEsAutenticado(esAutenticado);
        this.persist(registro);
    }
    
    // Puedes agregar otros métodos útiles aquí, por ejemplo, para buscar registros, etc.
}
