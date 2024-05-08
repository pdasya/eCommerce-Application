import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dummy } from './signUpForm.component';

describe('dummy component', () => {
  let rendered: ReturnType<typeof render>;

  beforeEach(() => {
    rendered = render(<Dummy />);
  });

  test("renders heading with 'Some header' text content", () => {
    expect(screen.getByRole('heading', { name: 'Some header' })).toBeInTheDocument();
  });

  test('renders only 1 paragraph', () => {
    const paragraphs = screen.getAllByRole('paragraph');
    expect(paragraphs.length).toBe(1);
  });

  test("contains at least 1 item with 'Some text'", () => {
    const textItems = screen.getAllByText('Some text');
    const minLength = 1;

    expect(textItems.length).toBeGreaterThanOrEqual(minLength);
  });

  test('snapshot test', () => {
    expect(rendered.asFragment()).toMatchSnapshot('dummy');
  });
});
