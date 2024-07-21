
// הגדרת פעולות לשינוי מצב המוצרים והעמוד הנוכחי
export const setProductsPage = (products, totalPages) => ({
    type: 'SET_PRODUCTS',
    payload: { products, totalPages },
  });
  
  export const setCurrentPage = (page) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page,
  });
  