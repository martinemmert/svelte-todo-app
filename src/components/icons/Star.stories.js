import Centered from "@storybook/addon-centered/svelte";
import Star from "./Star.svelte";

export default {
  title: "Global | Icons / Star",
  component: Star,
  decorators: [Centered],
};

export const Default = () => ({
  Component: Star,
});

export const Half = () => ({
  Component: Star,
  props: {
    half: true,
  },
});

export const Outline = () => ({
  Component: Star,
  props: {
    outline: true,
  },
});
