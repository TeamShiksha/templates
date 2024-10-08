import rootConfig from '../../eslint.config.mjs';

export default {
  ...rootConfig,
  rules: {
    ...rootConfig.rules,
    'react/react-in-jsx-scope': 'off', // ui-specific override
  },
};
