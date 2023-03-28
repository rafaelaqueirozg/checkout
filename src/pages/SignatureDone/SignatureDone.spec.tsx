import { initialStateMock, offerFromAPIMock } from '@store/initialState.mock';
import { render } from '@testing-library/react';
import { OfferAdapter } from '@utils/adapters/Offer.adapter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SignatureDone } from './SignatureDone';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@store/ducks/subscription');

describe('<SignatureDone />', () => {
  const useSelectorMock = useSelector as jest.Mock<typeof useSelector>;
  const useDispatchMock = useDispatch as jest.Mock<typeof useDispatch>;
  const useNavigateMock = useNavigate as jest.Mock<typeof useNavigate>;

  beforeEach(() => {
    useDispatchMock.mockImplementation((value) => value);
    useSelectorMock.mockImplementation((selector) =>
      selector({
        ...initialStateMock,
        subscription: {
          offerId: 32,
          creditCardCPF: '11111111111',
          creditCardCVV: '123',
          creditCardExpirationDate: '12/25',
          creditCardHolder: 'Fulano Cicrano',
          creditCardNumber: '0000000000000000',
          installments: 2,
          userId: 1,
          gateway: 'iugu',
          couponCode: '',
          netValue: 1000,
          canPost: true,
        },
        offer: {
          fromAPI: offerFromAPIMock,
          adapted: offerFromAPIMock.map(OfferAdapter),
        },
      })
    );
    // useNavigateMock.mockImplementation(() => jest.fn());
  });

  it('should render', () => {
    const { container, getByText } = render(<SignatureDone />);

    expect(container).toBeInTheDocument();
    expect(getByText('Parabéns!')).toBeInTheDocument();
    expect(
      getByText('Sua assinatura foi realizada com sucesso.')
    ).toBeInTheDocument();
    expect(getByText('Anual | Parcelado')).toBeInTheDocument();
    expect(getByText('E-mail')).toBeInTheDocument();
    expect(getByText('fulano@cicrano.com.br')).toBeInTheDocument();
    expect(getByText('CPF')).toBeInTheDocument();
    expect(getByText('111.111.111-11')).toBeInTheDocument();

    const buttons = container.querySelectorAll('button');

    expect(buttons).toHaveLength(2);
    expect(buttons[0].textContent).toBe('Gerenciar assinatura');
    expect(buttons[1].textContent).toBe('IR PARA A HOME');
  });
});
