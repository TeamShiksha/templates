import rootConfig from '../../eslint.config.mjs';

export default {
  ...rootConfig,
  rules: {
    ...rootConfig.rules,
    // ui-specific override
  },
};
