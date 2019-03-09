import { logoutMutation } from '../graphql/user/mutations/logout';
import Context from '../interfaces/Context';
import redirect from '../lib/redirect';

const Logout = () => {
  return null;
};

Logout.getInitialProps = async ({ apolloClient, ...ctx }: Context) => {
  await apolloClient.mutate({ mutation: logoutMutation });
  await apolloClient.resetStore();
  redirect(ctx, '/login');
  return {};
};

export default Logout;
