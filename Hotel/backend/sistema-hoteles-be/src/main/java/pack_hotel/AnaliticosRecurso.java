package pack_hotel;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Recurso para obtener análisis y registros de búsqueda.
 * Proporciona endpoints para acceder y filtrar registros de búsqueda según diferentes criterios.
 */
@Path("/analiticos")
@Produces(MediaType.APPLICATION_JSON)
public class AnaliticosRecurso {

    @Inject
    private RegistroBusquedaRepositorio registroBusquedaRepositorio;

    /**
     * Obtiene todos los registros de búsqueda.
     * 
     * @return una respuesta con la lista de todos los registros de búsqueda.
     */
    @GET
    @Path("/registros")
    public Response obtenerTodosLosRegistros() {
        List<RegistroBusqueda> registros = registroBusquedaRepositorio.obtenerTodosLosRegistros();
        return Response.ok(registros).build();
    }

    /**
     * Obtiene registros de búsqueda filtrados según los parámetros proporcionados.
     * 
     * @param fechaDesde la fecha de inicio del periodo de búsqueda.
     * @param fechaHasta la fecha de fin del periodo de búsqueda.
     * @param tipoAcceso el tipo de acceso utilizado en las búsquedas.
     * @param esAutenticado indica si la búsqueda fue realizada por un usuario autenticado.
     * @return una respuesta con los registros de búsqueda filtrados.
     */
    @GET
    @Path("/filtrar")
    public Response obtenerBusquedasFiltradas(
        @QueryParam("fechaDesde") String fechaDesde,
        @QueryParam("fechaHasta") String fechaHasta,
        @QueryParam("tipoAcceso") String tipoAcceso,
        @QueryParam("esAutenticado") Boolean esAutenticado) {

        List<RegistroBusqueda> resultados = registroBusquedaRepositorio.filtrarBusquedas(fechaDesde, fechaHasta, tipoAcceso, esAutenticado);
        return Response.ok(resultados).build();
    }

    /**
     * Cuenta las búsquedas realizadas por país.
     * 
     * @return una respuesta con un mapa de países y su correspondiente cantidad de búsquedas.
     */
    @GET
    @Path("/registros/paises")
    public Response contarBusquedasPorPais() {
        Map<String, Long> busquedasPorPais = registroBusquedaRepositorio.contarBusquedasPorPais();
        return Response.ok(busquedasPorPais).build();
    }

    /**
     * Obtiene la evolución diaria de las búsquedas.
     * 
     * @return una respuesta con un mapa de fechas y la cantidad de búsquedas en cada fecha.
     */
    @GET
    @Path("/registros/evolucion")
    public Response evolucionBusquedas() {
        Map<LocalDate, Long> evolucion = registroBusquedaRepositorio.evolucionBusquedas();
        return Response.ok(evolucion).build();
    }

    /**
     * Obtiene la cantidad de búsquedas agrupadas por tipo de acceso.
     * 
     * @return una respuesta con un mapa del tipo de acceso y la cantidad de búsquedas para cada uno.
     */
    @GET
    @Path("/registros/tipoacceso")
    public Response getTipoAcceso() {
        Map<String, Long> tipoAcceso = registroBusquedaRepositorio.contarPorTipoAcceso();
        return Response.ok(tipoAcceso).build();
    }
}




