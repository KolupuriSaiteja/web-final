import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

export default function BreadcrumbComponent({ children }) {
  return (
    <Breadcrumb className="my-2">
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {children}
    </Breadcrumb>
  );
}
