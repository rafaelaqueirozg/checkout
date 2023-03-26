import { render } from '@testing-library/react';
import App from './App';

jest.mock('@components/Header/Header');

describe('<App />', () => {
  it('should render', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
