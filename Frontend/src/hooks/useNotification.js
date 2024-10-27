import { useState, useEffect } from 'react';
import axios from 'axios';

export const useNotification = () => {
  const [newNotifications, setNewNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const audio = new Audio('../assets/notification.mp3');
    const checkNewRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/laptops/latest');
        if (response.data.length > 0) {
          setNewNotifications(prev => [...prev, ...response.data]);
          setNotificationCount(prev => prev + response.data.length);
          audio.play();
        }
      } catch (error) {
        console.error('Error checking for new records:', error);
      }
    };

    const interval = setInterval(checkNewRecords, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const clearNotifications = () => {
    setNewNotifications([]);
    setNotificationCount(0);
  };

  return { newNotifications, notificationCount, clearNotifications };
};