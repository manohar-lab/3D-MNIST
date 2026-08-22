import { Canvas } from '@react-three/fiber'
import { ContactShadows, Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { DigitModel } from './DigitModel'
import type { Digit, ViewerSettings } from '../types/digit'

export default function DigitViewer({ digit, settings, resetSignal, variation }: { digit: Digit; settings: ViewerSettings; resetSignal: number; variation: number }) {
  const controls = useRef<any>(null)
  useEffect(() => {
    if (resetSignal > 0) controls.current?.reset()
  }, [resetSignal])
  const lightColor = settings.lighting === 'warm' ? '#ffd2a6' : settings.lighting === 'neon' ? '#a9b7ff' : '#dcebe8'
  return <div className="viewer-canvas">
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0.3, 6.4]} fov={42} />
      <color attach="background" args={['#11151d']} />
      <ambientLight intensity={settings.lighting === 'neon' ? 0.35 : 0.65} />
      <directionalLight castShadow position={[-3, 4, 4]} intensity={2.5} color={lightColor} shadow-mapSize={[2048, 2048]} />
      <pointLight position={[3, -2, 3]} intensity={settings.lighting === 'neon' ? 5 : 2} color={settings.lighting === 'warm' ? '#ff7d55' : '#69d9ff'} />
      <DigitModel digit={digit} settings={settings} variation={variation} />
      <Grid args={[12, 12]} cellSize={0.5} cellThickness={0.45} cellColor="#26333c" sectionSize={2} sectionThickness={0.8} sectionColor="#40545b" position={[0, -1.62, 0]} />
      <ContactShadows position={[0, -1.6, 0]} opacity={0.55} scale={5} blur={2.5} far={4} color="#000000" />
      <OrbitControls ref={controls} makeDefault enableDamping minDistance={3.5} maxDistance={10} />
    </Canvas>
    <div className="viewer-label"><span className="status-dot" /> Live geometry / local pipeline</div>
  </div>
}
