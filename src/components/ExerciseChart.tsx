import * as React from "react";
import {
    Bar,
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    Legend,
    Line,
    CartesianGrid,
    Tooltip
} from "recharts";

import { type ChartProp } from "./types";

type Props = {
    chartData: Partial<ChartProp>[];
};


export const ExerciseChart: React.FC<Props> = (props: Props) => {
    const { chartData } = props;

    return (<>
        <ResponsiveContainer
            width="100%"
            height={300}>
            <ComposedChart
                data={chartData}
                margin={{ top: 5, right: 15, left: -5, bottom: 40 }}>
                <XAxis
                    dataKey="date"
                    domain={['dataMin - 86400000', 'dataMax + 86400000']}
                    interval={0}
                    tickFormatter={(unixTime: Date) => new Date(unixTime).toISOString().split('T')[0] || ''}
                    type="number"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end" 
                     />
                {/* <YAxis
                    yAxisId={2}
                    orientation="right"
                    type="number"
                    dataKey="volume"
                    domain={[0, 'auto']} /> */}
                <YAxis
                    yAxisId={3}
                    type="number"
                    orientation="right"
                    dataKey="cumulativeVolume"
                    fontSize={12}
                    domain={[0, 'auto']} />
                <YAxis
                    yAxisId={1}
                    interval={0}
                    orientation="left"
                    type="number"
                    dataKey="maximum"
                    fontSize={12}
                    domain={['dataMin - 5', 'dataMax + 5']} />
                {/* <Bar yAxisId={2} dataKey="volume" barSize={20} fill="#413ea0" /> */}
                <CartesianGrid strokeDasharray="3 3" />
                <Bar yAxisId={3} type="monotone" dataKey="cumulativeVolume" barSize={20} fill="#413ea0" />
                <Line yAxisId={1} type="monotone" dataKey="maximum" />
                <Legend align="center" verticalAlign="top" fontSize={12} />
                <Tooltip
                    labelFormatter={(unixTime: Date) => new Date(unixTime).toLocaleDateString()} />
            </ComposedChart>
        </ResponsiveContainer>
    </>);
};
