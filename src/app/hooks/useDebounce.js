import { useEffect, useState } from 'react';
// El <T> es para que el tipo de valor sea dinámico // Ejemplo: useDebounce<string>('Hola', 500)
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // Creamos un estado para almacenar el valor debounced const [debouncedValue, setDebouncedValue]
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
