import { Spinner } from 'react-bootstrap';

import { FC } from 'react';

const Loader: FC = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    />
  );
};

export default Loader;
