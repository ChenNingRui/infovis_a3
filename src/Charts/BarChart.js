import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../MyContext';
import loadable from 'loadable-components';
const Plot = loadable(() => import('react-plotly.js'));


export default function BarChart() {

    let usersContext = useContext(MyContext);
    let { temperatureJson, yearDuring, monthDuring, countries } = usersContext;
    let [data, setData] = useState([]);

    let dataFilter = (areas, yDuring, mDuring) => {
        let list = [];
        let currentStation = '';
        let tempDic = null;
        yDuring = yDuring.split(',');
        mDuring = mDuring.split(',');

        for (let i = 0, ilength = temperatureJson.length; i < ilength; i++) {
            let item = temperatureJson[i];

            if (checkCondition(item, areas, yDuring, mDuring) === false) {
                continue;
            }

            if (currentStation === item.Station) {
                tempDic.y.push(item.Temperature);
                tempDic.x.push(item.Year + '-' + item.Month);
            }
            else {
                currentStation = item.Station;
                tempDic = {
                    name: currentStation,
                    y: [item.Temperature],
                    x: [item.Year + '-' + item.Month],
                    type: 'bar',
                }
                // tempDic.legendgroup = item.Station.slice(0, 2);
                list.push(tempDic);
            }
        }

        setData(list);

    }

    let checkCondition = (item, areas, yDuring, mDuring) => {
        for (let i = 0, length = areas.length; i < length; i++) {
            if (item.Station.indexOf(areas[i].Code) !== -1 &&
                parseInt(yDuring[0]) <= item.Year &&
                parseInt(yDuring[1]) >= item.Year &&
                parseInt(mDuring[0]) <= item.Month &&
                parseInt(mDuring[1]) >= item.Month) {
                return true;
            }
        }
        return false;
    }

    let layout = {
        barmode: 'stack',
    };


    useEffect(() => {
        dataFilter(countries, yearDuring, monthDuring);
    }, [countries, yearDuring, monthDuring]);

    return (
        <div style={{ width: 400, height: 450 }}>
            <Plot
                data={data}
                layout={layout}
            />
        </div>
    );

}