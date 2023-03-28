import { initialStateMock } from '@store/initialState.mock';
import { act, fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentForm } from './PaymentForm';

jest.mock('@store/ducks/subscription');

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('<PaymentForm />', () => {
  const useSelectorMock = useSelector as jest.Mock<typeof useSelector>;
  const useDispatchMock = useDispatch as jest.Mock<typeof useDispatch>;

  beforeEach(() => {
    useDispatchMock.mockImplementation((value) => value);
    useSelectorMock.mockImplementation((selector) =>
      selector(initialStateMock)
    );
  });

  it('should render', () => {
    const { container } = render(<PaymentForm />);
    expect(container).toBeInTheDocument();
  });

  it('should disable installments select if there is no offer selected', () => {
    const { container } = render(<PaymentForm />);
    const installments = container.querySelector('#installments');
    expect(installments).toBeDisabled();
  });

  it('should disable submit button if there is no offer selected or form is invalid', () => {
    useSelectorMock.mockImplementation((selector) =>
      selector({
        ...initialStateMock,
        subscription: {
          ...initialStateMock.subscription,
          installments: 2,
          netValue: 500,
        },
      })
    );

    const { getByRole } = render(<PaymentForm />);
    const button = getByRole('button');

    expect(button).toBeDisabled();
  });

  it('should show correct installments value', () => {
    useSelectorMock.mockImplementation((selector) =>
      selector({
        ...initialStateMock,
        subscription: {
          ...initialStateMock.subscription,
          installments: 2,
          netValue: 500,
        },
      })
    );

    const { getAllByRole } = render(<PaymentForm />);

    const [placeholder, ...options] = getAllByRole('option');

    expect(placeholder.textContent).toBe('Selecionar');
    expect(options).toHaveLength(2);
    expect(options[0].textContent).toMatch(/1x\sR\$\s500,00/);
    expect(options[1].textContent).toMatch(/2x\sR\$\s250,00/);
  });

  it('should submit form', () => {
    useSelectorMock.mockImplementation((selector) =>
      selector({
        ...initialStateMock,
        subscription: {
          ...initialStateMock.subscription,
          installments: 2,
          netValue: 500,
        },
      })
    );

    const { container } = render(<PaymentForm />);

    act(() => {
      fillForm(container);
      fireEvent.submit(container.querySelector('form') as Element);

      expect(useDispatchMock).toHaveBeenCalledWith();
    });
  });
});

const fillForm = (container: HTMLElement): void => {
  const creditCardNumber = container.querySelector('#creditCardNumber');
  const creditCardExpirationDate = container.querySelector(
    '#creditCardExpirationDate'
  );
  const creditCardCVV = container.querySelector('#creditCardCVV');
  const creditCardHolder = container.querySelector('#creditCardHolder');
  const creditCardCPF = container.querySelector('#creditCardCPF');
  const couponCode = container.querySelector('#couponCode');
  const installments = container.querySelector('#installments');

  fireEvent.change(creditCardNumber as Element, {
    target: { value: '1234 5678 9101' },
  });
  fireEvent.change(creditCardExpirationDate as Element, {
    target: { value: '12/30' },
  });
  fireEvent.change(creditCardCVV as Element, {
    target: { value: '456' },
  });
  fireEvent.change(creditCardHolder as Element, {
    target: { value: 'Nome do Cliente' },
  });
  fireEvent.change(creditCardCPF as Element, {
    target: { value: '111.111.111-11' },
  });
  fireEvent.change(couponCode as Element, {
    target: {
      value: 'cupom-aqui',
    },
  });
  fireEvent.select(installments as Element, {
    target: {
      value: '1',
    },
  });
};
