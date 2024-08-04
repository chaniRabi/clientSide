export const getProductById = (products, productId) => {
    
    console.log('!!',products, productId);
    return products?.find(p => p.id === productId)
} //

export const getTotal = (products, cart) => cart?.reduce((acc, item) => acc + (item.product?.price) * item.amount, 0);
