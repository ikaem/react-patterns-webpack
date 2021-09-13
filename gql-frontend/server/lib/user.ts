import { Request, Response, NextFunction } from 'express';
import { getUserData } from './jwt';

// we are immediatelly setting some stuff here
// this is a higher order component
// the second part is called later, but the actual route handler
export const isConnected =
  (isLogged = true, privileges = ['user'], redirectTo = '/') =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //   here we are getting the user from the cookie
    const user = await getUserData(req.cookies.token);

    // if user is not logged, and they dont exist, we can let them go

    if (!user && !isLogged) {
      return next();
      //   this should render the app, i guess
    }

    if (user && isLogged) {
      // check priviliges - if god
      if (privileges.includes('god') && user.privilege === 'god') {
        return next();
      }

      if (privileges.includes('admin') && user.privilege === 'admin') {
        return next();
      }

      //   otherwise, just redirect to somewhere

      res.redirect(redirectTo);
    } else {
      // this is in case the user is not logged in, or connected, as they would say
      res.redirect(redirectTo);
    }
  };
