import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col, Card, Badge, Modal, ListGroup, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faMoon, faSun, faTimes } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showFlavors, setShowFlavors] = useState(false);

  const iceCreamFlavors = [
    {
      id: 1,
      name: 'Gadbad Ice Cream',
      price: 180,
      image: 'https://i.imgur.com/XYZ123.jpg',
      description: 'A Mangalorean specialty with multiple layers of ice cream, fruits, and nuts',
      category: 'Specialty',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Mango Mastani',
      price: 160,
      image: 'https://i.imgur.com/XYZ123.jpg',
      description: 'Rich mango ice cream with fresh mango pieces and cream',
      category: 'Fruit',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Tender Coconut Ice Cream',
      price: 150,
      image: 'https://i.imgur.com/XYZ123.jpg',
      description: 'Refreshing coconut flavored ice cream with tender coconut pieces',
      category: 'Fruit',
      rating: 4.6
    },
    {
      id: 4,
      name: 'Kesar Pista',
      price: 140,
      image: 'https://i.imgur.com/XYZ123.jpg',
      description: 'Classic saffron and pistachio flavored ice cream',
      category: 'Traditional',
      rating: 4.5
    },
    {
      id: 5,
      name: 'Chocolate Fudge',
      price: 150,
      image: 'https://i.imgur.com/XYZ123.jpg',
      description: 'Rich chocolate ice cream with fudge swirls',
      category: 'Chocolate',
      rating: 4.7
    },
    {
      id: 6,
      name: 'Butterscotch',
      price: 140,
      image: 'https://i.imgur.com/XYZ123.jpg',
      description: 'Creamy butterscotch flavored ice cream with caramel swirls',
      category: 'Cream',
      rating: 4.6
    },
    {
      id: 7,
      name: 'Strawberry Delight',
      price: 160,
      image: 'https://i.imgur.com/XYZ123.jpg',
      description: 'Fresh strawberry ice cream with real fruit pieces',
      category: 'Fruit',
      rating: 4.8
    },
    {
      id: 8,
      name: 'Vanilla Bean',
      price: 130,
      image: 'https://i.imgur.com/XYZ123.jpg',
      description: 'Classic vanilla ice cream with real vanilla bean specks',
      category: 'Traditional',
      rating: 4.5
    }
  ];

  const specialOffers = [
    { 
      id: 1, 
      title: 'Happy Hour', 
      description: '20% off all scoops from 2-4 PM', 
      icon: '🕒',
      validUntil: '2024-12-31'
    },
    { 
      id: 2, 
      title: 'Family Pack', 
      description: 'Buy 4 scoops, get 1 free', 
      icon: '👨‍👩‍👧‍👦',
      validUntil: '2024-12-31'
    },
    { 
      id: 3, 
      title: 'Student Special', 
      description: '15% off with valid student ID', 
      icon: '🎓',
      validUntil: '2024-12-31'
    }
  ];

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully! Total amount: ₹' + getTotal());
    setCart([]);
    setShowCheckout(false);
  };

  const handleOrderNow = (flavor) => {
    setSelectedFlavor(flavor);
    setQuantity(1);
    setShowOrderModal(true);
  };

  const handleConfirmOrder = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(selectedFlavor);
    }
    setShowOrderModal(false);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  const filteredFlavors = iceCreamFlavors.filter(flavor => 
    flavor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToFlavors = () => {
    setShowFlavors(true);
    const flavorsSection = document.getElementById('flavors-section');
    if (flavorsSection) {
      flavorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {/* Navigation Bar */}
      <Navbar bg="primary" variant="dark" expand="lg" className="gradient-nav">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://i.imgur.com/ABCD123.jpg"
              width="40"
              height="40"
              className="d-inline-block align-top logo"
              alt="Ideal Cafe logo"
            />
            {' '}Ideal Cafe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#menu">Menu</Nav.Link>
              <Nav.Link href="#offers">Offers</Nav.Link>
              <Nav.Link href="#locations">Locations</Nav.Link>
              <Nav.Link href="#contact">Contact Us</Nav.Link>
              <Nav.Link href="#signin">Sign In</Nav.Link>
            </Nav>
            <Form className="d-flex me-3">
              <FormControl
                type="search"
                placeholder="Search ice creams..."
                className="me-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-primary">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
            <Button 
              variant="outline-primary" 
              className="me-2"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </Button>
            <Button variant="outline-primary" className="position-relative" onClick={() => setShowCart(true)}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cart.length > 0 && (
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Ideal Cafe</h1>
          <p>Mangalore's Favorite Ice Cream Parlor</p>
          <Button 
            variant="primary" 
            size="lg" 
            className="cta-button"
            onClick={scrollToFlavors}
          >
            Order Now
          </Button>
        </div>
      </header>

      {/* Flavors Section */}
      <section id="flavors-section" className="flavors py-5">
        <Container>
          <h2 className="text-center mb-5 position-relative">Our Flavors</h2>
          <Row xs={1} md={2} lg={4} className="g-4">
            {filteredFlavors.map(flavor => (
              <Col key={flavor.id}>
                <Card className="flavor-card h-100">
                  <div className="card-img-container">
                    <Card.Img variant="top" src={flavor.image} alt={flavor.name} />
                  </div>
                  <Card.Body>
                    <Card.Title>{flavor.name}</Card.Title>
                    <Card.Text>{flavor.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="price">₹{flavor.price}</span>
                      <Button 
                        variant="primary" 
                        onClick={() => handleOrderNow(flavor)}
                      >
                        Order Now
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Special Offers Section */}
      <section className="offers">
        <Container>
          <h2>Special Offers</h2>
          <Row className="g-4">
            {specialOffers.map((offer) => (
              <Col key={offer.id} xs={12} md={4}>
                <Card className="h-100 offer-card">
                  <Card.Body className="text-center">
                    <span className="offer-icon">{offer.icon}</span>
                    <Card.Title>{offer.title}</Card.Title>
                    <Card.Text>{offer.description}</Card.Text>
                    <small className="text-muted">Valid until: {offer.validUntil}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <Row>
            <Col md={4}>
              <h3>Contact Us</h3>
              <p>123 KS Rao Road</p>
              <p>Hampankatta, Mangalore - 575001</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: info@idealcafe.com</p>
            </Col>
            <Col md={4}>
              <h3>Hours</h3>
              <p>Monday - Friday: 11AM - 9PM</p>
              <p>Saturday - Sunday: 10AM - 10PM</p>
            </Col>
            <Col md={4}>
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="#facebook">Facebook</a>
                <a href="#instagram">Instagram</a>
                <a href="#twitter">Twitter</a>
              </div>
            </Col>
          </Row>
          <div className="footer-bottom">
            <p>&copy; 2024 Ideal Cafe, Mangalore. All rights reserved.</p>
          </div>
        </Container>
      </footer>

      <Modal show={showCart} onHide={() => setShowCart(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ListGroup>
              {cart.map(item => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6>{item.name}</h6>
                    <small>₹{item.price} each</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      className="ms-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="w-100 d-flex justify-content-between align-items-center">
            <div>
              <h5>Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}</h5>
              <h4>Total Amount: ₹{getTotal()}</h4>
            </div>
            <Button variant="primary" disabled={cart.length === 0} onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={showCheckout} onHide={() => setShowCheckout(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Order Summary</h4>
          <ListGroup>
            {cart.map(item => (
              <ListGroup.Item key={item.id}>
                <div className="d-flex justify-content-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mt-3">
            <h5 className="text-end">Total Amount: ₹{getTotal()}</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckout(false)}>
            Back to Cart
          </Button>
          <Button variant="primary" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Order Modal */}
      <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFlavor && (
            <>
              <div className="text-center mb-4">
                <img 
                  src={selectedFlavor.image} 
                  alt={selectedFlavor.name} 
                  className="img-fluid rounded"
                  style={{ maxHeight: '200px' }}
                />
                <h4 className="mt-3">{selectedFlavor.name}</h4>
                <p className="text-muted">{selectedFlavor.description}</p>
                <h5 className="price">₹{selectedFlavor.price}</h5>
              </div>
              <FormGroup>
                <FormLabel>Quantity</FormLabel>
                <FormSelect 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </FormSelect>
              </FormGroup>
              <div className="mt-3">
                <h5>Total Amount: ₹{selectedFlavor.price * quantity}</h5>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOrderModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Order Success Alert */}
      {orderSuccess && (
        <div className="alert alert-success position-fixed top-0 end-0 m-3" role="alert">
          Item added to cart successfully!
        </div>
      )}
    </div>
  );
};

export default App;
