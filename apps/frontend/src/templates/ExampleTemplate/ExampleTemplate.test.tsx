import { render, screen } from '@testing-library/react';

import { exampleTemplateMock } from './ExampleTemplate.mock';

import { ExampleTemplate } from '.';
import { vitest } from 'vitest';

vitest.mock('@/components/Example', () => ({
  Example: () => <div data-testid="example-mock" />,
}));

describe('<ExampleTemplate />', () => {
  it('should render heading', () => {
    render(<ExampleTemplate {...exampleTemplateMock} />);

    const heading = screen.getByRole('heading', {
      name: exampleTemplateMock.heading,
    });

    expect(heading).toBeInTheDocument();
  });

  it('should render Example component', () => {
    render(<ExampleTemplate {...exampleTemplateMock} />);

    const ExampleMock = screen.getByTestId('example-mock');

    expect(ExampleMock).toBeInTheDocument();
  });
});
