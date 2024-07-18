import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import useFileDrop from './hooks/useFileDrop';
import determineLoader from './utils/determineLoader';

const GLBViewer: React.FC = () => {
    const [droppedModel, setDroppedModel] = useState<THREE.Object3D | null>(null);

    const handleDrop = (file: File) => {
        console.log('Dropped file:', file.name);
    };

    const loadModel = (file: File) => {
        let fileType = file.type;

        // Fallback for GLB files if the MIME type is not correctly detected
        if (file.name.endsWith('.glb')) {
            fileType = 'model/gltf-binary';
        }

        const Loader = determineLoader(fileType);
        const url = URL.createObjectURL(file);
        const loaderInstance = new Loader();

        if (Loader === GLTFLoader) {
            (loaderInstance as GLTFLoader).load(url, (gltf) => {
                setDroppedModel(gltf.scene);
            });
        } else if (Loader === TextureLoader) {
            (loaderInstance as TextureLoader).load(url, (texture) => {
                const material = new THREE.MeshBasicMaterial({ map: texture });
                const geometry = new THREE.PlaneGeometry(1, 1);
                const mesh = new THREE.Mesh(geometry, material);
                setDroppedModel(mesh);
            });
        }
    };
    const { file, onDrop, onDragOver } = useFileDrop({ handleDrop, loadModel });

    return (
        <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
                border: '2px dashed #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                width: 'calc(100% - 15px)',
                height: 'calc(100% - 100px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#ccc',
            }}
        >
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />
                {droppedModel && <primitive object={droppedModel} />}
            </Canvas>
            {!file && <p style={{position: "absolute", left: "auto"}}>Drag and drop a GLB file here</p>}
        </div>
    );
};

export default GLBViewer;
