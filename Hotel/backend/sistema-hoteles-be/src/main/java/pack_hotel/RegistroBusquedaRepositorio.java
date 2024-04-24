package pack_hotel;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;



// parte para analiticos

import jakarta.persistence.TypedQuery;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.HashMap;

import java.util.LinkedHashMap;


// filtro

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;





@ApplicationScoped
public class RegistroBusquedaRepositorio implements PanacheRepository<RegistroBusqueda> {




    @PersistenceContext
    EntityManager em;


    public void registrarBusqueda(String parametros, Long usuarioId, String tipoAcceso, boolean esAutenticado) {
        RegistroBusqueda registro = new RegistroBusqueda();
        registro.setParametrosBusqueda(parametros);
        registro.setUsuarioId(usuarioId);
        registro.setFechaHora(LocalDateTime.now());
        registro.setTipoAcceso(tipoAcceso);
        registro.setEsAutenticado(esAutenticado);
        this.persist(registro);
    }




    
// parte para analiticos



public List<RegistroBusqueda> obtenerTodosLosRegistros() {
    return listAll();
}






public List<RegistroBusqueda> filtrarBusquedas(String fechaDesde, String fechaHasta, String tipoAcceso, Boolean esAutenticado) {
    EntityManager em = getEntityManager();
    CriteriaBuilder cb = em.getCriteriaBuilder();
    CriteriaQuery<RegistroBusqueda> cq = cb.createQuery(RegistroBusqueda.class);
    Root<RegistroBusqueda> registro = cq.from(RegistroBusqueda.class);
    List<Predicate> predicates = new ArrayList<>();

    //  
    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    if (tipoAcceso != null && !tipoAcceso.isEmpty()) {
        predicates.add(cb.equal(registro.get("tipoAcceso"), tipoAcceso));
    }

    if (fechaDesde != null && !fechaDesde.isEmpty() && fechaHasta != null && !fechaHasta.isEmpty()) {
        LocalDateTime desdeDateTime = LocalDateTime.parse(fechaDesde, dateTimeFormatter);
        LocalDateTime hastaDateTime = LocalDateTime.parse(fechaHasta, dateTimeFormatter);

        Predicate fechaMayorQue = cb.greaterThanOrEqualTo(registro.get("fechaHora"), desdeDateTime);
        Predicate fechaMenorQue = cb.lessThanOrEqualTo(registro.get("fechaHora"), hastaDateTime);
        predicates.add(cb.and(fechaMayorQue, fechaMenorQue));
    }

    if (esAutenticado != null) {
        predicates.add(cb.equal(registro.get("esAutenticado"), esAutenticado));
    }

    cq.where(predicates.toArray(new Predicate[0]));
    return em.createQuery(cq).getResultList();
}




// correcciones

public Map<String, Long> contarBusquedasPorPais() {
    List<RegistroBusqueda> busquedas = listAll();
    Pattern pattern = Pattern.compile("pais=([^;]*)");
    return busquedas.stream()
        .map(busqueda -> {
            Matcher matcher = pattern.matcher(busqueda.getParametrosBusqueda());
            return matcher.find() ? matcher.group(1) : "Desconocido";
        })
        .collect(Collectors.groupingBy(pais -> pais, Collectors.counting()));
}



public Map<LocalDate, Long> evolucionBusquedas() {
    List<RegistroBusqueda> busquedas = listAll();
    return busquedas.stream()
        .collect(
            Collectors.groupingBy(
                busqueda -> busqueda.getFechaHora().toLocalDate(),
                LinkedHashMap::new, // Mantener el orden de las fechas
                Collectors.counting()
            )
        );




        
}


public Map<String, Long> contarPorTipoAcceso() {
    TypedQuery<Object[]> query = em.createQuery(
        "SELECT r.tipoAcceso, COUNT(r) FROM RegistroBusqueda r GROUP BY r.tipoAcceso", Object[].class);
    List<Object[]> results = query.getResultList();
    Map<String, Long> tipoAcceso = new HashMap<>();
    for (Object[] result : results) {
        tipoAcceso.put((String) result[0], (Long) result[1]);
    }
    return tipoAcceso;
}
}