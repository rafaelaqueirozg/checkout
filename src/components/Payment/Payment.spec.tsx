import { render } from '@testing-library/react';
import { Payment } from './Payment';

jest.mock('@components/PaymentForm/PaymentForm');

describe('<Payment />', () => {
  it('should render', () => {
    const { getByText, getByTestId, getAllByTestId } = render(<Payment />);

    expect(getByText('Estamos quase lá!')).toBeInTheDocument();
    expect(
      getByText('Insira seus dados de pagamento abaixo:')
    ).toBeInTheDocument();
    expect(getByText('Pagamentos por')).toBeInTheDocument();

    expect(getAllByTestId('card-brand')).toHaveLength(5);
    expect(getByTestId('iugu-logo')).toBeInTheDocument();
  });
});
