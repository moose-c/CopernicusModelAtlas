import { getLargeFile } from '../../../../services/db.service';
import { useState, useEffect } from 'react';
import { Timeseries } from './timeseries';
import { VectorMap } from './vectormap';
import { ClickableFigure } from './image';

export const DataElement = ({ loid, name, isBar }) => {
    const [fileTypeState, setFileTypeState] = useState('');
    const [fileBin, setFileBin] = useState(null);
    const [decodedFile, setDecodedFile] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            const { data, error } = await getLargeFile(loid);
            if (error) {
                console.log(error);
            } else {
                setFileBin(data);
            }
        };

        if (loid) {
            fetchFile();
        }

        return () => {};
    }, [loid]);

    useEffect(() => {
        if (name && fileBin && fileTypeState != 'png') {
            const fileType = name.split('.')[1];
            setFileTypeState(fileType);
        }
    }, [fileBin]);

    useEffect(() => {
        if (fileTypeState == 'png') {
            const convertBlobToBase64 = async (blob) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        const base64Data = reader.result.split(',')[1]; // Remove "data:image/png;base64,"
                        resolve(base64Data);
                    };
                    reader.onerror = (error) => reject(error);
                });
            };
            convertBlobToBase64(fileBin).then((base64) => setDecodedFile(base64));
        } else if (fileTypeState == 'json' || fileTypeState == 'geojson') {
            const convertBlobToJson = async (blob) => {
                const text = await blob.text(); // Read the Blob as text
                const geojsonFile = JSON.parse(text); // Parse the JSON
                setDecodedFile(geojsonFile);
            };
            convertBlobToJson(fileBin);
        }
    }, [fileTypeState]);

    return (
        <div className="min-w-[500px] max-w-[700px]">
            {fileTypeState == 'png' && <ClickableFigure fileBin={decodedFile} />}
            {['csv', 'xlsx'].includes(fileTypeState) && <Timeseries fileBin={fileBin} isBar={isBar} />}
            {['geojson', 'json'].includes(fileTypeState) && <VectorMap geojson={decodedFile} />}
        </div>
    );
};
