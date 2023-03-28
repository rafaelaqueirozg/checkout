import { fireEvent, render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { PlanCard } from './PlanCard';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('@store/ducks/subscription');

describe('<PlanCard />', () => {
  const useDispatchMock = useDispatch as jest.Mock<typeof useDispatch>;

  beforeEach(() => {
    useDispatchMock.mockImplementation((value) => value);
  });

  it('should render', () => {
    const { container, getByText } = render(
      <PlanCard
        netValue={6300}
        fullPrice={7000}
        description='Parcelado'
        discountPercentage={-10}
        id={1}
        installments={12}
        period='Anual'
        discountAmmount={700}
      />
    );

    expect(container).toBeInTheDocument();
    expect(getByText('Anual | Parcelado')).toBeInTheDocument();
    expect(
      container.querySelector('strong')?.textContent?.replace(/R\$\s/gm, 'R$')
    ).toBe('De R$7.000,00 | Por R$6.300,00');
    expect(
      container.querySelector('small')?.textContent?.replace(/R\$\s/gm, 'R$')
    ).toBe('12x de R$525,00/mês');
    expect(getByText('-10%')).toBeInTheDocument();
  });

  it('should call dispatch when select an option', () => {
    const { getByRole } = render(
      <PlanCard
        netValue={6300}
        fullPrice={7000}
        description='Parcelado'
        discountPercentage={-10}
        id={534}
        installments={12}
        period='Anual'
        discountAmmount={700}
      />
    );

    const radioElement = getByRole('radio');
    fireEvent.input(radioElement);

    expect(useDispatchMock).toHaveBeenCalled();
  });
});
