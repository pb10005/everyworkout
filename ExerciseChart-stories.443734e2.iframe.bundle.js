"use strict";(self.webpackChunkmy_t3_app=self.webpackChunkmy_t3_app||[]).push([[667],{"./src/components/ExerciseChart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,NoData:()=>NoData,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/components/ExerciseChart.tsx").n,title:"Exercise chart",tags:["autodocs"]},Default={args:{chartData:[{date:new Date("2024-04-01").getTime(),cumulativeVolume:100},{date:new Date("2024-04-02").getTime(),cumulativeVolume:200},{date:new Date("2024-04-03").getTime(),cumulativeVolume:300},{date:new Date("2024-04-01").getTime(),maximum:100},{date:new Date("2024-04-02").getTime(),maximum:150},{date:new Date("2024-04-03").getTime(),maximum:130}]}},NoData={args:{chartData:[]}},__namedExportsOrder=["Default","NoData"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    chartData: [{\n      date: new Date('2024-04-01').getTime(),\n      cumulativeVolume: 100\n    }, {\n      date: new Date('2024-04-02').getTime(),\n      cumulativeVolume: 200\n    }, {\n      date: new Date('2024-04-03').getTime(),\n      cumulativeVolume: 300\n    }, {\n      date: new Date('2024-04-01').getTime(),\n      maximum: 100\n    }, {\n      date: new Date('2024-04-02').getTime(),\n      maximum: 150\n    }, {\n      date: new Date('2024-04-03').getTime(),\n      maximum: 130\n    }]\n  }\n}",...Default.parameters?.docs?.source}}},NoData.parameters={...NoData.parameters,docs:{...NoData.parameters?.docs,source:{originalSource:"{\n  args: {\n    chartData: []\n  }\n}",...NoData.parameters?.docs?.source}}}},"./src/components/ExerciseChart.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>ExerciseChart});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/recharts/es6/component/ResponsiveContainer.js")),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/recharts/es6/chart/ComposedChart.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/recharts/es6/cartesian/XAxis.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/recharts/es6/cartesian/YAxis.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/recharts/es6/cartesian/CartesianGrid.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/recharts/es6/cartesian/Bar.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/recharts/es6/cartesian/Line.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/recharts/es6/component/Legend.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/recharts/es6/component/Tooltip.js");const ExerciseChart=props=>{const{chartData}=props;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_2__.u,{width:"100%",height:300,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_3__.X,{data:chartData,margin:{top:5,right:15,left:-5,bottom:40},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_4__.W,{dataKey:"date",domain:["dataMin - 86400000","dataMax + 86400000"],interval:0,tickFormatter:unixTime=>new Date(unixTime).toISOString().split("T")[0]||"",type:"number",fontSize:12,angle:-45,textAnchor:"end"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_5__.h,{yAxisId:3,type:"number",orientation:"right",dataKey:"cumulativeVolume",fontSize:12,domain:[0,"auto"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_5__.h,{yAxisId:1,interval:0,orientation:"left",type:"number",dataKey:"maximum",fontSize:12,domain:["dataMin - 5","dataMax + 5"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_6__.d,{strokeDasharray:"3 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_7__.y,{yAxisId:3,type:"monotone",dataKey:"cumulativeVolume",barSize:20,fill:"#413ea0"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_8__.N,{yAxisId:1,type:"monotone",dataKey:"maximum"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_9__.s,{align:"center",verticalAlign:"top",fontSize:12}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_10__.m,{labelFormatter:unixTime=>new Date(unixTime).toLocaleDateString()})]})})})};try{ExerciseChart.displayName="ExerciseChart",ExerciseChart.__docgenInfo={description:"",displayName:"ExerciseChart",props:{chartData:{defaultValue:null,description:"",name:"chartData",required:!0,type:{name:"Partial<ChartProp>[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ExerciseChart.tsx#ExerciseChart"]={docgenInfo:ExerciseChart.__docgenInfo,name:"ExerciseChart",path:"src/components/ExerciseChart.tsx#ExerciseChart"})}catch(__react_docgen_typescript_loader_error){}}}]);