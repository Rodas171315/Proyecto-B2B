import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext'; 

function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [seccionesGenerales, setSeccionesGenerales] = useState([]);
  const [faqEdit, setFaqEdit] = useState({ pregunta: '', respuesta: '', id: null });
  const [seccionEdit, setSeccionEdit] = useState({ titulo: '', contenido: '', id: null });
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteFunction, setDeleteFunction] = useState(null);
  const { user } = useUser(); 
  


  useEffect(() => {
    fetchFaqs();
    fetchSeccionesGenerales();
  }, []);

    // Fetch FAQs
    async function fetchFaqs() {
        const response = await fetch('http://localhost:8080/faqs');
        const data = await response.json();
        setFaqs(data);
    }

    // Fetch Secciones Generales
    async function fetchSeccionesGenerales() {
        const response = await fetch('http://localhost:8080/secciones-generales');
        const data = await response.json();
        setSeccionesGenerales(data);
    }

    // Handle change for FAQs and Secciones Generales
    function handleChange(e, setFunction) {
        const { name, value } = e.target;
        setFunction(prevState => ({ ...prevState, [name]: value }));
    }

    // Submit FAQ
    async function handleSubmitFaq(e) {
        e.preventDefault();
        const url = faqEdit.id ? `http://localhost:8080/faqs/${faqEdit.id}` : 'http://localhost:8080/faqs';
        const method = faqEdit.id ? 'PUT' : 'POST';

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(faqEdit),
        });

        setFaqEdit({ pregunta: '', respuesta: '', id: null }); // Reset form
        fetchFaqs(); // Refetch FAQs
    }

    // Submit Sección General
    async function handleSubmitSeccion(e) {
        e.preventDefault();
        const url = seccionEdit.id ? `http://localhost:8080/secciones-generales/${seccionEdit.id}` : 'http://localhost:8080/secciones-generales';
        const method = seccionEdit.id ? 'PUT' : 'POST';

        await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(seccionEdit),
        });

        setSeccionEdit({ titulo: '', contenido: '', id: null }); // Reset form
        fetchSeccionesGenerales(); // Refetch Secciones Generales
    }

    // Delete FAQ
    async function deleteFaq(id) {
        await fetch(`http://localhost:8080/faqs/${id}`, { method: 'DELETE' });
        fetchFaqs(); // Refetch FAQs
    }

    // Delete Sección General
    async function deleteSeccion(id) {
        await fetch(`http://localhost:8080/secciones-generales/${id}`, { method: 'DELETE' });
        fetchSeccionesGenerales(); // Refetch Secciones Generales
    }




    const handleOpenDialog = (fn) => {
      setOpenDialog(true);
      setDeleteFunction(() => fn);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };


    const isAdmin = () => {
      return user && user.rol === 1;
    };
    
    return (
      <div className="container mt-4">
          <h2>FAQs y Secciones Generales</h2>

          <div>
              <h3>FAQs</h3>
              {faqs.map(faq => (
                  <div key={faq.id} className="mb-3">
                      <p>{faq.pregunta}</p>
                      <p>{faq.respuesta}</p>
                      {isAdmin() && (
  <>
    <button onClick={() => setFaqEdit(faq)} className="btn btn-primary me-2">Edit</button>
    <button onClick={() => deleteFaq(faq.id)} className="btn btn-danger">Delete</button>
  </>
)}

                  </div>
              ))}
              {isAdmin() && (
                  <form onSubmit={handleSubmitFaq} className="mb-3">
                      <input
                          className="form-control mb-2"
                          name="pregunta"
                          value={faqEdit.pregunta}
                          onChange={(e) => handleChange(e, setFaqEdit)}
                          placeholder="Pregunta"
                      />
                      <input
                          className="form-control mb-2"
                          name="respuesta"
                          value={faqEdit.respuesta}
                          onChange={(e) => handleChange(e, setFaqEdit)}
                          placeholder="Respuesta"
                      />
                      <button type="submit" className="btn btn-success">Guardar FAQ</button>
                  </form>
              )}
          </div>

          <div>
              <h3>Secciones Generales</h3>
              {seccionesGenerales.map(seccion => (
                  <div key={seccion.id}>
                      <h3>{seccion.titulo}</h3>
                      <p>{seccion.contenido}</p>
                      {isAdmin() && (
  <>
    <button onClick={() => setSeccionEdit(seccion)} className="btn btn-primary me-2">Edit</button>
    <button onClick={() => deleteSeccion(seccion.id)} className="btn btn-danger">Delete</button>
  </>
)}

                  </div>
              ))}
              {isAdmin() && (
                  <form onSubmit={handleSubmitSeccion}>
                      <input
                          className="form-control mb-2"
                          name="titulo"
                          value={seccionEdit.titulo}
                          onChange={(e) => handleChange(e, setSeccionEdit)}
                          placeholder="Título"
                      />
                      <textarea
                          className="form-control mb-2"
                          name="contenido"
                          value={seccionEdit.contenido}
                          onChange={(e) => handleChange(e, setSeccionEdit)}
                          placeholder="Contenido"
                          rows="4"
                      />
                      <button type="submit" className="btn btn-success">Guardar Sección</button>
                  </form>
              )}
          </div>
      </div>
  );
}

export default FAQs;