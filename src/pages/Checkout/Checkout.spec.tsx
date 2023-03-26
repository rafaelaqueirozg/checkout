import { render } from '@testing-library/react';
import { Checkout } from './Checkout';

jest.mock('@components/Payment/Payment');

describe('<Checkout />', () => {
  it('should render', () => {
    const { container } = render(<Checkout />);
    expect(container).toBeInTheDocument();
  });
});
