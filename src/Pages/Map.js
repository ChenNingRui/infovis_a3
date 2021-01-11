import React, { useRef, useEffect, useContext } from 'react';
import * as d3 from 'd3';
import MyContext from '../MyContext';

export default function Map() {
    const d3Container = useRef(null);
    let usersContext = useContext(MyContext);
    let { stationsCodeJson,
        gjson,
        countries,
        setSelected } = usersContext;

    let drawMap = (areas, during) => {
        let projection = d3.geoMercator()
            .center([40, 33])                // GPS of location to zoom on
            .scale(350)                       // This is like the zoom
            .translate([400, 450])
        let path = d3.geoPath().projection(projection);

        let mapSVG = d3.select(d3Container.current)
            .attr('width', 400)
            .attr('height', 450)
            .style("fill", "none");

        mapSVG.selectAll("*").remove();

        let pathFeature = mapSVG.selectAll("path").data(gjson.features);
        pathFeature.enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "white")
            .style("stroke-width", "2")
            .attr("fill", '#8dd3c7');

        let tooltipArea = d3.select('div');
        tooltipArea
            .append('div')
            .attr('id', 'tooltip')
            .style('position', 'absolute')
            .style('opacity', '0')
            .style('width', '150px')
            .style('text-align', 'left')
            .style('padding', '2px')
            .style('border-style', 'solid')
            .style('border-width', 'thin')
            .style('border-color', 'black')
            .style('background', '#cab2d6')
            .style('font-size', '11px');

        let tooltip = d3.select('#tooltip')
            .style(
                'transform',
                'translate(-50%,-100%)')
            .style("color", "white");

        let show = countriesDisplay(stationsCodeJson, areas, during);

        let stationsFeatures = mapSVG.selectAll("circle").data(show);
        stationsFeatures.enter()
            .append('circle')
            .attr("class", "point")
            .attr("stroke", "black")
            .attr("cx", function (d) {
                return projection([d['Longitude'], d['Latitude']])[0];
            })
            .attr("cy", function (d) { return projection([d['Longitude'], d['Latitude']])[1]; })
            .attr("fill", '#fdb462')
            .attr("r", 8)
            .on("click", function (d, value) {
                setSelected(value);
            })
            .on("mouseover", function (event, d) {
                d3.select(this).attr("fill", '#b15928')
                tooltip.html(tooltipHtmlEdit(d))
                    .style("top", (event.pageY + 100) + "px")
                    .style("left", (event.pageX + 100) + "px")
                    .transition().style('opacity', 1);
            })
            .on('mouseout', function (event, d) {
                d3.select(this).attr("fill", '#fdb462')
                tooltip.style('opacity', 0);
            })

        // mapSVG.call(d3.zoom()
        //     .extent([[0, 0], [100, 100]])
        //     .scaleExtent([1, 8])
        //     .on("zoom", zoomed));

        // function zoomed({ transform }) {
        //     mapSVG.attr("transform", transform);
        // }
    }

    let tooltipHtmlEdit = (...args) => {
        let htmlStr = '';
        for (let i = 0, length = args.length; i < length; i++) {
            for (var key in args[i]) {
                htmlStr += key + ': ' + args[i][key] + "<br/>";
            }
        }
        return htmlStr;
    }

    let countriesDisplay = (stations, areas, during) => {
        let list = [];

        for (let i = 0, ilength = stations.length; i < ilength; i++) {
            let station = stations[i];
            for (let j = 0, jlength = areas.length; j < jlength; j++) {
                let display = areas[j];
                if (display.Code === station.CountryCode) {
                    list.push(station);
                }
            }
        }
        return list;
    }

    useEffect(() => {
        drawMap(countries);
    }, [countries]);

    return (
        <div>
            <svg
                className="d3-component"
                ref={d3Container}
            />
        </div >
    );
}