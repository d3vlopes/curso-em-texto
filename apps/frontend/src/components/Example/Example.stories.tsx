import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { exampleMock } from './Example.mock';

import { Example } from '.';

const meta = {
  title: 'Example',
  component: Example,
  args: { ...exampleMock, size: 'md' },
  // seta a cor de background
  // globals: {
  //   backgrounds: { value: 500 },
  // },
} satisfies Meta<typeof Example>;

export default meta;

type Story = StoryObj<typeof meta>;

const template: Story = {
  render: (args) => (
    <>
      <Example {...args} />
    </>
  ),
};

export const Default: Story = {
  ...template,
};

export const Large: Story = {
  ...template,
  args: { size: 'lg' },
};

export const CustomClass: Story = {
  ...template,
  args: { className: 'bg-red-500' },
};
