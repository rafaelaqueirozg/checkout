import { cleanup, fireEvent, render } from '@testing-library/react';
import { Header } from './Header';

const useNavigateMock = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => useNavigateMock,
}));

describe('<Header />', () => {
  afterAll(cleanup);

  it('should render', () => {
    const { getByTestId } = render(<Header />);

    const button = getByTestId('back-button');
    expect(button).toBeVisible();
    expect(button.getAttribute('aria-label')).toBe('Voltar');

    const logo = getByTestId('logo');
    expect(logo).toBeVisible();
    expect(logo.getAttribute('alt'))
      .toBe(`Logo com um vetor com o formato parecido com a letra N espelhada,
        de bordas arredondadas, na cor azul escuro e um círculo pequeno na cor laranja`);

    const emptyDiv = getByTestId('empty-div');
    expect(emptyDiv).toBeInTheDocument();
    expect(emptyDiv?.textContent).toBeFalsy();
  });

  it('should click on back button', () => {
    const { getByTestId } = render(<Header />);

    const button = getByTestId('back-button');
    fireEvent.click(button);

    expect(useNavigateMock).toHaveBeenCalledTimes(1);
  });
});
