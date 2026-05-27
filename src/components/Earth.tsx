import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import earthVertexShader from './shaders/earth/vertex.glsl';
import earthFragmentShader from './shaders/earth/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphere/vertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphere/fragment.glsl';

interface EarthProps {
  scale?: number;
}

const Earth = ({ scale = 1 }: EarthProps) => {
  const earthRef = useRef<THREE.Mesh>();
  const atmosphereRef = useRef<THREE.Mesh>();
  const starsRef = useRef<THREE.Points>();

  const starCount = 2000;
  const [starPositions] = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = 50 + Math.random() * 100; // Stars between 50 and 150 units away
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    return [positions];
  }, []);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    
    const earthDayTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
    const earthNightTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png');
    const earthSpecularCloudsTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_2048.png');
    const earthBumpMapTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');

    earthDayTexture.colorSpace = THREE.SRGBColorSpace;
    earthNightTexture.colorSpace = THREE.SRGBColorSpace;
    
    [earthDayTexture, earthNightTexture, earthSpecularCloudsTexture, earthBumpMapTexture].forEach(texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16;
    });

    if (earthRef.current) {
      const material = earthRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uDayTexture.value = earthDayTexture;
      material.uniforms.uNightTexture.value = earthNightTexture;
      material.uniforms.uSpecularCloudsTexture.value = earthSpecularCloudsTexture;
      material.uniforms.uBumpTexture.value = earthBumpMapTexture;
    }
  }, []);

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
      
      const sunDirection = new THREE.Vector3(
        Math.cos(state.clock.elapsedTime * 0.2),
        0.5,
        Math.sin(state.clock.elapsedTime * 0.2)
      ).normalize();

      const earthMaterial = earthRef.current.material as THREE.ShaderMaterial;
      const atmosphereMaterial = atmosphereRef.current?.material as THREE.ShaderMaterial;

      earthMaterial.uniforms.uSunDirection.value.copy(sunDirection);
      if (atmosphereMaterial) {
        atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection);
      }
    }

    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group scale={scale}>
      {/* Background Stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          sizeAttenuation={true}
          color="#ffffff"
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={{
            uDayTexture: { value: null },
            uNightTexture: { value: null },
            uSpecularCloudsTexture: { value: null },
            uBumpTexture: { value: null },
            uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
            uAtmosphereDayColor: { value: new THREE.Color('#00aaff') },
            uAtmosphereTwilightColor: { value: new THREE.Color('#ff6600') }
          }}
        />
      </mesh>

      <mesh ref={atmosphereRef} scale={1.025}>
        <sphereGeometry args={[2, 128, 128]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          uniforms={{
            uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
            uAtmosphereDayColor: { value: new THREE.Color('#00aaff') },
            uAtmosphereTwilightColor: { value: new THREE.Color('#ff6600') }
          }}
          transparent
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default Earth;