import InlinePopUpStory from "./InlinePopUpStory.svelte";
import Centered from "@storybook/addon-centered/svelte";

export default {
  title: "App | InlinePopUpStory",
  component: InlinePopUpStory,
  decorators: [Centered]
};

export const Default = () => ({
  Component: InlinePopUpStory
});
