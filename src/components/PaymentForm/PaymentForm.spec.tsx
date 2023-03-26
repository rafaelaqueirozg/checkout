import { render } from '@testing-library/react';
import { PaymentForm } from './PaymentForm';

describe('<PaymentForm />', () => {
  it('should render', () => {
    const { container } = render(<PaymentForm />);
    expect(container).toBeInTheDocument();
  });
});
