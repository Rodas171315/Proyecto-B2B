import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';


const countries = [    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
  "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini ", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
  "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "North Korea", "North Macedonia (formerly Macedonia)", "Norway", "Oman", "Pakistan", "Palau", "Palestine State",
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
  "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
  "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen",
  "Zambia", "Zimbabwe"]; 
  
  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'VisitanteRegistrado' },
    { id: 3, name: 'Webservice' },
  ];

  function AdministrarUsuarios() {
    const [editandoId, setEditandoId] = useState(null);
    const [rolSeleccionado, setRolSeleccionado] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [usuarioForm, setUsuarioForm] = useState({

      email: '',
      password: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      fecha_nacimiento: '',
      nacionalidad: '',
      pasaporte: '',
      rol: ''
    });
  
    useEffect(() => {
      fetchUsuarios();
    }, []);
  
    const fetchUsuarios = async () => {
      setCargando(true);
      try {
        const response = await fetch('http://localhost:8080/usuarios/detalles');
        if (!response.ok) throw new Error('Algo salió mal al obtener los usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUsuarioForm(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      // Preparar los datos para el envío, asegurando las conversiones
      const formData = {
        email: usuarioForm.email,
        password: usuarioForm.password,
        primerNombre: usuarioForm.primer_nombre, // nombres de las propiedades  con el DTO
        segundoNombre: usuarioForm.segundo_nombre,
        primerApellido: usuarioForm.primer_apellido,
        segundoApellido: usuarioForm.segundo_apellido,
        fechaNacimiento: usuarioForm.fecha_nacimiento,
        nacionalidad: usuarioForm.nacionalidad,
        pasaporte: parseInt(usuarioForm.pasaporte, 10),
        rol: parseInt(usuarioForm.rol, 10)
      };
    
      console.log("Enviando datos al backend:", formData);
    
      try {
        const response = await fetch('http://localhost:8080/usuarios/crear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
    
        if (!response.ok) throw new Error('Error al crear el usuario');
    
        const nuevoUsuario = await response.json();
        console.log("Usuario creado con éxito:", nuevoUsuario);
    
        fetchUsuarios(); // Refrescar la lista de usuarios después de la creación exitosa
        setUsuarioForm({ // Resetear el formulario
          email: '',
          password: '',
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          fecha_nacimiento: '',
          nacionalidad: '',
          pasaporte: '',
          rol: '',
        });
      } catch (error) {
        console.error("Error al crear el usuario:", error);
        setError(error.message);
      }
    };
    
    const eliminarUsuario = async (id) => {
      try {
        const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) throw new Error('Error al eliminar el usuario');
  
        console.log("Usuario eliminado con éxito:", id);
        fetchUsuarios(); // Refrescar la lista de usuarios después de eliminar uno
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        setError(error.message);
      }
    };


    const actualizarRolUsuario = async (id, nuevoRol) => {
      const formData = { rol: nuevoRol };
      
      try {
        const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) throw new Error('Error al actualizar el usuario');
  
        console.log("Usuario actualizado con éxito:", await response.json());
        setEditandoId(null); // Desactivar modo edición
        fetchUsuarios();
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        setError(error.message);
      }
    };
    

    return (
      <div>
        <h2>Administrar Usuarios</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" name="email" value={usuarioForm.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" name="password" value={usuarioForm.password} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formPrimerNombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control name="primer_nombre" placeholder="Primer Nombre" value={usuarioForm.primer_nombre} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formSegundoNombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control name="segundo_nombre" placeholder="Segundo Nombre" value={usuarioForm.segundo_nombre} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formPrimerApellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control name="primer_apellido" placeholder="Primer Apellido" value={usuarioForm.primer_apellido} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formSegundoApellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control name="segundo_apellido" placeholder="Segundo Apellido" value={usuarioForm.segundo_apellido} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formFechaNacimiento">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control type="date" name="fecha_nacimiento" value={usuarioForm.fecha_nacimiento} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formNacionalidad">
            <Form.Label>País de Origen</Form.Label>
            <Form.Select name="nacionalidad" value={usuarioForm.nacionalidad} onChange={handleChange} required>
              <option>Seleccione un país</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formPasaporte">
            <Form.Label>Número de Pasaporte</Form.Label>
            <Form.Control type="text" name="pasaporte" placeholder="Número de Pasaporte" value={usuarioForm.pasaporte} onChange={handleChange} required />
          </Form.Group>
          <Form.Group controlId="formRol">
            <Form.Label>Rol</Form.Label>
            <Form.Select name="rol" value={usuarioForm.rol} onChange={handleChange} required>
              <option>Seleccione un rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>{rol.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">Crear Usuario</Button>
        </Form>
    
        {cargando ? <p>Cargando...</p> : error ? <p>Error: {error}</p> : (
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Primer Nombre</th>
            <th>Primer Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.primerNombre}</td>
              <td>{usuario.primerApellido}</td>
              <td>{usuario.email}</td>
              <td>
                {editandoId === usuario.id ? (
                  <select
                    value={rolSeleccionado}
                    onChange={(e) => setRolSeleccionado(e.target.value)}
                    onBlur={() => actualizarRolUsuario(usuario.id, rolSeleccionado)}
                  >
                    <option value="1">Admin</option>
                    <option value="2">VisitanteRegistrado</option>
                    <option value="3">Webservice</option>
                  </select>
                ) : (
                  usuario.rolNombre
                )}
              </td>
              <td>
                {editandoId === usuario.id ? (
                  <Button variant="success" size="sm" onClick={() => actualizarRolUsuario(usuario.id, parseInt(rolSeleccionado, 10))}>
  Guardar
</Button>
) : (
<Button variant="secondary" size="sm" onClick={() => {
  setEditandoId(usuario.id);

  const rolActual = roles.find(rol => rol.name === usuario.rolNombre)?.id;
  setRolSeleccionado(String(rolActual)); // Actualiza esto para que coincida con tu estructura de datos.
}}>Editar</Button>
)}
<Button variant="danger" size="sm" onClick={() => eliminarUsuario(usuario.id)}>
  Eliminar
</Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </div>
);
};

export default AdministrarUsuarios;