import { fireEvent, render, screen } from '@testing-library/react';
import { CategoryNav } from '@/components/CategoryNav';
import { ENTITIES } from '@/lib/constants';
import { getEntityLayers } from '@/lib/mock-data';

describe('CategoryNav', () => {
  test('shows the strategic label for holding entities', () => {
    render(
      <CategoryNav
        entity={ENTITIES[8]}
        categories={getEntityLayers('cg')}
        activeCategoryIndex={0}
        activeLayerIndex={0}
        onCategoryChange={() => undefined}
        onLayerChange={() => undefined}
      />,
    );

    expect(screen.getByText('10 AXES STRATÉGIQUES × 10 COUCHES')).toBeInTheDocument();
  });

  test('shows the macro/sub label for brique entities', () => {
    render(
      <CategoryNav
        entity={ENTITIES[0]}
        categories={getEntityLayers('noos')}
        activeCategoryIndex={0}
        activeLayerIndex={0}
        onCategoryChange={() => undefined}
        onLayerChange={() => undefined}
      />,
    );

    expect(screen.getByText('10 MACRO × 10 SUB = 100 COUCHES SPÉCIFIQUES')).toBeInTheDocument();
  });

  test('emits layer changes when a layer is clicked', () => {
    const onLayerChange = vi.fn();
    render(
      <CategoryNav
        entity={ENTITIES[0]}
        categories={getEntityLayers('noos')}
        activeCategoryIndex={0}
        activeLayerIndex={0}
        onCategoryChange={() => undefined}
        onLayerChange={onLayerChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Pédopsychiatres/i }));
    expect(onLayerChange).toHaveBeenCalledWith(5);
  });
});
