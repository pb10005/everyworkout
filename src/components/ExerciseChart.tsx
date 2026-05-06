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

    return (
        <div className="dark:bg-gray-900 rounded-lg p-2">
            <ResponsiveContainer width="100%" height={280}>
                <ComposedChart
                    data={chartData}
                    margin={{ top: 10, right: 20, left: -15, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                        dataKey="date"
                        domain={["dataMin - 86400000", "dataMax + 86400000"]}
                        tickFormatter={(unixTime: number) =>
                            new Date(unixTime).toLocaleDateString("ja-JP", {
                                month: "numeric",
                                day: "numeric",
                            })
                        }
                        type="number"
                        fontSize={11}
                    />
                    <YAxis
                        yAxisId={3}
                        orientation="right"
                        dataKey="cumulativeVolume"
                        fontSize={11}
                        domain={[0, "auto"]}
                        tickFormatter={(v: number) => v >= 1000 ? `${Math.round(v / 1000)}k` : String(v)}
                    />
                    <YAxis
                        yAxisId={1}
                        orientation="left"
                        dataKey="maximum"
                        fontSize={11}
                        domain={["dataMin - 5", "dataMax + 5"]}
                        unit="kg"
                    />
                    <Bar
                        yAxisId={3}
                        dataKey="cumulativeVolume"
                        barSize={16}
                        fill="#3b82f6"
                        fillOpacity={0.7}
                        radius={[2, 2, 0, 0]}
                        name="累積ボリューム"
                    />
                    <Line
                        yAxisId={1}
                        type="monotone"
                        dataKey="maximum"
                        stroke="#42bfec"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                        name="最大重量(kg)"
                    />
                    <Legend
                        align="center"
                        verticalAlign="top"
                        wrapperStyle={{ fontSize: "11px", paddingBottom: "8px" }}
                    />
                    <Tooltip
                        labelFormatter={(unixTime: number) =>
                            new Date(unixTime).toLocaleDateString("ja-JP")
                        }
                        formatter={(value: unknown, name: string) => {
                            const v = typeof value === "number" ? value : Number(value);
                            return [
                                name === "累積ボリューム" ? v.toLocaleString() : `${v} kg`,
                                name,
                            ];
                        }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};
