export const CartReducer = (state, action) => {
    const {shoppingCart, totalPrice, totalQty} = state;

    let room;
    let index;
    let updatedPrice;
    let updatedQty;

    switch(action.type){
        case 'ADD_TO_CART':
            const check = shoppingCart.find(room=>room.id === action.id);
            if(check){
                console.log('Product is already in your cart');
                return state;
            }
            else{
                room = action.room;
                room['qty'] = 1;
                room['TotalProductPrice'] = room.price * room.qty;
                updatedQty = totalQty + 1;
                updatedPrice = totalPrice + room.price;
                return{
                    shoppingCart:[room, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }
            break;
            
    }
}