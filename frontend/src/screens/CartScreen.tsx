import {
  Col,
  Row,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return <div>: FC</div>;
};

export default CartScreen;
