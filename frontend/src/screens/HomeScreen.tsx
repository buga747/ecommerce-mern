import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { IProduct } from '../types/productTypes';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product: IProduct) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
