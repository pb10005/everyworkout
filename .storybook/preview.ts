import type { Preview } from "@storybook/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    nextRouter: {
      Provider: AppRouterContext.Provider,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
