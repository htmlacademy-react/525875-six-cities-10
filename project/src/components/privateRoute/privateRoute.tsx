import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';


interface PrivateRouteProps {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export default function PrivateRoute({authorizationStatus, children}: PrivateRouteProps) {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
