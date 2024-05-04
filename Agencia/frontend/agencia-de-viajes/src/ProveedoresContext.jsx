import React, { createContext, useContext, useState, useEffect } from 'react';

// Crea el contexto
const ProveedoresContext = createContext();

// Componente proveedor que cargará y proporcionará los datos
export const ProveedoresProvider = ({ children }) => {
    const [proveedoresVuelos, setProveedoresVuelos] = useState([]);
    const [proveedoresHoteles, setProveedoresHoteles] = useState([]);

    useEffect(() => {
        const fetchProveedores = async () => {
            // Suponiendo que tienes endpoints para proveedores de vuelos y hoteles
            const resVuelos = await fetch('http://localhost:8081/aerolineas');
            const dataVuelos = await resVuelos.json();
            setProveedoresVuelos(dataVuelos);

            const resHoteles = await fetch('http://localhost:8081/hotelesA');
            const dataHoteles = await resHoteles.json();
            setProveedoresHoteles(dataHoteles);
        };

        fetchProveedores();
    }, []);

    return (
        <ProveedoresContext.Provider value={{ proveedoresVuelos, proveedoresHoteles }}>
            {children}
        </ProveedoresContext.Provider>
    );
};

// Hook personalizado para usar los proveedores en cualquier componente
export const useProveedores = () => useContext(ProveedoresContext);
