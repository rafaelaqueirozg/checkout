import { initialStateMock, offerFromAPIMock } from '@store/initialState.mock';
import { render } from '@testing-library/react';
import { OfferAdapter } from '@utils/adapters/Offer.adapter';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Offer } from './Offer';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@services/Checkout/CheckoutService', () => ({
  getOffers: jest.fn().mockResolvedValue(offerFromAPIMock),
  postSubscription: jest.fn(),
}));

describe('<Offer />', () => {
  const useSelectorMock = useSelector as jest.Mock<typeof useSelector>;
  const useDispatchMock = useDispatch as jest.Mock<typeof useDispatch>;
  const useNavigateMock = useNavigate as jest.Mock<typeof useNavigate>;

  beforeEach(() => {
    useDispatchMock.mockImplementation((value) => value);
    useSelectorMock.mockImplementation((selector) =>
      selector({
        ...initialStateMock,
        offer: {
          fromAPI: offerFromAPIMock,
          adapted: offerFromAPIMock.map(OfferAdapter),
        },
      })
    );
    useNavigateMock.mockImplementation(() => jest.fn());
  });

  it('should render', () => {
    const { container } = render(<Offer />);

    expect(container).toBeInTheDocument();

    const firstCard = container.querySelector('#plan32');
    const secondCard = container.querySelector('#plan33');

    expect(firstCard).toBeVisible();
    expect(secondCard).toBeVisible();
  });
});
