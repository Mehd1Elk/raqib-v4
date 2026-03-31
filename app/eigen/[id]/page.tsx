import { ArtifactViewer } from '@/components/ArtifactViewer';
import { VizRenderer } from '@/components/viz/VizRenderer';
import { ExportPDFButton } from '@/components/ExportPDFButton';
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
        <div className="flex justify-end mb-4">
          <ExportPDFButton elementId="layer-content" title={`EIGEN ${id.toUpperCase()}`} />
        </div>
        <div id="layer-content">
          <ArtifactViewer artifactName={artifactName} height={800} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFAF3] p-6">
      <div className="flex justify-end mb-4">
        <ExportPDFButton elementId="layer-content" title={`EIGEN ${id.toUpperCase()}`} />
      </div>
      <div id="layer-content">
        <VizRenderer
          layerId={id}
          layerName={`EIGEN ${id.toUpperCase()}`}
          platformName="EIGEN"
          categoryLabel="Couche EIGEN"
          entityColor="#B8963E"
        />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({
    id: `ei${String(i + 1).padStart(2, '0')}`,
  }));
}
