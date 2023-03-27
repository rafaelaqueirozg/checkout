import { render } from '@testing-library/react';
import { Offer } from './Offer';

describe('<Offer />', () => {
  it('should render', () => {
    const { container } = render(<Offer />);
    expect(container).toBeInTheDocument();
  });
});
