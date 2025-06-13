/** @jest-config-loader ts-node */

import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  collectCoverage: true,
};

export default config;