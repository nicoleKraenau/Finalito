import React, { createContext, useReducer } from 'react';
import storeReducer, { initialStore } from './storeReducer';

// Define el contexto de la tienda
const StoreContext = createContext();

// Define el proveedor de la tienda
const StoreProvider = ({ children }) => {
  // Usa el reducer para manejar el estado de la tienda
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  return (
    // Proporciona el contexto de la tienda a todos los componentes descendientes
    <StoreContext.Provider value={[store, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

// Exporta el contexto y el proveedor para que puedan ser utilizados en otros componentes
export { StoreContext, StoreProvider };
