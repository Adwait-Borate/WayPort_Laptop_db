// helpers.js

/**
 * Formats a price to Euro currency format.
 * @param {number} price - The price in euros.
 * @returns {string} Formatted price string.
 */
export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(price);
  };
  
  /**
   * Filters laptops based on the provided filters.
   * @param {Array} laptops - The list of laptop objects.
   * @param {Object} filters - An object containing filters.
   * @returns {Array} Filtered laptops array.
   */
  export const filterLaptops = (laptops, filters) => {
    return laptops.filter(laptop => {
      const { company, minPrice, maxPrice, hasTouchscreen } = filters;
  
      // Check company
      if (company && laptop.company.toLowerCase() !== company.toLowerCase()) {
        return false;
      }
  
      // Check price range
      if (minPrice && laptop.price_euros < minPrice) return false;
      if (maxPrice && laptop.price_euros > maxPrice) return false;
  
      // Check touchscreen option
      if (hasTouchscreen && laptop.touchscreen !== 'Yes') return false;
  
      return true;
    });
  };
  
  /**
   * Checks if the laptop has a specific feature like IPS panel or Retina display.
   * @param {string} feature - The feature to check.
   * @param {string} value - The laptop feature value ('Yes' or 'No').
   * @returns {boolean} True if the laptop has the feature.
   */
  export const hasFeature = (feature, value) => {
    return value && value.toLowerCase() === 'yes';
  };
  
  /**
   * Plays a notification sound.
   */
  export const playNotificationSound = () => {
    const audio = new Audio('../assets/notification.mp3');
    audio.play();
  };
  
  /**
   * Paginates an array of data.
   * @param {Array} data - The full array of data.
   * @param {number} currentPage - Current page number.
   * @param {number} pageSize - Number of items per page.
   * @returns {Array} Paginated data for the current page.
   */
  export const paginate = (data, currentPage, pageSize) => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  };
  