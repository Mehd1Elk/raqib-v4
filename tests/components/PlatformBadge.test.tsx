import { render, screen } from '@testing-library/react';
import { PlatformBadge } from '@/components/PlatformBadge';

describe('PlatformBadge', () => {
  test('renders the configured platform name', () => {
    render(<PlatformBadge platform="CC" />);

    expect(screen.getByText('Claude Code')).toBeInTheDocument();
  });

  test('renders nothing for an unknown platform code', () => {
    const { container } = render(<PlatformBadge platform={'ZZ' as never} />);

    expect(container).toBeEmptyDOMElement();
  });
});
