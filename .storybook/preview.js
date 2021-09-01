import '../styles/globals.css' // makes tailwind available also in storybook
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

/**
 * Workaround to make next/image module work in storybook without throwing error for unknown source url
 */
import * as nextImage from 'next/image';
Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => <img {...props} />
});
