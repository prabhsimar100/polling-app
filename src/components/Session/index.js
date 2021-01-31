import AuthUserContext from './context';
import withAuthentication from './withAuthentication';
 


export const withAuth = Component => props => (
    <AuthUserContext.Consumer>
      {authUser => <Component {...props} authUser={authUser} />}
    </AuthUserContext.Consumer>
  );

export { AuthUserContext, withAuthentication };