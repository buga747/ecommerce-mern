import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { IProduct } from '../types/productTypes';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen: React.FC = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading && <Loader />}

      {error && (
        <Message variant="danger">
          <h2>{error?.name}</h2>
          <h3> {error?.message}</h3>
        </Message>
      )}

      {!error && !isLoading && (
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
      )}
    </>
  );
};

export default HomeScreen;
