import { getLargeFile } from '../../../services/db.service';
import { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, TimeScale, Tooltip, Legend, scales } from 'chart.js';
import Multiselect from 'multiselect-react-dropdown';
import 'chartjs-adapter-date-fns'; // Required for time-based charts
import { Line } from 'react-chartjs-2';
import { getJsDateFromExcel } from 'excel-date-to-js';
import { colorPalette } from '../../../util/globalVars';

// Register necessary components
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, TimeScale, Title, Tooltip, Legend);

export const DataElement = ({ loid, name }) => {
    const [fileTypeState, setFileTypeState] = useState('');
    const [fileBin, setFileBin] = useState(null);
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
                    text: 'hi',
                },
            },
        },
    });

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
                        setInpVar2Val([constVar2[0]]);
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
                        setInpVar3Val([constVar3[0]]);
                    }

                    const constOutNames = [];
                    for (let coln = 3; coln <= Object.keys(jsonData[0]).length; coln++) {
                        const colChar = getExcelColumnName(coln);
                        constOutNames.push(worksheet?.[`${colChar}1`].v);
                    }
                    setOutVarOptions(constOutNames);
                    setOutVarVal([constOutNames[0]]);
                };

                reader.readAsBinaryString(fileBin);
            }
        }
    }, [fileBin]);

    useEffect(() => {
        console.log('changing plotting');
        if (outVarVal) {
            // Extract values for different categories
            let datasets = [];

            // what happens when no inpvar2val?
            let i = 0;
            for (let outVar of outVarVal) {
                if (inpVar2Val) {
                    for (let inpVar2 of inpVar2Val) {
                        if (inpVar3Val) {
                            for (let inpVar3 of inpVar3Val) {
                                datasets.push({
                                    label: `${outVar}, ${inpVar2}, ${inpVar3}`,
                                    data: allDataRef.current
                                        .filter((item) => item[inpVar2Name] == inpVar2 && item[inpVar3Name] == inpVar3)
                                        .map((item) => {
                                            let date;
                                            try {
                                                date = getJsDateFromExcel(item.time);
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
                                            date = getJsDateFromExcel(item.time);
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
                            });
                            i++;
                        }
                    }
                } else if (inpVar3Val) {
                    for (let inpVar3 of inpVar3Val) {
                        datasets.push({
                            label: `${outVar}, ${inpVar3}`,
                            data: allDataRef.current
                                .filter((item) => item[inpVar2Name] == inpVar3)
                                .map((item) => {
                                    let date;
                                    try {
                                        date = getJsDateFromExcel(item.time);
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
                        });
                        i++;
                    }
                } else {
                    datasets.push({
                        label: `${outVar}`,
                        data: allDataRef.current.map((item) => {
                            let date;
                            try {
                                date = getJsDateFromExcel(item.time);
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
                    });
                    i++;
                }
            }
            console.log(datasets);

            const chartData = {
                datasets: datasets,
            };
            setPlotOptions((prevOptions) => ({
                ...prevOptions,
                scales: {
                    ...prevOptions.scales,
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
    return (
        <>
            {fileTypeState == 'png' && (
                <img
                    src={decodedFile}
                    alt="Model Icon"
                    className="max-w-[500px]" // Maximum width and height
                />
            )}
            {['csv', 'xlsx'].includes(fileTypeState) && decodedFile && (
                <>
                    {' '}
                    <Line options={plotOptions} data={decodedFile} className="w-[800px]" />
                    <div className="flex gap-5">
                        {inpVar2Name && (
                            <Multiselect
                                isObject={false}
                                onRemove={(e) => setInpVar2Val(e)}
                                onSelect={(e) => setInpVar2Val(e)}
                                options={inpVar2Options}
                                selectedValues={inpVar2Val}
                                placeholder={`Select ${inpVar2Name}`}
                                className="dd w-fit"
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
                                className="dd w-fit"
                            />
                        )}

                        <Multiselect
                            isObject={false}
                            onRemove={(e) => setOutVarVal(e)}
                            onSelect={(e) => setOutVarVal(e)}
                            options={outVarOptions}
                            selectedValues={outVarVal}
                            placeholder={`Select Output Variable`}
                            className="dd w-fit"
                        />
                    </div>
                </>
            )}
        </>
    );
};

function getExcelColumnName(colNumber) {
    let columnName = '';
    while (colNumber >= 0) {
        columnName = String.fromCharCode((colNumber % 26) + 65) + columnName;
        colNumber = Math.floor(colNumber / 26) - 1;
    }
    return columnName;
}
