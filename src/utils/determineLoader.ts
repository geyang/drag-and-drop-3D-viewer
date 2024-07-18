import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';

const determineLoader = (fileType: string) => {
    console.log(`Detected file type: ${fileType}`);
    switch (fileType) {
        case 'model/gltf-binary':
        case 'model/gltf+json':
            return GLTFLoader;
        case 'image/png':
        case 'image/jpeg':
        case 'image/jpg':
            return TextureLoader;
        default:
            throw new Error(`Unsupported file type: ${fileType}`);
    }
};

export default determineLoader;
