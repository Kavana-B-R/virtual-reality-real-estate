import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '@shared/types';
import { mockProperties } from '@/data/properties';
import { VRTourViewer } from '@/components/VRTourViewer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, AlertCircle, Headset } from 'lucide-react';

export default function VRTour() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const [currentSceneId, setCurrentSceneId] = useState<string>('');
  
  const property = mockProperties.find(p => p.id === propertyId);

  useEffect(() => {
    if (property?.vrTour.scenes.length > 0) {
      setCurrentSceneId(property.vrTour.scenes[0].id);
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
            <p className="text-gray-600 mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!property.vrTour.available || property.vrTour.scenes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <Headset className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">VR Tour Unavailable</h2>
            <p className="text-gray-600 mb-2">
              VR tour is not available for this property.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              "{property.title}"
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate(`/property/${property.id}`)} className="w-full">
                View Property Details
              </Button>
              <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Properties
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSceneChange = (sceneId: string) => {
    setCurrentSceneId(sceneId);
  };

  const handleExitVR = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="h-screen overflow-hidden">
      <VRTourViewer
        scenes={property.vrTour.scenes}
        currentSceneId={currentSceneId}
        onSceneChange={handleSceneChange}
        onExit={handleExitVR}
      />
    </div>
  );
}
