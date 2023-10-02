import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';
import { IProduct } from '../types/productTypes';

const HomeScreen: React.FC = () => {
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product: IProduct) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />{' '}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
