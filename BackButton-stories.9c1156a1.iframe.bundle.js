(self.webpackChunkmy_t3_app=self.webpackChunkmy_t3_app||[]).push([[958],{"./node_modules/@heroicons/react/20/solid/ChevronLeftIcon.js":(module,__unused_webpack_exports,__webpack_require__)=>{const React=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const ForwardRef=React.forwardRef((function ChevronLeftIcon({title,titleId,...props},svgRef){return React.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:svgRef,"aria-labelledby":titleId},props),title?React.createElement("title",{id:titleId},title):null,React.createElement("path",{fillRule:"evenodd",d:"M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z",clipRule:"evenodd"}))}));module.exports=ForwardRef},"./src/components/BackButton.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,WithLabel:()=>WithLabel,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={component:__webpack_require__("./src/components/BackButton.tsx").o,title:"Back button",tags:["autodocs"]},Default={},WithLabel={args:{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{children:"戻る"})}},__namedExportsOrder=["Default","WithLabel"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}},WithLabel.parameters={...WithLabel.parameters,docs:{...WithLabel.parameters?.docs,source:{originalSource:"{\n  args: {\n    children: <span>戻る</span>\n  }\n}",...WithLabel.parameters?.docs?.source}}}},"./src/components/BackButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{o:()=>BackButton});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_barrel_optimize_names_ChevronLeftIcon_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@heroicons/react/20/solid/ChevronLeftIcon.js"),next_navigation__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.mjs");__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const BackButton=props=>{const{children}=props,router=(0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"flex items-center gap-1 cursor-pointer",onClick:()=>router.back(),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_ChevronLeftIcon_heroicons_react_20_solid__WEBPACK_IMPORTED_MODULE_3__,{className:"w-8 h-8 dark:text-white"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"dark:text-white",children})]})})};try{BackButton.displayName="BackButton",BackButton.__docgenInfo={description:"",displayName:"BackButton",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/BackButton.tsx#BackButton"]={docgenInfo:BackButton.__docgenInfo,name:"BackButton",path:"src/components/BackButton.tsx#BackButton"})}catch(__react_docgen_typescript_loader_error){}}}]);