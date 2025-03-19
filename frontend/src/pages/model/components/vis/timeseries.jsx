import Multiselect from 'multiselect-react-dropdown';
import 'chartjs-adapter-date-fns'; // Required for time-based charts
import { Line, Bar } from 'react-chartjs-2';
import { getJsDateFromExcel } from 'excel-date-to-js';
import { colorPalette } from '../../../../util/globalVars';
import * as XLSX from 'xlsx';
import { useState, useEffect, useRef } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import IconWithTooltip from 'icon-with-tooltip';

import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    TimeScale,
    Tooltip,
    Legend,
    Title,
    BarController,
    BarElement,
} from 'chart.js';

// Register the necessary components for Line and Bar charts
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, TimeScale, Tooltip, Legend, Title, BarController, BarElement);

export const Timeseries = ({ fileBin, isBar }) => {
    const [decodedFile, setDecodedFile] = useState(null);

    const [inpVar2Name, setInpVar2Name] = useState('');
    const [inpVar2Options, setInpVar2Options] = useState([]);
    const [inpVar2Val, setInpVar2Val] = useState([]);
    const [inpVar3Name, setInpVar3Name] = useState('');
    const [inpVar3Val, setInpVar3Val] = useState([]);
    const [inpVar3Options, setInpVar3Options] = useState([]);

    const [outVarVal, setOutVarVal] = useState([]);
    const [outVarOptions, setOutVarOptions] = useState([]);

    const allDataRef = useRef([]);

    const [plotOptions, setPlotOptions] = useState({
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
                    tooltipFormat: 'yyyy-MM-dd',
                },
                title: {
                    display: true,
                    text: 'Time',
                },
                ticks: {
                    source: 'data',
                },
            },
            y: {
                title: {
                    display: true,
                    text: '',
                },
            },
        },
        elements: {
            point: {
                radius: 2, // Default point size (smaller dots)
                hoverRadius: 4, // Slightly larger when hovering
            },
            line: {
                borderWidth: 1, // Thinner line
            },
        },
    });

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;

            // Parse the Excel file using SheetJS (XLSX)
            const workbook = XLSX.read(data, { type: 'binary' });

            // Assuming you're reading the first sheet:
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Convert the worksheet to JSON (array of objects)
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            allDataRef.current = jsonData;

            if (worksheet?.B1) {
                setInpVar2Name(worksheet.B1.v);
                const constVar2 = [];
                for (let i = 3; i < jsonData.length; i++) {
                    const newVal = worksheet?.[`B${i}`]?.v;
                    if (newVal && !constVar2.includes(newVal)) {
                        constVar2.push(newVal);
                    }
                }
                setInpVar2Options(constVar2);

                try {
                    const defVals = worksheet.B3.v.split('&');
                    for (const val of defVals) {
                        if (!constVar2.includes(val)) {
                            throw 'incorrect default value';
                        }
                    }
                    setInpVar2Val(defVals);
                } catch {
                    console.error('Error processing default values:', err);
                    alert('No or incorrect default value specified, using first value');
                    setInpVar2Val([constVar2[0]]);
                }
            }

            if (worksheet?.C1) {
                setInpVar3Name(worksheet.C1.v);
                const constVar3 = [];
                for (let i = 3; i < jsonData.length; i++) {
                    const newVal = worksheet?.[`C${i}`]?.v;
                    if (newVal && !constVar3.includes(newVal)) {
                        constVar3.push(newVal);
                    }
                }

                setInpVar3Options(constVar3);
                try {
                    const defVals = worksheet.C3.v.split('&');
                    for (const val of defVals) {
                        if (!constVar3.includes(val)) {
                            throw 'incorrect default value';
                        }
                    }
                    setInpVar3Val(defVals);
                } catch (err) {
                    console.error('Error processing default values:', err);
                    alert('No or incorrect default value specified, using first value');
                    setInpVar3Val([constVar3[0]]);
                }
            }

            const constOutNames = [];
            for (let cellNB of Object.keys(worksheet)) {
                if (cellNB.slice(1) === '1') {
                    if (!['A', 'B', 'C'].includes(cellNB[0])) {
                        const outVar = worksheet[cellNB].v;
                        constOutNames.push(outVar);
                    }
                } else {
                    break;
                }
            }
            setOutVarOptions(constOutNames);

            // Setting starting values for output variables
            const filteredKeys = Object.keys(worksheet).filter((key) => /[a-zA-Z]3$/.test(key));
            const startingOutputValues = [];
            for (const key of filteredKeys) {
                if (!['A3', 'B3', 'C3'].includes(key) && eval(worksheet[key].v)) {
                    const variableKey = key.slice(0, -1) + '1';
                    startingOutputValues.push(worksheet[variableKey].v);
                }
            }
            setOutVarVal(startingOutputValues);
        };
        reader.readAsBinaryString(fileBin);
    }, []);

    useEffect(() => {
        console.log('changing plotting');
        if (outVarVal != [0]) {
            // Extract values for different categories
            let datasets = [];

            // what happens when no inpvar2val?
            let i = Math.floor(Math.random() * 10);

            for (let outVar of outVarVal) {
                if (inpVar2Options.length > 0) {
                    for (let inpVar2 of inpVar2Val) {
                        if (inpVar3Options.length > 0) {
                            for (let inpVar3 of inpVar3Val) {
                                datasets.push({
                                    label: `${outVar}, ${inpVar2}, ${inpVar3}`,
                                    data: allDataRef.current
                                        .filter((item) => item[inpVar2Name] == inpVar2 && item[inpVar3Name] == inpVar3)
                                        .map((item) => {
                                            let date;
                                            try {
                                                date = getDate(item.time);
                                            } catch (error) {
                                                console.log('decoding dates failed', item.time);
                                            }
                                            return {
                                                x: date,
                                                y: item[`${outVar}`],
                                            };
                                        }),
                                    fill: false,
                                    borderColor: colorPalette[i % colorPalette.length],
                                    backgroundColor: colorPalette[i % colorPalette.length],
                                });
                                i++;
                            }
                        } else {
                            datasets.push({
                                label: `${outVar}, ${inpVar2}`,
                                data: allDataRef.current
                                    .filter((item) => item[inpVar2Name] == inpVar2)
                                    .map((item) => {
                                        let date;
                                        try {
                                            date = getDate(item.time);
                                        } catch (error) {
                                            console.log('decoding dates failed', item.time);
                                        }
                                        return {
                                            x: date,
                                            y: item[`${outVar}`],
                                        };
                                    }),
                                fill: false,
                                borderColor: colorPalette[i % colorPalette.length],
                                backgroundColor: colorPalette[i % colorPalette.length],
                            });
                            i++;
                        }
                    }
                } else if (inpVar3Options.length > 0) {
                    for (let inpVar3 of inpVar3Val) {
                        datasets.push({
                            label: `${outVar}, ${inpVar3}`,
                            data: allDataRef.current
                                .filter((item) => item[inpVar2Name] == inpVar3)
                                .map((item) => {
                                    let date;
                                    try {
                                        date = getDate(item.time);
                                    } catch (error) {
                                        console.log('decoding dates failed', item.time);
                                    }
                                    return {
                                        x: date,
                                        y: item[`${outVar}`],
                                    };
                                }),
                            fill: false,
                            borderColor: colorPalette[i % colorPalette.length],
                            backgroundColor: colorPalette[i % colorPalette.length],
                        });
                        i++;
                    }
                } else {
                    datasets.push({
                        label: outVar,
                        data: allDataRef.current.map((item) => {
                            let date;
                            try {
                                date = getDate(item.time);
                            } catch (error) {
                                console.log('decoding dates failed', item.time);
                            }
                            return {
                                x: date,
                                y: item[`${outVar}`],
                            };
                        }),
                        fill: false,
                        borderColor: colorPalette[i % colorPalette.length],
                        backgroundColor: colorPalette[i % colorPalette.length],
                    });
                    i++;
                }
            }
            const chartData = {
                datasets: datasets,
            };
            setPlotOptions((prevOptions) => ({
                ...prevOptions,
                scales: {
                    ...prevOptions.scales,
                    x: {
                        ...prevOptions.scales.x,
                    },
                    y: {
                        ...prevOptions.scales.y,
                        title: {
                            ...prevOptions.scales.y.title,
                            text: allDataRef.current?.[0]?.[outVarVal?.[0]] ?? '',
                        },
                    },
                },
            }));

            setDecodedFile(chartData);
        }
    }, [inpVar2Val, inpVar3Val, outVarVal]);

    const handleDownloadCsv = () => {
        if (!decodedFile || !allDataRef.current.length) {
            console.warn('No data available to download.');
            return;
        }

        // Extract headers (first row) and units (second row) from the worksheet
        const firstRow = allDataRef.current[0]; // Headers & units

        // Ensure time is the first column and correctly formatted
        let headers = ['time'];
        let units = ['']; // Assuming time unit is seconds

        Object.entries(firstRow).forEach(([key, value]) => {
            headers.push(key);
            units.push(value);
        });

        // Convert data to CSV format
        const csvRows = [
            headers.join(','), // First row: Headers
            units.join(','), // Second row: Units
            allDataRef.current
                .slice(1)
                .map((row) => {
                    // Map each row to a CSV line
                    return headers
                        .map((header) => {
                            if (header == 'time') {
                                try {
                                    return getDate(row[header]).toISOString();
                                } catch {
                                    return row[header];
                                }
                            }
                            return row[header] || '';
                        })
                        .join(',');
                })
                .join('\n'), // Join the rows with a new line character to separate them
        ];

        const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
        const encodedUri = encodeURI(csvContent);

        // Create a download link and trigger click
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'timeseries_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            {decodedFile && (
                <>
                    {!isBar && <Line options={plotOptions} data={decodedFile} />}
                    {isBar && <Bar options={plotOptions} data={decodedFile} />}
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-5">
                            {inpVar2Name && (
                                <Multiselect
                                    isObject={false}
                                    onRemove={(e) => setInpVar2Val(e)}
                                    onSelect={(e) => setInpVar2Val(e)}
                                    options={inpVar2Options}
                                    selectedValues={inpVar2Val}
                                    placeholder={`Select ${inpVar2Name}`}
                                    className="dd list-decimal"
                                />
                            )}
                            {inpVar3Name && (
                                <Multiselect
                                    isObject={false}
                                    onRemove={(e) => setInpVar3Val(e)}
                                    onSelect={(e) => setInpVar3Val(e)}
                                    options={inpVar3Options}
                                    selectedValues={inpVar3Val}
                                    placeholder={`Select ${inpVar3Name}`}
                                    className="dd "
                                />
                            )}
                        </div>
                        <div className="flex items-center justify-between pr-4">
                            <Multiselect
                                isObject={false}
                                onRemove={(e) => setOutVarVal(e)}
                                onSelect={(e) => setOutVarVal(e)}
                                options={outVarOptions}
                                selectedValues={outVarVal}
                                placeholder={`Select output variables`}
                                className="dd "
                            />
                            <div className="cursor-pointer p-0" onClick={handleDownloadCsv}>
                                <IconWithTooltip Icon={DownloadIcon} text="Download file" placement="top" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

function getDate(date) {
    if (typeof date == 'number' && date.toString().length != 4) {
        return getJsDateFromExcel(date);
    } else {
        return Date.parse(date);
    }
}
