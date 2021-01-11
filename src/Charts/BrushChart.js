import React, { useEffect, useContext, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Typography from '@material-ui/core/Typography';
import MyContext from '../MyContext';

export default function BrushChart() {
    let usersContext = useContext(MyContext);
    let { selected,
        temperatureJson,
        yearDuring,
        monthDuring } = usersContext;
    let [seriesOne, setSeriesOne] = useState([]);
    let [seriesTwo, setSeriesTwo] = useState([]);

    let optionsOne = {
        chart: {
            id: 'chart2',
            height: 230,
            toolbar: {
                autoSelected: 'pan',
                show: false
            }
        },
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        },
        xaxis: {
            type: 'datetime'
        },
        colors: ['#e31a1c', '#8dd3c7'],
        stroke: {
            width: 2
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            opacity: 1,
        },
        yaxis: [
            {
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#e31a1c"
                },
                labels: {
                    style: {
                        colors: "#e31a1c"
                    }
                },
                title: {
                    text: "Temperature",
                    style: {
                        color: "#e31a1c"
                    }
                }
            },
            {
                opposite: true,
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true,
                    color: "#8dd3c7"
                },
                labels: {
                    style: {
                        colors: "#8dd3c7"
                    }
                },
                title: {
                    text: "Observations",
                    style: {
                        color: "#8dd3c7"
                    }
                }
            }
        ],
    };

    let optionsTwo = {
        chart: {
            id: "chart1",
            height: 130,
            foreColor: "#ccc",
            brush: {
                target: "chart2",
                enabled: true
            },
            selection: {
                enabled: true,
            }
        },
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
        },
        colors: ["#FF0080"],
        stroke: {
            width: 2
        },
        grid: {
            borderColor: "#444"
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: "datetime",
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            tickAmount: 2
        },
    };

    useEffect(() => {
        dataFilter(selected, temperatureJson);
    }, [selected]);


    let dataFilter = (select, dataset) => {
        if (!select)
            return;

        let temperature = [];
        let observations = [];
        let yDuring = yearDuring.split(',');
        let mDuring = monthDuring.split(',');

        for (let i = 0, length = dataset.length; i < length; i++) {
            let item = dataset[i];
            if (item['Station'] === select['Station'] &&
                parseInt(yDuring[0]) <= item['Year'] &&
                parseInt(yDuring[1]) >= item['Year'] &&
                parseInt(mDuring[0]) <= item['Month'] &&
                parseInt(mDuring[1]) >= item['Month']) {
                temperature.push({ x: String(item['Year'] + '-' + item['Month']), y: item['Temperature'] });
                observations.push({ x: String(item['Year'] + '-' + item['Month']), y: item['Observations'] });
            }
        }

        setSeriesOne([{
            name: 'Temperature',
            type: 'line',
            data: temperature
        },
        {
            name: 'Observation',
            type: 'bar',
            data: observations
        }
        ]);

        setSeriesTwo([{
            name: select['Station'],
            type: 'line',
            data: temperature
        }]);
    }

    return (
        <div>
            <Typography gutterBottom>
                {selected ? selected['Station'] : ''}
            </Typography>
            <div className="donut">
                <div id="wrapper">
                    <div id="chart-line2">
                        <ReactApexChart options={optionsOne} series={seriesOne} height={230} />
                    </div>
                    <div id="chart-line">
                        <ReactApexChart options={optionsTwo} series={seriesTwo} height={130} />
                    </div>
                </div>
            </div>
        </div>
    );

}