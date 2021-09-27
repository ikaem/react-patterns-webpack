// gql-frontend/src/context/user.tsx

import {
  FC,
  createContext,
  ReactElement,
  useState,
  useEffect,
  useMemo,
} from 'react';

import { useCookies } from 'react-cookie';
import { getGraphQlError, redirectTo, getDebug } from '@contentpi/lib';
import { useQuery, useMutation } from '@apollo/client';

import LOGIN_MUTATION from '../graphql/user/login.mutation';
import GET_USER_DATA_QUERY from '../graphql/user/getUserData.query';

interface IUserContext {
  login(input: {
    email: string;
    password: string;
  }): Promise<string | Error | null>;
  connectedUser: {
    id: string;
    username: string;
    email: string;
    privilege: string;
    active: boolean;
  } | null;
}

interface IProps {
  page?: string;
}

export const UserContext = createContext<IUserContext>({
  login: async () => null,
  connectedUser: null,
});

const UserProvider: FC<IProps> = ({ page = '', children }) => {
  const [cookies, setCookies] = useCookies();
  const [connectedUser, setConnectedUser] =
    useState<IUserContext['connectedUser']>(null);

  const [
    loginMutation,
    { data: dataLogin, loading: loadingLogin, error: errorLogin },
  ] = useMutation(LOGIN_MUTATION);
  const {
    data: dataUser,
    loading,
    error,
  } = useQuery(GET_USER_DATA_QUERY, {
    variables: {
      token: cookies.token || '',
    },
  });

  //   this is cool - use immediately use effect to check what is up

  useEffect(() => {
    if (!dataUser) return;
    if (!dataUser.getUserData && page !== 'login')
      return redirectTo('/login?redirectTo=/dashboard');
    setConnectedUser(dataUser.getUserData);
  }, [dataUser, page]);

  async function login(input: {
    email: string;
    password: string;
  }): Promise<string | Error | null> {
    try {
      await loginMutation({
        variables: {
          email: input.email,
          password: input.password,
        },
      });

      if (errorLogin) throw errorLogin;

      if (dataLogin) setCookies('token', dataLogin.login.token, { path: '/' });

      return dataLogin.login.token;
    } catch (e) {
      throw getGraphQlError(e);
      // return getGraphQlError(e);
    }
  }

  const context = { login, connectedUser };

  console.log({ error });

  const renderContent = useMemo(() => {
    if (loading) return <div>Loading spinner...</div>;
    if (error) redirectTo('some error page ');
    return children;
  }, [loading, dataUser, children]);

  return (
    <UserContext.Provider value={context}>{renderContent}</UserContext.Provider>
  );
};

export default UserProvider;
