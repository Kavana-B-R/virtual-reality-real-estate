import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, Text } from "@react-three/drei";
import {
  TextureLoader,
  SphereGeometry,
  MeshBasicMaterial,
  DoubleSide,
} from "three";
import { VRScene, VRHotspot } from "@shared/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  RotateCcw,
  Home,
  Info,
  Navigation,
  Loader2,
  Volume2,
  VolumeX,
} from "lucide-react";

interface VRTourViewerProps {
  scenes: VRScene[];
  currentSceneId: string;
  onSceneChange: (sceneId: string) => void;
  onExit: () => void;
}

interface VRSphereProps {
  imageUrl: string;
  hotspots: VRHotspot[];
  onHotspotClick: (hotspot: VRHotspot) => void;
}

function VRSphere({ imageUrl, hotspots, onHotspotClick }: VRSphereProps) {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, imageUrl);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Subtle rotation
    }
  });

  return (
    <group>
      {/* Main 360° sphere */}
      <mesh ref={meshRef} scale={[-1, 1, 1]}>
        <sphereGeometry args={[10, 60, 40]} />
        <meshBasicMaterial map={texture} side={DoubleSide} />
      </mesh>

      {/* Hotspots */}
      {hotspots.map((hotspot) => (
        <group key={hotspot.id}>
          {/* Hotspot marker */}
          <mesh
            position={[
              hotspot.position.x * 8,
              hotspot.position.y * 8,
              hotspot.position.z * 8,
            ]}
            onClick={() => onHotspotClick(hotspot)}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial
              color={hotspot.type === "navigation" ? "#10b981" : "#f59e0b"}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Hotspot label */}
          <Html
            position={[
              hotspot.position.x * 8,
              hotspot.position.y * 8 + 0.3,
              hotspot.position.z * 8,
            ]}
            distanceFactor={2}
            occlude
          >
            <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
              {hotspot.title}
            </div>
          </Html>

          {/* Pulsing ring animation */}
          <mesh
            position={[
              hotspot.position.x * 8,
              hotspot.position.y * 8,
              hotspot.position.z * 8,
            ]}
          >
            <ringGeometry args={[0.15, 0.25, 16]} />
            <meshBasicMaterial
              color={hotspot.type === "navigation" ? "#10b981" : "#f59e0b"}
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex items-center gap-2 text-white">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Loading VR Scene...</span>
      </div>
    </Html>
  );
}

export function VRTourViewer({
  scenes,
  currentSceneId,
  onSceneChange,
  onExit,
}: VRTourViewerProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<VRHotspot | null>(
    null,
  );
  const [isMuted, setIsMuted] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const currentScene = scenes.find((scene) => scene.id === currentSceneId);

  if (!currentScene) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Scene not found</h2>
          <Button onClick={onExit} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Property
          </Button>
        </div>
      </div>
    );
  }

  const handleHotspotClick = (hotspot: VRHotspot) => {
    setSelectedHotspot(hotspot);

    if (hotspot.type === "navigation" && hotspot.targetSceneId) {
      // Add small delay for better UX
      setTimeout(() => {
        onSceneChange(hotspot.targetSceneId!);
        setSelectedHotspot(null);
      }, 300);
    }
  };

  const navigationHotspots = currentScene.hotspots.filter(
    (h) => h.type === "navigation",
  );
  const infoHotspots = currentScene.hotspots.filter((h) => h.type === "info");

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* VR Canvas */}
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75 }}
        style={{ height: "100vh", width: "100vw" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <VRSphere
            imageUrl={currentScene.image360}
            hotspots={currentScene.hotspots}
            onHotspotClick={handleHotspotClick}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.1}
          rotateSpeed={-0.5}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 pointer-events-auto">
          <div className="flex items-center gap-4">
            <Button
              onClick={onExit}
              variant="secondary"
              size="sm"
              className="bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit VR Tour
            </Button>

            <Badge className="bg-emerald-600 text-white">
              {currentScene.name}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowInfo(!showInfo)}
              variant="secondary"
              size="sm"
              className="bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              <Info className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="secondary"
              size="sm"
              className="bg-black/50 hover:bg-black/70 text-white border-white/20"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Scene Navigation */}
        {navigationHotspots.length > 0 && (
          <div className="absolute bottom-4 left-4 pointer-events-auto">
            <Card className="bg-black/80 border-white/20">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Navigation className="w-4 h-4" />
                  Navigate to
                </h3>
                <div className="space-y-2">
                  {navigationHotspots.map((hotspot) => (
                    <Button
                      key={hotspot.id}
                      onClick={() => handleHotspotClick(hotspot)}
                      variant="outline"
                      size="sm"
                      className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      {hotspot.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Scene Info Panel */}
        {showInfo && (
          <div className="absolute bottom-4 right-4 pointer-events-auto">
            <Card className="bg-black/80 border-white/20 max-w-sm">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2">
                  {currentScene.name}
                </h3>
                {currentScene.description && (
                  <p className="text-gray-300 text-sm mb-3">
                    {currentScene.description}
                  </p>
                )}

                {infoHotspots.length > 0 && (
                  <div>
                    <h4 className="text-white font-medium mb-2 text-sm">
                      Points of Interest:
                    </h4>
                    <div className="space-y-1">
                      {infoHotspots.map((hotspot) => (
                        <div key={hotspot.id} className="text-gray-300 text-xs">
                          • {hotspot.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Scene Selector */}
        {scenes.length > 1 && (
          <div className="absolute top-20 left-4 pointer-events-auto">
            <Card className="bg-black/80 border-white/20">
              <CardContent className="p-3">
                <h3 className="text-white font-semibold mb-2 text-sm">
                  Scenes
                </h3>
                <div className="space-y-1">
                  {scenes.map((scene) => (
                    <Button
                      key={scene.id}
                      onClick={() => onSceneChange(scene.id)}
                      variant={
                        scene.id === currentSceneId ? "default" : "outline"
                      }
                      size="sm"
                      className={`w-full text-xs ${
                        scene.id === currentSceneId
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                      }`}
                    >
                      {scene.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <Badge className="bg-black/50 text-white border-white/20">
            Drag to look around • Click hotspots to navigate
          </Badge>
        </div>

        {/* Selected Hotspot Info */}
        {selectedHotspot && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <Card className="bg-black/90 border-white/20">
              <CardContent className="p-4 text-center">
                <h3 className="text-white font-semibold mb-2">
                  {selectedHotspot.title}
                </h3>
                {selectedHotspot.description && (
                  <p className="text-gray-300 text-sm mb-3">
                    {selectedHotspot.description}
                  </p>
                )}
                {selectedHotspot.type === "navigation" ? (
                  <Badge className="bg-emerald-600 text-white">
                    Navigating...
                  </Badge>
                ) : (
                  <Button
                    onClick={() => setSelectedHotspot(null)}
                    variant="outline"
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  >
                    Close
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
