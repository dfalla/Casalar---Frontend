import { useEffect, useState } from 'react';
import { getCurrentTime } from './getCurrentTime';

export const activeSale = () => {

    const [currentTime, setCurrentTime] = useState(new Date().getTime());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date().getTime());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const isDisabled = () => {

        const currentHour = getCurrentTime(currentTime);

        // Deshabilitar el botón si la hora es antes de las 7:00 a.m. o después de las 07:00 p.m.
        return currentHour < '07:00:00' || currentHour >= '23:00:00'; 
    };


  return {
    isDisabled
  }
}
