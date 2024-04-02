import React from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext'; 

const CartPage = () => {
    const { cartItems, emptyCart } = useCart();
    const navigate = useNavigate();
  
    const handleCheckout = () => {
        navigate('/checkout', { state: { fromCart: true, cartItems } });
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        emptyCart();
    };

    if (cartItems.length === 0) {
        return (
            <Container>
                <h2>Carrito de Compras</h2>
                <p>Tu carrito está vacío.</p>
            </Container>
        );
    }

    return (
        <Container>
          <h2>Carrito de Compras</h2>
          {/* Lista de ítems en el carrito */}
          <ListGroup>
            {cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
                Habitación: {item.roomType} - ${item.price} por noche
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="text-end mt-3">
            <Button variant="warning" onClick={emptyCart}>Vaciar Carrito</Button>
            <Button variant="primary" onClick={handleCheckout} className="ms-2">Continuar al Checkout</Button>
          </div>
        </Container>
      );
    };
    
    export default CartPage;