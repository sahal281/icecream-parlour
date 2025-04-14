import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container, Row, Col, Card, Badge, Modal, ListGroup, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMoon, faSun, faTimes, faStar, faGift, faClock, faPercent } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
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
  const [showFlavors, setShowFlavors] = useState(true);

  const iceCreamFlavors = [
    {
      id: 1,
      name: 'Gadbad Ice Cream',
      price: 180,
      image: 'https://tse3.mm.bing.net/th?id=OIP.2iSCw4SS4CxCk-uHA1eL9wHaKV&pid=Api&P=0&h=180',
      description: 'A Mangalorean specialty with multiple layers of ice cream, fruits, and nuts',
      category: 'Specialty',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Mango Mastani',
      price: 160,
      image: 'https://tse1.mm.bing.net/th?id=OIP.XFhwFtCGQeiZFarXyvCFPwHaLG&pid=Api&P=0&h=180',
      description: 'Rich mango ice cream with fresh mango pieces and cream',
      category: 'Fruit',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Tender Coconut Ice Cream',
      price: 150,
      image: 'https://i.ytimg.com/vi/kPM3Y5wZ43Q/maxresdefault.jpg',
      description: 'Refreshing coconut flavored ice cream with tender coconut pieces',
      category: 'Fruit',
      rating: 4.6
    },
    {
      id: 4,
      name: 'Kesar Pista',
      price: 140,
      image: 'https://tse3.mm.bing.net/th?id=OIP.2xjAKwzxtxGURlfcJ-lvvwHaHa&pid=Api&P=0&h=180',
      description: 'Classic saffron and pistachio flavored ice cream',
      category: 'Traditional',
      rating: 4.5
    },
    {
      id: 5,
      name: 'Chocolate Fudge',
      price: 150,
      image: 'https://tse2.mm.bing.net/th?id=OIP.D6fEl_X5cRgbCzavJqmmrgHaKX&pid=Api&P=0&h=180',
      description: 'Rich chocolate ice cream with fudge swirls',
      category: 'Chocolate',
      rating: 4.7
    },
    {
      id: 6,
      name: 'Butterscotch',
      price: 140,
      image: 'https://tse4.mm.bing.net/th?id=OIP.WBUSsHmRSZbKCaEeWbl6egHaLH&pid=Api&P=0&h=180',
      description: 'Creamy butterscotch flavored ice cream with caramel swirls',
      category: 'Cream',
      rating: 4.6
    },
    {
      id: 7,
      name: 'Strawberry Delight',
      price: 160,
      image: 'https://tse3.mm.bing.net/th?id=OIP.GYAuGSmTbIrPAUd8Sm7i_wHaHa&pid=Api&P=0&h=180',
      description: 'Fresh strawberry ice cream with real fruit pieces',
      category: 'Fruit',
      rating: 4.8
    },
    {
      id: 8,
      name: 'Vanilla Bean',
      price: 130,
      image: 'https://tse2.mm.bing.net/th?id=OIP.cS-vantzMfqxGxBAvrOgLgHaHa&pid=Api&P=0&h=180',
      description: 'Classic vanilla ice cream with real vanilla bean specks',
      category: 'Traditional',
      rating: 4.5
    }
  ];

  const specialOffers = [
    {
      id: 1,
      title: 'Family Pack',
      description: 'Buy 3 ice creams and get 1 free',
      icon: faGift,
      validUntil: '2024-12-31'
    },
    {
      id: 2,
      title: 'Happy Hours',
      description: '20% off on all ice creams from 3 PM to 6 PM',
      icon: faClock,
      validUntil: '2024-12-31'
    },
    {
      id: 3,
      title: 'Student Special',
      description: '15% off for students with valid ID',
      icon: faPercent,
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
    <div className={`app ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
      {/* Navbar */}
      <Navbar bg="transparent" expand="lg" className="py-3">
        <Container>
          <Navbar.Brand href="#">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.IRknlTfPsuZ_ln82v1K9VgAAAA&pid=Api&P=0&h=180"
              alt="Ideal Cafe Logo"
              width="50"
              height="50"
              className="d-inline-block align-top me-2"
            />
            Ideal Cafe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" onClick={() => window.scrollTo(0, 0)}>Home</Nav.Link>
              <Nav.Link href="#flavors" onClick={() => document.getElementById('flavors-section')?.scrollIntoView({ behavior: 'smooth' })}>Flavors</Nav.Link>
              <Nav.Link href="#offers" onClick={() => document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' })}>Offers</Nav.Link>
              <Nav.Link href="#contact" onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}>Contact</Nav.Link>
            </Nav>
            <Form className="d-flex me-3">
              <FormControl
                type="search"
                placeholder="Search flavors..."
                className="me-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form>
            <Button
              variant={darkMode ? "light" : "dark"}
              className="me-2"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </Button>
            <Button variant="yellow" onClick={() => setShowCart(true)}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cart.length > 0 && (
                <Badge bg="danger" className="ms-1">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <header className="position-relative text-center text-white py-5" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://i.imgur.com/XYZ123.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '90vh' }}>
        <div className="position-absolute top-50 start-50 translate-middle w-100">
          <h1 className="display-4 fw-bold mb-3">Welcome to Ideal Cafe</h1>
          <p className="lead mb-4">Mangalore's Favorite Ice Cream Parlor</p>
          <Button variant="blue" size="lg" className="rounded-pill px-4" onClick={scrollToFlavors}>
            Order Now
          </Button>
        </div>
      </header>

      {/* Flavors Section */}
      <section id="flavors-section" className="flavors-section py-5">
        <Container>
          <h2 className="text-center mb-5 text-purple">Our Flavors</h2>
          <Row xs={1} md={2} lg={4} className="g-4">
            {filteredFlavors.map(flavor => (
              <Col key={flavor.id}>
                <Card className="h-100 shadow-sm">
                  <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                    <Card.Img variant="top" src={flavor.image} alt={flavor.name} className="h-100 object-fit-cover" />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-bottom" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))' }} />
                  </div>
                  <Card.Body>
                    <Card.Title className="text-purple">{flavor.name}</Card.Title>
                    <Card.Text>{flavor.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="price-tag">₹{flavor.price}</span>
                      <Button variant="pink" className="rounded-pill" onClick={() => handleOrderNow(flavor)}>
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
      <section className="special-offers py-5 text-white">
        <Container>
          <h2 className="text-center mb-5">Special Offers</h2>
          <Row xs={1} md={3} className="g-4">
            {specialOffers.map(offer => (
              <Col key={offer.id}>
                <Card className="h-100 bg-transparent border-0">
                  <Card.Body className="text-center">
                    <div className="icon-wrapper">
                      <FontAwesomeIcon icon={offer.icon} className="display-4" />
                    </div>
                    <Card.Title className="text-yellow">{offer.title}</Card.Title>
                    <Card.Text>{offer.description}</Card.Text>
                    <small className="text-white-50">Valid until: {offer.validUntil}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-purple text-white py-5">
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <h5>Contact Us</h5>
              <p>123 Ice Cream Street, Mangalore</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: info@idealcafe.com</p>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <h5>Opening Hours</h5>
              <p>Monday - Friday: 10 AM - 10 PM</p>
              <p>Saturday - Sunday: 9 AM - 11 PM</p>
            </Col>
            <Col md={4}>
              <h5>Follow Us</h5>
              <div className="d-flex gap-3">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
            </Col>
          </Row>
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
                    <small>₹{item.price}</small>
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
