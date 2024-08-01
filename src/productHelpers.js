export const getProductById = (products, productId) => {
    
    console.log('!!',products, productId);
    return products?.find(p => p.id === productId)
} //

export const getTotal = (products, cart) => cart?.reduce((acc, item) => acc + ((getProductById(products, item.productId)?.price) * item.amount), 0);
