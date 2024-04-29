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




@Path("/analiticos")
@Produces(MediaType.APPLICATION_JSON)
public class AnaliticosRecurso {

    @Inject
    private RegistroBusquedaRepositorio registroBusquedaRepositorio;


    @GET
    @Path("/registros")
    public Response obtenerTodosLosRegistros() {
        List<RegistroBusqueda> registros = registroBusquedaRepositorio.obtenerTodosLosRegistros();
        return Response.ok(registros).build();
    }


    
    @GET
    @Path("/filtrar")
    public Response obtenerBusquedasFiltradas(
        @QueryParam("fechaDesde") String fechaDesde,
        @QueryParam("fechaHasta") String fechaHasta,
        @QueryParam("tipoAcceso") String tipoAcceso,
        @QueryParam("esAutenticado") Boolean esAutenticado) {
    
        List<RegistroBusqueda> resultados = registroBusquedaRepositorio.filtrarBusquedas(fechaDesde, fechaHasta, tipoAcceso, esAutenticado); // Pass the new parameter
        return Response.ok(resultados).build();
    }

    @GET
    @Path("/registros/paises")
    public Response contarBusquedasPorPais() {
        Map<String, Long> busquedasPorPais = registroBusquedaRepositorio.contarBusquedasPorPais();
        return Response.ok(busquedasPorPais).build();
    }




    @GET
    @Path("/registros/evolucion")
    public Response evolucionBusquedas() {
        Map<LocalDate, Long> evolucion = registroBusquedaRepositorio.evolucionBusquedas();
        return Response.ok(evolucion).build();
    }

    @GET
    @Path("/registros/tipoacceso")
    public Response getTipoAcceso() {
        Map<String, Long> tipoAcceso = registroBusquedaRepositorio.contarPorTipoAcceso();
        return Response.ok(tipoAcceso).build();
    }
    

}



