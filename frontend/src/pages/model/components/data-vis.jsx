import { getLargeFile } from '../../../services/db.service';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, TimeScale, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Required for time-based charts
import { Line } from 'react-chartjs-2';
import { getJsDateFromExcel } from 'excel-date-to-js';

// Register necessary components
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, TimeScale, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            type: 'time',
            time: {
                tooltipFormat: 'yyyy-MM-dd', // Format for tooltips
            },
            title: {
                display: true,
                text: 'Time', // Label for the x-axis
            },
        },
        y: {
            title: {
                display: true,
            },
        },
    },
};

export const DataElement = ({ loid, name }) => {
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
        if (name && fileBin) {
            const fileType = name.split('.')[1];
            setFileTypeState(fileType);
            if (fileType == 'png') {
                console.log(fileType);
                // Convert Blob to JSON
                const url = URL.createObjectURL(fileBin);
                setDecodedFile(url);
            } else if (fileType == 'csv') {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const data = e.target.result;

                    // Parse the Excel file using SheetJS (XLSX)
                    const workbook = XLSX.read(data, { type: 'binary' });

                    // Assuming you're reading the first sheet:
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    console.log(worksheet);

                    // Convert the worksheet to JSON (array of objects)
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    console.log(jsonData);

                    const labels = jsonData.map((item) => {
                        let date;
                        try {
                            date = getJsDateFromExcel(item.time);
                        } catch (error) {
                            console.log('decoding dates failed', item.time);
                            date = item.time;
                        }
                        return date;
                    });

                    // Extract values for different energy categories (y-axis)
                    const datasets = [
                        {
                            label: 'Final Energy',
                            data: jsonData.map((item) => item['Final Energy']),
                            borderColor: 'blue',
                            fill: false,
                        },
                        {
                            label: 'Final Energy|Residential and Commercial',
                            data: jsonData.map((item) => item['Final Energy|Residential and Commercial']),
                            borderColor: 'red',
                            fill: false,
                        },
                        {
                            label: 'Final Energy|Industry',
                            data: jsonData.map((item) => item['Final Energy|Industry']),
                            borderColor: 'green',
                            fill: false,
                        },
                        {
                            label: 'Final Energy|Transportation',
                            data: jsonData.map((item) => item['Final Energy|Transportation']),
                            borderColor: 'orange',
                            fill: false,
                        },
                    ];

                    const chartData = {
                        labels: labels,
                        datasets: datasets,
                    };

                    setDecodedFile(chartData);
                };

                reader.readAsBinaryString(fileBin);
            }
        }
    }, [fileBin]);

    return (
        <>
            {fileTypeState == 'png' && (
                <img
                    src={decodedFile}
                    alt="Model Icon"
                    className="max-w-[500px]" // Maximum width and height
                />
            )}
            {['csv', 'xlsx'].includes(fileTypeState) && decodedFile && <Line options={options} data={decodedFile} className="w-[800px]" />}
        </>
    );
};
