import { createContext } from 'react';

export const AppContext = createContext({
  locale: 'nl',
  portalCode: '',
  objectCode: ''
});
