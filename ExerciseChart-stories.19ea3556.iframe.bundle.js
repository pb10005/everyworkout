"use strict";(self.webpackChunkmy_t3_app=self.webpackChunkmy_t3_app||[]).push([[667],{"./src/components/ExerciseChart.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var _Default_parameters,_Default_parameters_docs,_Default_parameters1,_NoData_parameters,_NoData_parameters_docs,_NoData_parameters1;__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,NoData:()=>NoData,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/components/ExerciseChart.tsx").n,title:"Exercise chart",tags:["autodocs"]},Default={args:{chartData:[{date:new Date("2024-04-01").getTime(),volume:100},{date:new Date("2024-04-02").getTime(),volume:200},{date:new Date("2024-04-03").getTime(),volume:300},{date:new Date("2024-04-01").getTime(),maximum:100},{date:new Date("2024-04-02").getTime(),maximum:150},{date:new Date("2024-04-03").getTime(),maximum:130}]}},NoData={args:{chartData:[]}};Default.parameters={...Default.parameters,docs:{...null===(_Default_parameters=Default.parameters)||void 0===_Default_parameters?void 0:_Default_parameters.docs,source:{originalSource:"{\n  args: {\n    chartData: [{\n      date: new Date('2024-04-01').getTime(),\n      volume: 100\n    }, {\n      date: new Date('2024-04-02').getTime(),\n      volume: 200\n    }, {\n      date: new Date('2024-04-03').getTime(),\n      volume: 300\n    }, {\n      date: new Date('2024-04-01').getTime(),\n      maximum: 100\n    }, {\n      date: new Date('2024-04-02').getTime(),\n      maximum: 150\n    }, {\n      date: new Date('2024-04-03').getTime(),\n      maximum: 130\n    }]\n  }\n}",...null===(_Default_parameters1=Default.parameters)||void 0===_Default_parameters1||null===(_Default_parameters_docs=_Default_parameters1.docs)||void 0===_Default_parameters_docs?void 0:_Default_parameters_docs.source}}},NoData.parameters={...NoData.parameters,docs:{...null===(_NoData_parameters=NoData.parameters)||void 0===_NoData_parameters?void 0:_NoData_parameters.docs,source:{originalSource:"{\n  args: {\n    chartData: []\n  }\n}",...null===(_NoData_parameters1=NoData.parameters)||void 0===_NoData_parameters1||null===(_NoData_parameters_docs=_NoData_parameters1.docs)||void 0===_NoData_parameters_docs?void 0:_NoData_parameters_docs.source}}};const __namedExportsOrder=["Default","NoData"]},"./src/components/ExerciseChart.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>ExerciseChart});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/recharts/es6/component/ResponsiveContainer.js")),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/recharts/es6/chart/ComposedChart.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/recharts/es6/cartesian/CartesianGrid.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/recharts/es6/cartesian/XAxis.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/recharts/es6/cartesian/YAxis.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/recharts/es6/cartesian/Bar.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/recharts/es6/cartesian/Line.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/recharts/es6/component/Legend.js"),_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/recharts/es6/component/Tooltip.js");const ExerciseChart=props=>{const{chartData}=props;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_2__.u,{width:"100%",height:300,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_3__.X,{data:chartData,margin:{top:5,right:15,left:-5,bottom:0},children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_4__.d,{strokeDasharray:"3 3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_5__.W,{dataKey:"date",domain:["auto","auto"],tickFormatter:unixTime=>new Date(unixTime).toLocaleDateString(),type:"number"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_6__.h,{yAxisId:1,type:"number",dataKey:"maximum",domain:["dataMin - 5","dataMax + 5"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_6__.h,{yAxisId:2,orientation:"right",type:"number",dataKey:"volume",domain:[0,"auto"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_7__.y,{yAxisId:2,dataKey:"volume",barSize:20,fill:"#413ea0"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_8__.N,{yAxisId:1,type:"monotone",dataKey:"maximum"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_9__.s,{align:"center",verticalAlign:"top"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_Bar_CartesianGrid_ComposedChart_Legend_Line_ResponsiveContainer_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_10__.m,{labelFormatter:unixTime=>new Date(unixTime).toLocaleDateString()})]})})})};ExerciseChart.__docgenInfo={description:"",methods:[],displayName:"ExerciseChart",props:{chartData:{required:!0,tsType:{name:"Array",elements:[{name:"Partial",elements:[{name:"signature",type:"object",raw:"{\n    date: number;\n    maximum: number;\n    volume: number;\n}",signature:{properties:[{key:"date",value:{name:"number",required:!0}},{key:"maximum",value:{name:"number",required:!0}},{key:"volume",value:{name:"number",required:!0}}]}}],raw:"Partial<ChartProp>"}],raw:"Partial<ChartProp>[]"},description:""}}}},"./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;function p(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&"key"!==b&&"ref"!==b&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=p,exports.jsxs=p},"./node_modules/next/dist/compiled/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/next/dist/compiled/react/cjs/react-jsx-runtime.production.min.js")}}]);