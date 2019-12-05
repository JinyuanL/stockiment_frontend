import React from 'react';
import { ResponsiveLine } from '@nivo/line';

function parseData(data) {
    const locationOfFirst = data.length - 30;
    var pricesList = [];
    var volumeList = [];
    var sentimentList = [];
    var highestDollar = 0;
    var lowestDollar = 100000;

    // push structure of each line data point to newData
    //pricesList.push({ "id": "Open", "color": "hsl(315, 70%, 50%)", data: []});
    pricesList.push({ "id": "Low", "color": "hsl(315, 70%, 50%)", data: [] });
    pricesList.push({ "id": "Close", "color": "hsl(315, 70%, 50%)", data: [] });
    pricesList.push({ "id": "High", "color": "hsl(315, 70%, 50%)", data: [] });
    volumeList.push({ "id": "Volume", "color": "hsl(315, 70%, 50%)", data: [] });
    sentimentList.push({ "id": "Sentiment", "color": "hsl(315, 70%, 50%)", data: [] });

    for (var i = locationOfFirst; i < data.length; i++) {
        // convert ISO datetime to normal date time used in monthly chart
        const date = new Date(data[i].Date);

        // Open chart is currently not used
        /*const open = {};
        open.x = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        open.y = data[i].Open;

        pricesList[0].data.push(open);*/

        // low chart
        const low = {};
        low.x = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        low.y = data[i].Low;
        if (low.y != null)
            lowestDollar = low.y < lowestDollar ? low.y : lowestDollar;

        pricesList[0].data.push(low);


        // close chart
        const close = {};
        close.x = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        close.y = data[i].Close;

        pricesList[1].data.push(close);

        // high chart
        const high = {};
        high.x = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        high.y = data[i].High;
        highestDollar = high.y > highestDollar ? high.y : highestDollar;

        pricesList[2].data.push(high);

        // volume chart
        const volume = {};
        volume.x = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        volume.y = data[i].Volume;

        volumeList[0].data.push(volume);


        // sentiment chart
        const sentiment = {};
        sentiment.x = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        sentiment.y = data[i].Sentiment + 1;

        sentimentList[0].data.push(sentiment);
    }

    const newGraphData = {
        "pricesList": pricesList,
        "volumeList": volumeList,
        "sentimentList": sentimentList
    }

    //this.setState({ lowestDollar: lowestDollar, highestDollar: highestDollar });

    return { newGraphData, lowestDollar, highestDollar };
};

const theme = {
    background: "transparent",
    axis: {
        fontSize: "20px",
        tickColor: "#eee",
        ticks: {
            line: {
                stroke: "#555555"
            },
            text: {
                fill: "#ffffff"
            }
        },
        legend: {
            text: {
                fill: "#aaaaaa"
            }
        }
    },
    grid: {
        line: {
            stroke: "#555555"
        }
    }
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export class MonthLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            graphData: null,
            ticker: null,
            highestDollar: 0,
            lowestDollar: 100000000
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.ticker === state.ticker || props.data === null) {
            return {};
        }

        const newData = parseData(props.data);
        return {
            ticker: props.ticker,
            graphData: newData.newGraphData,
            lowestDollar: newData.lowestDollar,
            highestDollar: newData.highestDollar
        };
    }

    render() {
        const { graphData, highestDollar, lowestDollar } = this.state; 
        if (graphData !== null)
            return (
                <>
                <ResponsiveLine
                    data={graphData.pricesList}
                    margin={{ top: 30, right: 80, bottom: 30, left: 50 }}
                    xScale={{ type: 'time', format: '%Y-%m-%d', percision: 'day' }}
                    xFormat="time:%Y-%m-%d"
                    yScale={{ type: 'linear', stacked: false, min: lowestDollar, max: highestDollar }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        format: '%b %d',
                        tickValues: 5,
                        legend: 'time scale',
                        legendOffset: 40,
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'price',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'nivo' }}
                    theme = {theme}
                    enablePoints= {false}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemTextColor: "#ffffff",
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(255, 255, 255, 1)',
                            textColor: 'rgba(255, 255, 255, 1)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
                <ResponsiveLine
                    height={200}
                    data={graphData.sentimentList}
                    margin={{ top: 40, right: 80, bottom: 30, left: 50 }}
                    xScale={{ type: 'time', format: '%Y-%m-%d', percision: 'day' }}
                    xFormat="time:%Y-%m-%d"
                    yScale={{ type: 'linear', stacked: false, min: 0, max: 2 }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        format: '%b %d',
                        tickValues: 5,
                        legend: 'time scale',
                        legendOffset: 40,
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 2,
                        tickPadding: 2,
                        tickRotation: 0,
                        legend: 'Sentiment',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    colors={{ scheme: 'nivo' }}
                    enablePoints={false}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemsSpacing: 0,
                            itemTextColor: "#ffffff",
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(255, 0, 0, 1)',
                            textColor: 'rgba(255, 0, 0, 1)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
                </>
            );
        return (
            <img alt={''} style={{ justifySelf: 'center', alignSelf: 'center', width: "300px", height: "300px" }} src="http://i.imgur.com/0kvtMLE.gif" />
        );
    }
}

export default MonthLine