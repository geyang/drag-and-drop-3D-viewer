import { useState, useCallback } from 'react';

interface FileDropProps {
    handleDrop: (file: File) => void;
    loadModel: (file: File) => void;
}

const useFileDrop = ({ handleDrop, loadModel }: FileDropProps) => {
    const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files) as File[];
        const droppedFile = droppedFiles[0];
        setFile(droppedFile);
        handleDrop(droppedFile);
        loadModel(droppedFile);
    }, [handleDrop, loadModel]);

    const onDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    return {
        file,
        onDrop,
        onDragOver,
    };
};

export default useFileDrop;
