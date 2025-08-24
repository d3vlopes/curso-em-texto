import { render, screen } from '@testing-library/react';

import { exampleMock } from './Example.mock';

import { Example } from '.';

describe('<Example />', () => {
  it('should render link', () => {
    render(<Example {...exampleMock} />);

    const link = screen.getByRole('link', { name: 'Contribua no Github' });

    expect(link).toHaveAttribute('href', exampleMock.githubURL);
  });

  it('should render by md size by default', () => {
    render(<Example {...exampleMock} />);

    const cardContainer = screen.getByTestId('card-container');

    expect(cardContainer).toHaveClass('w-[21.3125rem]');
  });

  it('should render lg size', () => {
    render(<Example size="lg" {...exampleMock} />);

    const cardContainer = screen.getByTestId('card-container');

    expect(cardContainer).toHaveClass('w-[27.5rem]');
  });

  it('should render custom class', () => {
    render(<Example className="custom-class" {...exampleMock} />);

    const cardContainer = screen.getByTestId('card-container');

    expect(cardContainer).toHaveClass('custom-class');
  });
});
