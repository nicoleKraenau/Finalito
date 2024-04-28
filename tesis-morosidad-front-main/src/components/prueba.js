import React, { createContext, useContext, useState, useEffect } from 'react';

const PalabraContext = createContext();

export const usePalabra = () => {
  return useContext(PalabraContext);
};

export const PalabraProvider = ({ children }) => {
  const [palabra, setPalabra] = useState(localStorage.getItem('palabra') || '');

  const actualizarPalabra = (nuevaPalabra) => {
    setPalabra(nuevaPalabra);
    localStorage.setItem('palabra', nuevaPalabra);
  };

  useEffect(() => {
    const storedPalabra = localStorage.getItem('palabra');
    if (storedPalabra) {
      setPalabra(storedPalabra);
    }
  }, []);

  return (
    <PalabraContext.Provider value={{ palabra, actualizarPalabra }}>
      {children}
    </PalabraContext.Provider>
  );
};
