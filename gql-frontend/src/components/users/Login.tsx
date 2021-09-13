import { redirectTo } from '@contentpi/lib';
import { useState } from 'react';

interface IProps {
  login(input: {
    email: string;
    password: string;
  }): Promise<string | Error | null>;

  currentUrl: string;
}

const Login: React.FC<IProps> = ({ login, currentUrl }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    //   here we wait for the response
    try {
      const response = await login(values);

      redirectTo(currentUrl || '/');
    } catch (e) {
      setInvalidLogin(true);
      setErrorMessage((e as any).message);
    }
  };

  return (
    // <StyledLogin>
    <div className='wrapper'>
      {invalidLogin && <div className='alert'>{errorMessage}</div>}

      <div className='form'>
        <p>
          <input
            type='email'
            name='email'
            autoComplete='off'
            value={values.email}
            className='email'
            onChange={onChange}
          />
        </p>
        <p>
          <input
            type='password'
            name='password'
            autoComplete='off'
            value={values.password}
            className='password'
            onChange={onChange}
          />
        </p>

        <div className='actions'>
          <button name='login' onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
    // </StyledLogin>
  );
};

export default Login;
