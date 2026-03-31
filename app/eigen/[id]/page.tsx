import { ArtifactViewer } from '@/components/ArtifactViewer';
import { VizRenderer } from '@/components/viz/VizRenderer';
import { getArtifactName } from '@/lib/viz-routing';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EigenLayerPage({ params }: PageProps) {
  const { id } = await params;
  const artifactName = getArtifactName(id);

  if (artifactName) {
    return (
      <div className="min-h-screen bg-[#FDFAF3] p-6">
        <ArtifactViewer artifactName={artifactName} height={800} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFAF3] p-6">
      <VizRenderer
        layerId={id}
        layerName={`EIGEN ${id.toUpperCase()}`}
        platformName="EIGEN"
        categoryLabel="Couche EIGEN"
        entityColor="#B8963E"
      />
    </div>
  );
}

export function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `ei${String(i + 1).padStart(2, '0')}`,
  }));
}
