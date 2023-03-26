import { render } from '@testing-library/react';
import { Badge } from './Badge';

describe('<Badge />', () => {
  it('should render', () => {
    const { container, getByText } = render(
      <Badge label='Teste' color='primary' />
    );
    expect(container).toBeInTheDocument();
    expect(getByText('Teste')).toBeInTheDocument();
  });
});
