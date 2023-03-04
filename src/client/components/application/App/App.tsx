import { type FC, lazy } from 'react';

const SignInModal = lazy(() => import('../../modal/SignInModal/SignInModal'))
const SignUpModal = lazy(() => import('../../modal/SignUpModal/SignUpModal'))
import { Providers } from '../Providers';
import { Routes } from '../Routes';

export const App: FC = () => (
  <Providers>
    <Routes />
    <SignInModal />
    <SignUpModal />
  </Providers>
);
