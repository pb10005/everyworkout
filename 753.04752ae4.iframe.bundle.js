/*! For license information please see 753.04752ae4.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkmy_t3_app=self.webpackChunkmy_t3_app||[]).push([[753],{"./node_modules/@base2/pretty-print-object/dist/index.js":function(__unused_webpack_module,exports){"use strict";var __assign=this&&this.__assign||function(){return __assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t},__assign.apply(this,arguments)},__spreadArrays=this&&this.__spreadArrays||function(){for(var s=0,i=0,il=arguments.length;i<il;i++)s+=arguments[i].length;var r=Array(s),k=0;for(i=0;i<il;i++)for(var a=arguments[i],j=0,jl=a.length;j<jl;j++,k++)r[k]=a[j];return r};Object.defineProperty(exports,"__esModule",{value:!0});var seen=[];exports.prettyPrint=function prettyPrint(input,options,pad){void 0===pad&&(pad="");var tokens,combinedOptions=__assign(__assign({},{indent:"\t",singleQuotes:!0}),options);tokens=void 0===combinedOptions.inlineCharacterLimit?{newLine:"\n",newLineOrSpace:"\n",pad,indent:pad+combinedOptions.indent}:{newLine:"@@__PRETTY_PRINT_NEW_LINE__@@",newLineOrSpace:"@@__PRETTY_PRINT_NEW_LINE_OR_SPACE__@@",pad:"@@__PRETTY_PRINT_PAD__@@",indent:"@@__PRETTY_PRINT_INDENT__@@"};var expandWhiteSpace=function(string){if(void 0===combinedOptions.inlineCharacterLimit)return string;var oneLined=string.replace(new RegExp(tokens.newLine,"g"),"").replace(new RegExp(tokens.newLineOrSpace,"g")," ").replace(new RegExp(tokens.pad+"|"+tokens.indent,"g"),"");return oneLined.length<=combinedOptions.inlineCharacterLimit?oneLined:string.replace(new RegExp(tokens.newLine+"|"+tokens.newLineOrSpace,"g"),"\n").replace(new RegExp(tokens.pad,"g"),pad).replace(new RegExp(tokens.indent,"g"),pad+combinedOptions.indent)};if(-1!==seen.indexOf(input))return'"[Circular]"';if(null==input||"number"==typeof input||"boolean"==typeof input||"function"==typeof input||"symbol"==typeof input||function isRegexp(value){return"[object RegExp]"===Object.prototype.toString.call(value)}(input))return String(input);if(input instanceof Date)return"new Date('"+input.toISOString()+"')";if(Array.isArray(input)){if(0===input.length)return"[]";seen.push(input);var ret="["+tokens.newLine+input.map((function(el,i){var eol=input.length-1===i?tokens.newLine:","+tokens.newLineOrSpace,value=prettyPrint(el,combinedOptions,pad+combinedOptions.indent);return combinedOptions.transform&&(value=combinedOptions.transform(input,i,value)),tokens.indent+value+eol})).join("")+tokens.pad+"]";return seen.pop(),expandWhiteSpace(ret)}if(function isObj(value){var type=typeof value;return null!==value&&("object"===type||"function"===type)}(input)){var objKeys_1=__spreadArrays(Object.keys(input),function getOwnEnumPropSymbols(object){return Object.getOwnPropertySymbols(object).filter((function(keySymbol){return Object.prototype.propertyIsEnumerable.call(object,keySymbol)}))}(input));if(combinedOptions.filter&&(objKeys_1=objKeys_1.filter((function(el){return combinedOptions.filter&&combinedOptions.filter(input,el)}))),0===objKeys_1.length)return"{}";seen.push(input);ret="{"+tokens.newLine+objKeys_1.map((function(el,i){var eol=objKeys_1.length-1===i?tokens.newLine:","+tokens.newLineOrSpace,isSymbol="symbol"==typeof el,isClassic=!isSymbol&&/^[a-z$_][a-z$_0-9]*$/i.test(el.toString()),key=isSymbol||isClassic?el:prettyPrint(el,combinedOptions),value=prettyPrint(input[el],combinedOptions,pad+combinedOptions.indent);return combinedOptions.transform&&(value=combinedOptions.transform(input,el,value)),tokens.indent+String(key)+": "+value+eol})).join("")+tokens.pad+"}";return seen.pop(),expandWhiteSpace(ret)}return input=String(input).replace(/[\r\n]/g,(function(x){return"\n"===x?"\\n":"\\r"})),combinedOptions.singleQuotes?"'"+(input=input.replace(/\\?'/g,"\\'"))+"'":'"'+(input=input.replace(/"/g,'\\"'))+'"'}},"./node_modules/@storybook/addon-docs/dist/chunk-H6MOWX77.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";Object.create,Object.defineProperty,Object.getOwnPropertyDescriptor,Object.getOwnPropertyNames,Object.getPrototypeOf,Object.prototype.hasOwnProperty},"./node_modules/@storybook/addon-essentials/dist/actions/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{argsEnhancers:()=>argsEnhancers,loaders:()=>loaders});const esm_browser_native={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let getRandomValues;const rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!getRandomValues))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}const byteToHex=[];for(let i=0;i<256;++i)byteToHex.push((i+256).toString(16).slice(1));function unsafeStringify(arr,offset=0){return byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]}const esm_browser_v4=function v4(options,buf,offset){if(esm_browser_native.randomUUID&&!buf&&!options)return esm_browser_native.randomUUID();const rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(let i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return unsafeStringify(rnds)};var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("storybook/internal/preview-errors"),console=__webpack_require__("./node_modules/console-browserify/index.js"),config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a};function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id="object"==typeof crypto&&"function"==typeof crypto.getRandomValues?esm_browser_v4():Date.now().toString(36)+Math.random().toString(36).substring(2),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit("storybook/actions/action-event",actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}var isInInitialArgs=(name,initialArgs)=>typeof initialArgs[name]>"u"&&!(name in initialArgs),argsEnhancers=[context=>{let{initialArgs,argTypes,parameters:{actions}}=context;return actions?.disable||!argTypes?{}:Object.entries(argTypes).filter((([name,argType])=>!!argType.action)).reduce(((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action("string"==typeof argType.action?argType.action:name)),acc)),{})},context=>{let{initialArgs,argTypes,id,parameters:{actions}}=context;if(!actions||actions.disable||!actions.argTypesRegex||!argTypes)return{};let argTypesRegex=new RegExp(actions.argTypesRegex);return Object.entries(argTypes).filter((([name])=>!!argTypesRegex.test(name))).reduce(((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action(name,{implicit:!0,id})),acc)),{})}],subscribed=!1,loaders=[context=>{let{parameters:{actions}}=context;if(!actions?.disable&&!subscribed&&"__STORYBOOK_TEST_ON_MOCK_CALL__"in external_STORYBOOK_MODULE_GLOBAL_.global&&"function"==typeof external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__){(0,external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__)(((mock,args)=>{let name=mock.getMockName();"spy"!==name&&(!/^next\/.*::/.test(name)||["next/router::useRouter()","next/navigation::useRouter()","next/navigation::redirect","next/cache::","next/headers::cookies().set","next/headers::cookies().delete","next/headers::headers().set","next/headers::headers().delete"].some((prefix=>name.startsWith(prefix))))&&action(name)(args)})),subscribed=!0}}]},"./node_modules/@storybook/addon-essentials/dist/backgrounds/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{decorators:()=>decorators,initialGlobals:()=>initialGlobals,parameters:()=>parameters});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),esm=__webpack_require__("./node_modules/ts-dedent/esm/index.js"),external_STORYBOOK_MODULE_CLIENT_LOGGER_=__webpack_require__("storybook/internal/client-logger"),PARAM_KEY="backgrounds",{document:preview_document,window:preview_window}=external_STORYBOOK_MODULE_GLOBAL_.global,clearStyles=selector=>{(Array.isArray(selector)?selector:[selector]).forEach(clearStyle)},clearStyle=selector=>{let element=preview_document.getElementById(selector);element&&element.parentElement?.removeChild(element)},decorators=[(StoryFn,context)=>{let{globals,parameters:parameters2}=context,gridParameters=parameters2.backgrounds.grid,isActive=!0===globals.backgrounds?.grid&&!0!==gridParameters.disable,{cellAmount,cellSize,opacity}=gridParameters,isInDocs="docs"===context.viewMode,defaultOffset=void 0===parameters2.layout||"padded"===parameters2.layout?16:0,offsetX=gridParameters.offsetX??(isInDocs?20:defaultOffset),offsetY=gridParameters.offsetY??(isInDocs?20:defaultOffset),gridStyles=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useMemo)((()=>`\n      ${"docs"===context.viewMode?`#anchor--${context.id} .docs-story`:".sb-show-main"} {\n        background-size: ${[`${cellSize*cellAmount}px ${cellSize*cellAmount}px`,`${cellSize*cellAmount}px ${cellSize*cellAmount}px`,`${cellSize}px ${cellSize}px`,`${cellSize}px ${cellSize}px`].join(", ")} !important;\n        background-position: ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px !important;\n        background-blend-mode: difference !important;\n        background-image: linear-gradient(rgba(130, 130, 130, ${opacity}) 1px, transparent 1px),\n         linear-gradient(90deg, rgba(130, 130, 130, ${opacity}) 1px, transparent 1px),\n         linear-gradient(rgba(130, 130, 130, ${opacity/2}) 1px, transparent 1px),\n         linear-gradient(90deg, rgba(130, 130, 130, ${opacity/2}) 1px, transparent 1px) !important;\n      }\n    `),[cellSize]);return(0,external_STORYBOOK_MODULE_PREVIEW_API_.useEffect)((()=>{let selectorId="docs"===context.viewMode?`addon-backgrounds-grid-docs-${context.id}`:"addon-backgrounds-grid";isActive?((selector,css)=>{let existingStyle=preview_document.getElementById(selector);if(existingStyle)existingStyle.innerHTML!==css&&(existingStyle.innerHTML=css);else{let style=preview_document.createElement("style");style.setAttribute("id",selector),style.innerHTML=css,preview_document.head.appendChild(style)}})(selectorId,gridStyles):clearStyles(selectorId)}),[isActive,gridStyles,context]),StoryFn()},(StoryFn,context)=>{let{globals,parameters:parameters2}=context,globalsBackgroundColor=globals.backgrounds?.value,backgroundsConfig=parameters2.backgrounds,selectedBackgroundColor=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useMemo)((()=>backgroundsConfig.disable?"transparent":((currentSelectedValue,backgrounds=[],defaultName)=>{if("transparent"===currentSelectedValue)return"transparent";if(backgrounds.find((background=>background.value===currentSelectedValue)))return currentSelectedValue;let defaultBackground=backgrounds.find((background=>background.name===defaultName));if(defaultBackground)return defaultBackground.value;if(defaultName){let availableColors=backgrounds.map((background=>background.name)).join(", ");external_STORYBOOK_MODULE_CLIENT_LOGGER_.logger.warn(esm.T`
        Backgrounds Addon: could not find the default color "${defaultName}".
        These are the available colors for your story based on your configuration:
        ${availableColors}.
      `)}return"transparent"})(globalsBackgroundColor,backgroundsConfig.values,backgroundsConfig.default)),[backgroundsConfig,globalsBackgroundColor]),isActive=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useMemo)((()=>selectedBackgroundColor&&"transparent"!==selectedBackgroundColor),[selectedBackgroundColor]),selector="docs"===context.viewMode?`#anchor--${context.id} .docs-story`:".sb-show-main",backgroundStyles=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useMemo)((()=>`\n      ${selector} {\n        background: ${selectedBackgroundColor} !important;\n        ${preview_window.matchMedia("(prefers-reduced-motion: reduce)").matches?"":"transition: background-color 0.3s;"}\n      }\n    `),[selectedBackgroundColor,selector]);return(0,external_STORYBOOK_MODULE_PREVIEW_API_.useEffect)((()=>{let selectorId="docs"===context.viewMode?`addon-backgrounds-docs-${context.id}`:"addon-backgrounds-color";isActive?((selector,css,storyId)=>{let existingStyle=preview_document.getElementById(selector);if(existingStyle)existingStyle.innerHTML!==css&&(existingStyle.innerHTML=css);else{let style=preview_document.createElement("style");style.setAttribute("id",selector),style.innerHTML=css;let gridStyleSelector="addon-backgrounds-grid"+(storyId?`-docs-${storyId}`:""),existingGridStyle=preview_document.getElementById(gridStyleSelector);existingGridStyle?existingGridStyle.parentElement?.insertBefore(style,existingGridStyle):preview_document.head.appendChild(style)}})(selectorId,backgroundStyles,"docs"===context.viewMode?context.id:null):clearStyles(selectorId)}),[isActive,backgroundStyles,context]),StoryFn()}],parameters={[PARAM_KEY]:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}},initialGlobals={[PARAM_KEY]:null}},"./node_modules/@storybook/addon-essentials/dist/docs/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{parameters:()=>parameters});__webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-H6MOWX77.mjs");var external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),excludeTags=Object.entries(external_STORYBOOK_MODULE_GLOBAL_.global.TAGS_OPTIONS??{}).reduce(((acc,entry)=>{let[tag,option]=entry;return option.excludeFromDocsStories&&(acc[tag]=!0),acc}),{}),parameters={docs:{renderer:async()=>{let{DocsRenderer}=await Promise.all([__webpack_require__.e(728),__webpack_require__.e(741),__webpack_require__.e(227)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/@storybook/addon-docs/dist/DocsRenderer-PKQXORMH.mjs"));return new DocsRenderer},stories:{filter:story=>0===(story.tags||[]).filter((tag=>excludeTags[tag])).length&&!story.parameters.docs?.disable}}}},"./node_modules/@storybook/addon-essentials/dist/highlight/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__);var external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_=__webpack_require__("storybook/internal/core-events"),{document:preview_document}=external_STORYBOOK_MODULE_GLOBAL_.global,channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),resetHighlight=()=>{let sheetToBeRemoved=preview_document.getElementById("storybookHighlight");sheetToBeRemoved&&sheetToBeRemoved.parentNode?.removeChild(sheetToBeRemoved)};channel.on(external_STORYBOOK_MODULE_CORE_EVENTS_.STORY_CHANGED,resetHighlight),channel.on("storybook/highlight/reset",resetHighlight),channel.on("storybook/highlight/add",(infos=>{resetHighlight();let elements=Array.from(new Set(infos.elements)),sheet=preview_document.createElement("style");sheet.setAttribute("id","storybookHighlight"),sheet.innerHTML=elements.map((target=>`${target}{\n          ${((color="#FF4785",style="dashed")=>`\n  outline: 2px ${style} ${color};\n  outline-offset: 2px;\n  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);\n`)(infos.color,infos.style)}\n         }`)).join(" "),preview_document.head.appendChild(sheet)}))},"./node_modules/@storybook/addon-essentials/dist/measure/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{decorators:()=>decorators,initialGlobals:()=>initialGlobals});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),isProduction=!0,prefix="Invariant failed";function invariant(condition,message){if(!condition){if(isProduction)throw new Error(prefix);var provided="function"==typeof message?message():message,value=provided?"".concat(prefix,": ").concat(provided):prefix;throw new Error(value)}}function getDocumentWidthAndHeight(){let container=external_STORYBOOK_MODULE_GLOBAL_.global.document.documentElement,height=Math.max(container.scrollHeight,container.offsetHeight);return{width:Math.max(container.scrollWidth,container.offsetWidth),height}}function setCanvasWidthAndHeight(canvas,context,{width,height}){canvas.style.width=`${width}px`,canvas.style.height=`${height}px`;let scale=external_STORYBOOK_MODULE_GLOBAL_.global.window.devicePixelRatio;canvas.width=Math.floor(width*scale),canvas.height=Math.floor(height*scale),context.scale(scale,scale)}var state={};function init(){state.canvas||(state=function createCanvas(){let canvas=external_STORYBOOK_MODULE_GLOBAL_.global.document.createElement("canvas");canvas.id="storybook-addon-measure";let context=canvas.getContext("2d");invariant(null!=context);let{width,height}=getDocumentWidthAndHeight();return setCanvasWidthAndHeight(canvas,context,{width,height}),canvas.style.position="absolute",canvas.style.left="0",canvas.style.top="0",canvas.style.zIndex="2147483647",canvas.style.pointerEvents="none",external_STORYBOOK_MODULE_GLOBAL_.global.document.body.appendChild(canvas),{canvas,context,width,height}}())}function clear(){state.context&&state.context.clearRect(0,0,state.width??0,state.height??0)}var colors={margin:"#f6b26b",border:"#ffe599",padding:"#93c47d",content:"#6fa8dc",text:"#232020"},labelPadding=6;function roundedRect(context,{x,y,w,h,r}){x-=w/2,y-=h/2,w<2*r&&(r=w/2),h<2*r&&(r=h/2),context.beginPath(),context.moveTo(x+r,y),context.arcTo(x+w,y,x+w,y+h,r),context.arcTo(x+w,y+h,x,y+h,r),context.arcTo(x,y+h,x,y,r),context.arcTo(x,y,x+w,y,r),context.closePath()}function textWithRect(context,type,{x,y,w,h},text){return roundedRect(context,{x,y,w,h,r:3}),context.fillStyle=`${colors[type]}dd`,context.fill(),context.strokeStyle=colors[type],context.stroke(),context.fillStyle=colors.text,context.fillText(text,x,y),roundedRect(context,{x,y,w,h,r:3}),context.fillStyle=`${colors[type]}dd`,context.fill(),context.strokeStyle=colors[type],context.stroke(),context.fillStyle=colors.text,context.fillText(text,x,y),{x,y,w,h}}function configureText(context,text){context.font="600 12px monospace",context.textBaseline="middle",context.textAlign="center";let metrics=context.measureText(text),actualHeight=metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent;return{w:metrics.width+2*labelPadding,h:actualHeight+2*labelPadding}}function drawLabel(context,measurements,{type,position="center",text},prevRect,external=!1){let{x,y}=function positionCoordinate(position,{padding,border,width,height,top,left}){let contentWidth=width-border.left-border.right-padding.left-padding.right,contentHeight=height-padding.top-padding.bottom-border.top-border.bottom,x=left+border.left+padding.left,y=top+border.top+padding.top;return"top"===position?x+=contentWidth/2:"right"===position?(x+=contentWidth,y+=contentHeight/2):"bottom"===position?(x+=contentWidth/2,y+=contentHeight):"left"===position?y+=contentHeight/2:"center"===position&&(x+=contentWidth/2,y+=contentHeight/2),{x,y}}(position,measurements),{offsetX,offsetY}=function offset(type,position,{margin,border,padding},labelPaddingSize,external){let shift=dir=>0,offsetX=0,offsetY=0,locationMultiplier=external?1:.5,labelPaddingShift=external?2*labelPaddingSize:0;return"padding"===type?shift=dir=>padding[dir]*locationMultiplier+labelPaddingShift:"border"===type?shift=dir=>padding[dir]+border[dir]*locationMultiplier+labelPaddingShift:"margin"===type&&(shift=dir=>padding[dir]+border[dir]+margin[dir]*locationMultiplier+labelPaddingShift),"top"===position?offsetY=-shift("top"):"right"===position?offsetX=shift("right"):"bottom"===position?offsetY=shift("bottom"):"left"===position&&(offsetX=-shift("left")),{offsetX,offsetY}}(type,position,measurements,labelPadding+1,external);x+=offsetX,y+=offsetY;let{w,h}=configureText(context,text);if(prevRect&&function collide(a,b){return Math.abs(a.x-b.x)<Math.abs(a.w+b.w)/2&&Math.abs(a.y-b.y)<Math.abs(a.h+b.h)/2}({x,y,w,h},prevRect)){let adjusted=function overlapAdjustment(position,currentRect,prevRect){return"top"===position?currentRect.y=prevRect.y-prevRect.h-labelPadding:"right"===position?currentRect.x=prevRect.x+prevRect.w/2+labelPadding+currentRect.w/2:"bottom"===position?currentRect.y=prevRect.y+prevRect.h+labelPadding:"left"===position&&(currentRect.x=prevRect.x-prevRect.w/2-labelPadding-currentRect.w/2),{x:currentRect.x,y:currentRect.y}}(position,{x,y,w,h},prevRect);x=adjusted.x,y=adjusted.y}return textWithRect(context,type,{x,y,w,h},text)}function drawFloatingLabel(context,measurements,{type,text}){let{floatingAlignment:floatingAlignment2,extremities}=measurements,x=extremities[floatingAlignment2.x],y=extremities[floatingAlignment2.y],{w,h}=configureText(context,text),{offsetX,offsetY}=function floatingOffset(alignment,{w,h}){let deltaW=.5*w+labelPadding,deltaH=.5*h+labelPadding;return{offsetX:("left"===alignment.x?-1:1)*deltaW,offsetY:("top"===alignment.y?-1:1)*deltaH}}(floatingAlignment2,{w,h});return x+=offsetX,y+=offsetY,textWithRect(context,type,{x,y,w,h},text)}function drawStack(context,measurements,stack,external){let rects=[];stack.forEach(((l,idx)=>{let rect=external&&"center"===l.position?drawFloatingLabel(context,measurements,l):drawLabel(context,measurements,l,rects[idx-1],external);rects[idx]=rect}))}var colors2={margin:"#f6b26ba8",border:"#ffe599a8",padding:"#93c47d8c",content:"#6fa8dca8"},SMALL_NODE_SIZE=30;function pxToNumber(px){return parseInt(px.replace("px",""),10)}function round(value){return Number.isInteger(value)?value:value.toFixed(2)}function filterZeroValues(labels){return labels.filter((l=>0!==l.text&&"0"!==l.text))}function floatingAlignment(extremities){let windowExtremities_top=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollY,windowExtremities_bottom=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollY+external_STORYBOOK_MODULE_GLOBAL_.global.window.innerHeight,windowExtremities_left=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollX,windowExtremities_right=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollX+external_STORYBOOK_MODULE_GLOBAL_.global.window.innerWidth,distances_top=Math.abs(windowExtremities_top-extremities.top),distances_bottom=Math.abs(windowExtremities_bottom-extremities.bottom);return{x:Math.abs(windowExtremities_left-extremities.left)>Math.abs(windowExtremities_right-extremities.right)?"left":"right",y:distances_top>distances_bottom?"top":"bottom"}}function drawBoxModel(element){return context=>{if(element&&context){let measurements=function measureElement(element){let style=external_STORYBOOK_MODULE_GLOBAL_.global.getComputedStyle(element),{top,left,right,bottom,width,height}=element.getBoundingClientRect(),{marginTop,marginBottom,marginLeft,marginRight,paddingTop,paddingBottom,paddingLeft,paddingRight,borderBottomWidth,borderTopWidth,borderLeftWidth,borderRightWidth}=style;top+=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollY,left+=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollX,bottom+=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollY,right+=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollX;let margin={top:pxToNumber(marginTop),bottom:pxToNumber(marginBottom),left:pxToNumber(marginLeft),right:pxToNumber(marginRight)},padding={top:pxToNumber(paddingTop),bottom:pxToNumber(paddingBottom),left:pxToNumber(paddingLeft),right:pxToNumber(paddingRight)},border={top:pxToNumber(borderTopWidth),bottom:pxToNumber(borderBottomWidth),left:pxToNumber(borderLeftWidth),right:pxToNumber(borderRightWidth)},extremities={top:top-margin.top,bottom:bottom+margin.bottom,left:left-margin.left,right:right+margin.right};return{margin,padding,border,top,left,bottom,right,width,height,extremities,floatingAlignment:floatingAlignment(extremities)}}(element),marginLabels=function drawMargin(context,{margin,width,height,top,left,bottom,right}){let marginHeight=height+margin.bottom+margin.top;return context.fillStyle=colors2.margin,context.fillRect(left,top-margin.top,width,margin.top),context.fillRect(right,top-margin.top,margin.right,marginHeight),context.fillRect(left,bottom,width,margin.bottom),context.fillRect(left-margin.left,top-margin.top,margin.left,marginHeight),filterZeroValues([{type:"margin",text:round(margin.top),position:"top"},{type:"margin",text:round(margin.right),position:"right"},{type:"margin",text:round(margin.bottom),position:"bottom"},{type:"margin",text:round(margin.left),position:"left"}])}(context,measurements),paddingLabels=function drawPadding(context,{padding,border,width,height,top,left,bottom,right}){let paddingWidth=width-border.left-border.right,paddingHeight=height-padding.top-padding.bottom-border.top-border.bottom;return context.fillStyle=colors2.padding,context.fillRect(left+border.left,top+border.top,paddingWidth,padding.top),context.fillRect(right-padding.right-border.right,top+padding.top+border.top,padding.right,paddingHeight),context.fillRect(left+border.left,bottom-padding.bottom-border.bottom,paddingWidth,padding.bottom),context.fillRect(left+border.left,top+padding.top+border.top,padding.left,paddingHeight),filterZeroValues([{type:"padding",text:padding.top,position:"top"},{type:"padding",text:padding.right,position:"right"},{type:"padding",text:padding.bottom,position:"bottom"},{type:"padding",text:padding.left,position:"left"}])}(context,measurements),borderLabels=function drawBorder(context,{border,width,height,top,left,bottom,right}){let borderHeight=height-border.top-border.bottom;return context.fillStyle=colors2.border,context.fillRect(left,top,width,border.top),context.fillRect(left,bottom-border.bottom,width,border.bottom),context.fillRect(left,top+border.top,border.left,borderHeight),context.fillRect(right-border.right,top+border.top,border.right,borderHeight),filterZeroValues([{type:"border",text:border.top,position:"top"},{type:"border",text:border.right,position:"right"},{type:"border",text:border.bottom,position:"bottom"},{type:"border",text:border.left,position:"left"}])}(context,measurements),contentLabels=function drawContent(context,{padding,border,width,height,top,left}){let contentWidth=width-border.left-border.right-padding.left-padding.right,contentHeight=height-padding.top-padding.bottom-border.top-border.bottom;return context.fillStyle=colors2.content,context.fillRect(left+border.left+padding.left,top+border.top+padding.top,contentWidth,contentHeight),[{type:"content",position:"center",text:`${round(contentWidth)} x ${round(contentHeight)}`}]}(context,measurements);!function labelStacks(context,measurements,labels,externalLabels){let stacks=labels.reduce(((acc,l)=>(Object.prototype.hasOwnProperty.call(acc,l.position)||(acc[l.position]=[]),acc[l.position]?.push(l),acc)),{});stacks.top&&drawStack(context,measurements,stacks.top,externalLabels),stacks.right&&drawStack(context,measurements,stacks.right,externalLabels),stacks.bottom&&drawStack(context,measurements,stacks.bottom,externalLabels),stacks.left&&drawStack(context,measurements,stacks.left,externalLabels),stacks.center&&drawStack(context,measurements,stacks.center,externalLabels)}(context,measurements,[...contentLabels,...paddingLabels,...borderLabels,...marginLabels],measurements.width<=3*SMALL_NODE_SIZE||measurements.height<=SMALL_NODE_SIZE)}}}function drawSelectedElement(element){!function draw(callback){clear(),callback(state.context)}(drawBoxModel(element))}var nodeAtPointerRef,pointer={x:0,y:0};function findAndDrawElement(x,y){nodeAtPointerRef=((x,y)=>{let element=external_STORYBOOK_MODULE_GLOBAL_.global.document.elementFromPoint(x,y),crawlShadows=node=>{if(node&&node.shadowRoot){let nestedElement=node.shadowRoot.elementFromPoint(x,y);return node.isEqualNode(nestedElement)?node:nestedElement.shadowRoot?crawlShadows(nestedElement):nestedElement}return node};return crawlShadows(element)||element})(x,y),drawSelectedElement(nodeAtPointerRef)}var PARAM_KEY="measureEnabled",decorators=[(StoryFn,context)=>{let{measureEnabled}=context.globals;return(0,external_STORYBOOK_MODULE_PREVIEW_API_.useEffect)((()=>{let onPointerMove=event=>{window.requestAnimationFrame((()=>{event.stopPropagation(),pointer.x=event.clientX,pointer.y=event.clientY}))};return document.addEventListener("pointermove",onPointerMove),()=>{document.removeEventListener("pointermove",onPointerMove)}}),[]),(0,external_STORYBOOK_MODULE_PREVIEW_API_.useEffect)((()=>{let onResize=()=>{window.requestAnimationFrame((()=>{!function rescale(){invariant(state.canvas,"Canvas should exist in the state."),invariant(state.context,"Context should exist in the state."),setCanvasWidthAndHeight(state.canvas,state.context,{width:0,height:0});let{width,height}=getDocumentWidthAndHeight();setCanvasWidthAndHeight(state.canvas,state.context,{width,height}),state.width=width,state.height=height}()}))};return"story"===context.viewMode&&measureEnabled&&(document.addEventListener("pointerover",(event=>{window.requestAnimationFrame((()=>{event.stopPropagation(),findAndDrawElement(event.clientX,event.clientY)}))})),init(),window.addEventListener("resize",onResize),findAndDrawElement(pointer.x,pointer.y)),()=>{window.removeEventListener("resize",onResize),function destroy(){state.canvas&&(clear(),state.canvas.parentNode?.removeChild(state.canvas),state={})}()}}),[measureEnabled,context.viewMode]),StoryFn()}],initialGlobals={[PARAM_KEY]:!1}},"./node_modules/@storybook/addon-essentials/dist/outline/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{decorators:()=>decorators,initialGlobals:()=>initialGlobals});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),esm=__webpack_require__("./node_modules/ts-dedent/esm/index.js"),clearStyles=selector=>{(Array.isArray(selector)?selector:[selector]).forEach(clearStyle)},clearStyle=input=>{let selector="string"==typeof input?input:input.join(""),element=external_STORYBOOK_MODULE_GLOBAL_.global.document.getElementById(selector);element&&element.parentElement&&element.parentElement.removeChild(element)},PARAM_KEY="outline";var decorators=[(StoryFn,context)=>{let{globals}=context,isActive=[!0,"true"].includes(globals.outline),isInDocs="docs"===context.viewMode,outlineStyles=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useMemo)((()=>function outlineCSS(selector){return esm.T`
    ${selector} body {
      outline: 1px solid #2980b9 !important;
    }

    ${selector} article {
      outline: 1px solid #3498db !important;
    }

    ${selector} nav {
      outline: 1px solid #0088c3 !important;
    }

    ${selector} aside {
      outline: 1px solid #33a0ce !important;
    }

    ${selector} section {
      outline: 1px solid #66b8da !important;
    }

    ${selector} header {
      outline: 1px solid #99cfe7 !important;
    }

    ${selector} footer {
      outline: 1px solid #cce7f3 !important;
    }

    ${selector} h1 {
      outline: 1px solid #162544 !important;
    }

    ${selector} h2 {
      outline: 1px solid #314e6e !important;
    }

    ${selector} h3 {
      outline: 1px solid #3e5e85 !important;
    }

    ${selector} h4 {
      outline: 1px solid #449baf !important;
    }

    ${selector} h5 {
      outline: 1px solid #c7d1cb !important;
    }

    ${selector} h6 {
      outline: 1px solid #4371d0 !important;
    }

    ${selector} main {
      outline: 1px solid #2f4f90 !important;
    }

    ${selector} address {
      outline: 1px solid #1a2c51 !important;
    }

    ${selector} div {
      outline: 1px solid #036cdb !important;
    }

    ${selector} p {
      outline: 1px solid #ac050b !important;
    }

    ${selector} hr {
      outline: 1px solid #ff063f !important;
    }

    ${selector} pre {
      outline: 1px solid #850440 !important;
    }

    ${selector} blockquote {
      outline: 1px solid #f1b8e7 !important;
    }

    ${selector} ol {
      outline: 1px solid #ff050c !important;
    }

    ${selector} ul {
      outline: 1px solid #d90416 !important;
    }

    ${selector} li {
      outline: 1px solid #d90416 !important;
    }

    ${selector} dl {
      outline: 1px solid #fd3427 !important;
    }

    ${selector} dt {
      outline: 1px solid #ff0043 !important;
    }

    ${selector} dd {
      outline: 1px solid #e80174 !important;
    }

    ${selector} figure {
      outline: 1px solid #ff00bb !important;
    }

    ${selector} figcaption {
      outline: 1px solid #bf0032 !important;
    }

    ${selector} table {
      outline: 1px solid #00cc99 !important;
    }

    ${selector} caption {
      outline: 1px solid #37ffc4 !important;
    }

    ${selector} thead {
      outline: 1px solid #98daca !important;
    }

    ${selector} tbody {
      outline: 1px solid #64a7a0 !important;
    }

    ${selector} tfoot {
      outline: 1px solid #22746b !important;
    }

    ${selector} tr {
      outline: 1px solid #86c0b2 !important;
    }

    ${selector} th {
      outline: 1px solid #a1e7d6 !important;
    }

    ${selector} td {
      outline: 1px solid #3f5a54 !important;
    }

    ${selector} col {
      outline: 1px solid #6c9a8f !important;
    }

    ${selector} colgroup {
      outline: 1px solid #6c9a9d !important;
    }

    ${selector} button {
      outline: 1px solid #da8301 !important;
    }

    ${selector} datalist {
      outline: 1px solid #c06000 !important;
    }

    ${selector} fieldset {
      outline: 1px solid #d95100 !important;
    }

    ${selector} form {
      outline: 1px solid #d23600 !important;
    }

    ${selector} input {
      outline: 1px solid #fca600 !important;
    }

    ${selector} keygen {
      outline: 1px solid #b31e00 !important;
    }

    ${selector} label {
      outline: 1px solid #ee8900 !important;
    }

    ${selector} legend {
      outline: 1px solid #de6d00 !important;
    }

    ${selector} meter {
      outline: 1px solid #e8630c !important;
    }

    ${selector} optgroup {
      outline: 1px solid #b33600 !important;
    }

    ${selector} option {
      outline: 1px solid #ff8a00 !important;
    }

    ${selector} output {
      outline: 1px solid #ff9619 !important;
    }

    ${selector} progress {
      outline: 1px solid #e57c00 !important;
    }

    ${selector} select {
      outline: 1px solid #e26e0f !important;
    }

    ${selector} textarea {
      outline: 1px solid #cc5400 !important;
    }

    ${selector} details {
      outline: 1px solid #33848f !important;
    }

    ${selector} summary {
      outline: 1px solid #60a1a6 !important;
    }

    ${selector} command {
      outline: 1px solid #438da1 !important;
    }

    ${selector} menu {
      outline: 1px solid #449da6 !important;
    }

    ${selector} del {
      outline: 1px solid #bf0000 !important;
    }

    ${selector} ins {
      outline: 1px solid #400000 !important;
    }

    ${selector} img {
      outline: 1px solid #22746b !important;
    }

    ${selector} iframe {
      outline: 1px solid #64a7a0 !important;
    }

    ${selector} embed {
      outline: 1px solid #98daca !important;
    }

    ${selector} object {
      outline: 1px solid #00cc99 !important;
    }

    ${selector} param {
      outline: 1px solid #37ffc4 !important;
    }

    ${selector} video {
      outline: 1px solid #6ee866 !important;
    }

    ${selector} audio {
      outline: 1px solid #027353 !important;
    }

    ${selector} source {
      outline: 1px solid #012426 !important;
    }

    ${selector} canvas {
      outline: 1px solid #a2f570 !important;
    }

    ${selector} track {
      outline: 1px solid #59a600 !important;
    }

    ${selector} map {
      outline: 1px solid #7be500 !important;
    }

    ${selector} area {
      outline: 1px solid #305900 !important;
    }

    ${selector} a {
      outline: 1px solid #ff62ab !important;
    }

    ${selector} em {
      outline: 1px solid #800b41 !important;
    }

    ${selector} strong {
      outline: 1px solid #ff1583 !important;
    }

    ${selector} i {
      outline: 1px solid #803156 !important;
    }

    ${selector} b {
      outline: 1px solid #cc1169 !important;
    }

    ${selector} u {
      outline: 1px solid #ff0430 !important;
    }

    ${selector} s {
      outline: 1px solid #f805e3 !important;
    }

    ${selector} small {
      outline: 1px solid #d107b2 !important;
    }

    ${selector} abbr {
      outline: 1px solid #4a0263 !important;
    }

    ${selector} q {
      outline: 1px solid #240018 !important;
    }

    ${selector} cite {
      outline: 1px solid #64003c !important;
    }

    ${selector} dfn {
      outline: 1px solid #b4005a !important;
    }

    ${selector} sub {
      outline: 1px solid #dba0c8 !important;
    }

    ${selector} sup {
      outline: 1px solid #cc0256 !important;
    }

    ${selector} time {
      outline: 1px solid #d6606d !important;
    }

    ${selector} code {
      outline: 1px solid #e04251 !important;
    }

    ${selector} kbd {
      outline: 1px solid #5e001f !important;
    }

    ${selector} samp {
      outline: 1px solid #9c0033 !important;
    }

    ${selector} var {
      outline: 1px solid #d90047 !important;
    }

    ${selector} mark {
      outline: 1px solid #ff0053 !important;
    }

    ${selector} bdi {
      outline: 1px solid #bf3668 !important;
    }

    ${selector} bdo {
      outline: 1px solid #6f1400 !important;
    }

    ${selector} ruby {
      outline: 1px solid #ff7b93 !important;
    }

    ${selector} rt {
      outline: 1px solid #ff2f54 !important;
    }

    ${selector} rp {
      outline: 1px solid #803e49 !important;
    }

    ${selector} span {
      outline: 1px solid #cc2643 !important;
    }

    ${selector} br {
      outline: 1px solid #db687d !important;
    }

    ${selector} wbr {
      outline: 1px solid #db175b !important;
          You are using Testing Library's \`screen\` object. Use \`within(canvasElement)\` instead.
          More info: https://storybook.js.org/docs/react/essentials/interactions
//# sourceMappingURL=753.04752ae4.iframe.bundle.js.map