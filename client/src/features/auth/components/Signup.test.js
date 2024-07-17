import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store'; 

import Signup from './Signup';
import { createUserAsync } from '../authSlice';

const mockStore = configureStore([]);

describe('Signup Component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        loggedInUser: null,
      },
    });
  });

  test('renders signup form', () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Confirm Password/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const email = 'test@example.com';
    const password = 'Test@1234';

    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: email },
    });

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: password },
    });

    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: password },
    });

    fireEvent.submit(screen.getByTestId('signup-form'));

    await waitFor(() =>
      expect(store.getActions()).toContainEqual(
        createUserAsync({
          email,
          password,
          addresses: [],
          role: 'user',
        })
      )
    );
  });
});
