import React, { useState, useEffect } from 'react';

function AdministrarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setCargando(true);
      try {
        const response = await fetch('http://localhost:8080/usuarios/detalles');
        if (!response.ok) {
          throw new Error('Algo salió mal al obtener los usuarios');
        }
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    fetchUsuarios();
  }, []);

  const actualizarUsuario = async (id, usuarioActualizado) => {
    // Implementa la lógica para actualizar un usuario aquí.
  };

  const eliminarUsuario = async (id) => {
    // Implementa la lógica para eliminar un usuario aquí.
  };

  if (cargando) return <p>Cargando usuarios...</p>;
  if (error) return <p>Hubo un error al cargar los usuarios: {error}</p>;

  return (
    <div>
      <h2>Administrar Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.primerNombre} {usuario.primerApellido}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rolNombre}</td>
              <td>
                {/* Botones o enlaces para editar y eliminar usuarios */}
                <button onClick={() => actualizarUsuario(usuario.id)}>Editar</button>
                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdministrarUsuarios;
