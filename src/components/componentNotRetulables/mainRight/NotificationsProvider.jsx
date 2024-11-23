

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocation} from "react-router-dom"

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem('notificationsNews');
        return storedData ? JSON.parse(storedData) : [];
    });
    const location = useLocation();
useEffect(() => {
    if (location.pathname.includes("/message")) {
        localStorage.removeItem('notificationsNews');
        setData([]);
    }
}, [location.pathname]);
    useEffect(() => {
        const eventSource = new EventSource('https://backend.habla-mundo.com/api/v1/listen-message');

        eventSource.addEventListener('message', (event) => {
            if (event.data === "nothing") {
                return;
            } else {
                const newMessages = JSON.parse(event.data);
                if (window.location.pathname.includes("/message")) {
                    localStorage.removeItem('notificationsNews');
                    setData([]); 
                } else {
                    setData(prevMessages => {
                        const updatedData = [...prevMessages, newMessages];
                        localStorage.setItem('notificationsNews', JSON.stringify(updatedData));
                        return updatedData;
                    });
                }
            }
        });

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <NotificationsContext.Provider value={data}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationsContext);


