import { ToastProvider } from "@heroui/react";
import type { Decorator } from "@storybook/react";

export const ToastDecorator: Decorator = (Story) => {
  return (
    <>
      <ToastProvider />
      {Story()}
    </>
  );
};
