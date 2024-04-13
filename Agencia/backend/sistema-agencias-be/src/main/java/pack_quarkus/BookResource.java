/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package pack_quarkus;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import java.util.List;
import java.util.NoSuchElementException;

/**
 *
 * @author root
 */

@Path("/books")
@Transactional
public class BookResource {
    
    @Inject
    private BookRepository repo;
    
    @GET
    public List<Book> index() {
        return repo.listAll();
    }
    
    @POST
    public Book insert(Book insertedBook) {
        assert insertedBook.getId() == null;
        repo.persist(insertedBook);
        assert insertedBook.getId() != null;
        return insertedBook;
    }
    
    @GET
    @Path("{id}")
    public Book retrieve(@PathParam("id") Long id) {
        var book = repo.findById(id);
        if (book != null) {
            return book;
        }
        throw new NoSuchElementException("No hay libro con el ID " + id + ".");
    }
    
    @DELETE
    @Path("{id}")
    public String delete(@PathParam("id") Long id) {
        if (repo.deleteById(id)) {
            return "Se ha borrado bien";
        } else {
            return "No se ha borrado";
        }
    }
    
    @PUT
    @Path("{id}")
    public Book update(@PathParam("id") Long id, Book book) {
        var updatedBook = repo.findById(id);
        if (updatedBook != null) {
            updatedBook.setTitle(book.getTitle());
            updatedBook.setPubDate(book.getPubDate());
            updatedBook.setNumPages(book.getNumPages());
            updatedBook.setDescription(book.getDescription());
            repo.persist(updatedBook);
            return updatedBook;
        }
        throw new NoSuchElementException("No hay libro con el ID " + id + ".");
    }
    
}
