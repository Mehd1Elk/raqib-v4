import { fireEvent, render, screen } from '@testing-library/react';
import { EntityTabs } from '@/components/EntityTabs';

describe('EntityTabs', () => {
  test('renders 10 entity tabs', () => {
    render(<EntityTabs activeIndex={0} onChange={() => undefined} />);

    expect(screen.getAllByRole('button')).toHaveLength(10);
  });

  test('switches entity when a tab is clicked', () => {
    const onChange = vi.fn();
    render(<EntityTabs activeIndex={0} onChange={onChange} />);

    fireEvent.click(screen.getByRole('button', { name: /CG SA/i }));

    expect(onChange).toHaveBeenCalledWith(8);
  });

  test('shows the entity type labels', () => {
    render(<EntityTabs activeIndex={0} onChange={() => undefined} />);

    expect(screen.getAllByText('BRIQUE').length).toBeGreaterThan(0);
    expect(screen.getAllByText('VENTURE').length).toBe(3);
    expect(screen.getByText('HOLDING')).toBeInTheDocument();
    expect(screen.getByText('ECOSYSTEM')).toBeInTheDocument();
  });
});
