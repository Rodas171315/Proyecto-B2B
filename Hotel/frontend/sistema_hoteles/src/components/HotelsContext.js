import React, { createContext, useContext, useState } from 'react';

export const HotelsContext = createContext(); 

export const useHotels = () => useContext(HotelsContext);

export const HotelsProvider = ({ children }) => {
    const [hotels, setHotels] = useState([]);

    const addHotel = (hotel) => {
        setHotels((prevHotels) => [...prevHotels, hotel]);
    };

    return (
        <HotelsContext.Provider value={{ hotels, addHotel }}>
            {children}
        </HotelsContext.Provider>
    );
};
