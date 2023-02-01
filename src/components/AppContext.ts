import { createContext } from 'react';
import { LocaleType } from '../types';

export const AppContext = createContext<AppContextType>({
  locale: 'nl',
  portalCode: '',
  objectCode: ''
});

type AppContextType = {
  locale: LocaleType;
  portalCode: string;
  objectCode: string;
};
