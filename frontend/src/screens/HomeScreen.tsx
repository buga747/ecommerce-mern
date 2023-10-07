import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { IProduct } from '../types/productTypes';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';
import { useEffect } from 'react';

const HomeScreen: React.FC = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  useEffect(() => {
    console.log(isError);
  });

  return (
    <>
      {isLoading && <h2>Loading...</h2>}

      {isError && <div>Error</div>}

      {!isError && !isLoading && (
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
