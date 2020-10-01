import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import Main, { MainProps } from "./index";

export default {
  title: "react-form/basic",
  component: Main,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<MainProps> = (args) => <Main {...args} />;

export const Example = Template.bind({});
Example.args = {
  name: "demian",
};
