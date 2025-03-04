import { getLargeFile } from '../../../../services/db.service';
import { useState, useEffect } from 'react';
import { Timeseries } from './timeseries';
import { Figure } from './image';

export const DataElement = ({ loid, name }) => {
    const [fileTypeState, setFileTypeState] = useState('');
    const [fileBin, setFileBin] = useState(null);

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
        if (name && fileBin) {
            const fileType = name.split('.')[1];
            setFileTypeState(fileType);
        }
    }, [fileBin]);

    return (
        <div className="min-w-[500px] max-w-[700px]">
            {fileTypeState == 'png' && <Figure fileBin={fileBin} />}
            {['csv', 'xlsx'].includes(fileTypeState) && <Timeseries fileBin={fileBin} />}
        </div>
    );
};
