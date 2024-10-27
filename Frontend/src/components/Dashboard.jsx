import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Pagination from './Pagination.jsx';
import FilterSection from './FilterSection.jsx';
import NotificationBell from './NotificationBell.jsx';
import { useNotification } from '../hooks/useNotification.js';

const Dashboard = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    company: '',
    priceMin: '',
    priceMax: ''
  });
  const [sortConfig, setSortConfig] = useState({ field: 'price_euros', order: 'asc' });
  
  const { newNotifications, notificationCount, clearNotifications } = useNotification();

  const fetchLaptops = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/laptops`, {
        params: {
          page: currentPage,
          limit: pageSize,
          sortBy: sortConfig.field,
          sortOrder: sortConfig.order,
          ...filters
        }
      });
      setLaptops(response.data.laptops);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching laptops:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaptops();
  }, [currentPage, pageSize, filters, sortConfig]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split('_');
    setSortConfig({ field, order });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Laptop Inventory</h2>
        <NotificationBell count={notificationCount} onClick={clearNotifications} />
      </div>

      <FilterSection onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <Table data={laptops} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;