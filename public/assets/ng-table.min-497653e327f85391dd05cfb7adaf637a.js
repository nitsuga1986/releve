/*! ngTable v0.3.2 by Vitalii Savchuk(esvit666@gmail.com) - https://github.com/esvit/ng-table - New BSD License */

!function(a,b){"use strict";return"function"==typeof define&&define.amd?(define(["angular"],function(a){return b(a)}),void 0):b(a)}(angular||null,function(a){"use strict";var b=a.module("ngTable",[]);b.factory("ngTableParams",["$q","$log",function(b,c){var d=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},e=function(e,f){var g=this,h=function(){j.debugMode&&c.debug&&c.debug.apply(this,arguments)};this.data=[],this.parameters=function(b,c){if(c=c||!1,a.isDefined(b)){for(var e in b){var f=b[e];if(c&&e.indexOf("[")>=0){for(var g=e.split(/\[(.*)\]/).reverse(),j="",k=0,l=g.length;l>k;k++){var m=g[k];if(""!==m){var n=f;f={},f[j=m]=d(n)?parseFloat(n):n}}"sorting"===j&&(i[j]={}),i[j]=a.extend(i[j]||{},f[j])}else i[e]=d(b[e])?parseFloat(b[e]):b[e]}return h("ngTable: set parameters",i),this}return i},this.settings=function(b){return a.isDefined(b)?(a.isArray(b.data)&&(b.total=b.data.length),j=a.extend(j,b),h("ngTable: set settings",j),this):j},this.page=function(b){return a.isDefined(b)?this.parameters({page:b}):i.page},this.total=function(b){return a.isDefined(b)?this.settings({total:b}):j.total},this.count=function(b){return a.isDefined(b)?this.parameters({count:b,page:1}):i.count},this.filter=function(b){return a.isDefined(b)?this.parameters({filter:b}):i.filter},this.sorting=function(b){if(2==arguments.length){var c={};return c[b]=arguments[1],this.parameters({sorting:c}),this}return a.isDefined(b)?this.parameters({sorting:b}):i.sorting},this.isSortBy=function(b,c){return a.isDefined(i.sorting[b])&&i.sorting[b]==c},this.orderBy=function(){var a=[];for(var b in i.sorting)a.push(("asc"===i.sorting[b]?"+":"-")+b);return a},this.getData=function(b,c){a.isArray(this.data)&&a.isObject(c)?b.resolve(this.data.slice((c.page()-1)*c.count(),c.page()*c.count())):b.resolve([])},this.getGroups=function(c,d){var e=b.defer();e.promise.then(function(b){var e={};a.forEach(b,function(b){var c=a.isFunction(d)?d(b):b[d];e[c]=e[c]||{data:[]},e[c].value=c,e[c].data.push(b)});var f=[];for(var g in e)f.push(e[g]);h("ngTable: refresh groups",f),c.resolve(f)}),this.getData(e,g)},this.generatePagesArray=function(a,b,c){var d,e,f,g,h,i;if(d=11,i=[],h=Math.ceil(b/c),h>1){i.push({type:"prev",number:Math.max(1,a-1),active:a>1}),i.push({type:"first",number:1,active:a>1}),f=Math.round((d-5)/2),g=Math.max(2,a-f),e=Math.min(h-1,a+2*f-(a-g)),g=Math.max(2,g-(2*f-(e-g)));for(var j=g;e>=j;)j===g&&2!==j||j===e&&j!==h-1?i.push({type:"more",active:!1}):i.push({type:"page",number:j,active:a!==j}),j++;i.push({type:"last",number:h,active:a!==h}),i.push({type:"next",number:Math.min(h,a+1),active:h>a})}return i},this.url=function(b){b=b||!1;var c=b?[]:{};for(var d in i)if(i.hasOwnProperty(d)){var e=i[d],f=encodeURIComponent(d);if("object"==typeof e){for(var g in e)if(!a.isUndefined(e[g])&&""!==e[g]){var h=f+"["+encodeURIComponent(g)+"]";b?c.push(h+"="+e[g]):c[h]=e[g]}}else a.isFunction(e)||a.isUndefined(e)||""===e||(b?c.push(f+"="+encodeURIComponent(e)):c[f]=encodeURIComponent(e))}return c},this.reload=function(){var a=b.defer(),c=this;j.$loading=!0,j.groupBy?j.getGroups(a,j.groupBy,this):j.getData(a,this),h("ngTable: reload data"),a.promise.then(function(a){j.$loading=!1,h("ngTable: current scope",j.$scope),c.data=j.groupBy?j.$scope.$groups=a:j.$scope.$data=a,j.$scope.pages=c.generatePagesArray(c.page(),c.total(),c.count()),j.$scope.$emit("ngTableAfterReloadData")})},this.reloadPages=function(){var a=this;j.$scope.pages=a.generatePagesArray(a.page(),a.total(),a.count())};var i=this.$params={page:1,count:1,filter:{},sorting:{},group:{},groupBy:null},j={$scope:null,$loading:!1,data:null,total:0,defaultSort:"desc",filterDelay:750,counts:[10,25,50,100],getGroups:this.getGroups,getData:this.getData};return this.settings(f),this.parameters(e,!0),this};return e}]);var c=["$scope","ngTableParams","$timeout",function(b,c,d){b.$loading=!1,b.params||(b.params=new c),b.params.settings().$scope=b;var e=function(){var a=0;return function(b,c){d.cancel(a),a=d(b,c)}}();b.$watch("params.$params",function(c,d){b.params.settings().$scope=b,a.equals(c.filter,d.filter)?b.params.reload():e(function(){b.params.$params.page=1,b.params.reload()},b.params.settings().filterDelay)},!0),b.sortBy=function(a,c){var d=b.parse(a.sortable);if(d){var e=b.params.settings().defaultSort,f="asc"===e?"desc":"asc",g=b.params.sorting()&&b.params.sorting()[d]&&b.params.sorting()[d]===e,h=c.ctrlKey||c.metaKey?b.params.sorting():{};h[d]=g?f:e,b.params.parameters({sorting:h})}}}];return b.directive("ngTable",["$compile","$q","$parse",function(b,d,e){return{restrict:"A",priority:1001,scope:!0,controller:c,compile:function(c){var d=[],f=0,g=null,h=c.find("thead");return a.forEach(a.element(c.find("tr")),function(b){b=a.element(b),b.hasClass("ng-table-group")||g||(g=b)}),g?(a.forEach(g.find("td"),function(b){var c=a.element(b);if(!c.attr("ignore-cell")||"true"!==c.attr("ignore-cell")){var g=function(a,b){return function(f){return e(c.attr("x-data-"+a)||c.attr("data-"+a)||c.attr(a))(f,{$columns:d})||b}},h=g("title"," "),i=g("header",!1),j=g("filter",!1)(),k=!1,l=!1;j&&j.$$name&&(l=j.$$name,delete j.$$name),j&&j.templateURL&&(k=j.templateURL,delete j.templateURL),c.attr("data-title-text",h()),d.push({id:f++,title:h,sortable:g("sortable",!1),"class":c.attr("x-data-header-class")||c.attr("data-header-class")||c.attr("header-class"),filter:j,filterTemplateURL:k,filterName:l,headerTemplateURL:i,filterData:c.attr("filter-data")?c.attr("filter-data"):null,show:c.attr("ng-show")?function(a){return e(c.attr("ng-show"))(a)}:function(){return!0}})}}),function(c,f,g){if(c.$loading=!1,c.$columns=d,c.$watch(g.ngTable,function(b){a.isUndefined(b)||(c.paramsModel=e(g.ngTable),c.params=b)},!0),c.parse=function(b){return a.isDefined(b)?b(c):""},g.showFilter&&c.$parent.$watch(g.showFilter,function(a){c.show_filter=a}),a.forEach(d,function(b){var d;if(b.filterData){if(d=e(b.filterData)(c,{$column:b}),!a.isObject(d)||!a.isObject(d.promise))throw new Error("Function "+b.filterData+" must be instance of $q.defer()");return delete b.filterData,d.promise.then(function(c){a.isArray(c)||(c=[]),c.unshift({title:"-",id:""}),b.data=c})}}),!f.hasClass("ng-table")){c.templates={header:g.templateHeader?g.templateHeader:"ng-table/header.html",pagination:g.templatePagination?g.templatePagination:"ng-table/pager.html"};var i=h.length>0?h:a.element(document.createElement("thead")).attr("ng-include","templates.header"),j=a.element(document.createElement("div")).attr({"ng-table-pagination":"params","template-url":"templates.pagination"});f.find("thead").remove(),f.addClass("ng-table").prepend(i).after(j),b(i)(c),b(j)(c)}}):void 0}}}]),b.directive("ngTablePagination",["$compile",function(b){return{restrict:"A",scope:{params:"=ngTablePagination",templateUrl:"="},replace:!1,link:function(c,d){c.params.settings().$scope.$on("ngTableAfterReloadData",function(){c.pages=c.params.generatePagesArray(c.params.page(),c.params.total(),c.params.count())},!0),c.$watch("templateUrl",function(e){if(!a.isUndefined(e)){var f=a.element(document.createElement("div"));f.attr({"ng-include":"templateUrl"}),d.append(f),b(f)(c)}})}}}]),a.module("ngTable").run(["$templateCache",function(a){a.put("ng-table/filters/select-multiple.html",'<select ng-options="data.id as data.title for data in column.data" multiple ng-multiple="true" ng-model="params.filter()[name]" ng-show="filter==\'select-multiple\'" class="filter filter-select-multiple form-control" name="{{column.filterName}}"> </select>'),a.put("ng-table/filters/select.html",'<select ng-options="data.id as data.title for data in column.data" ng-model="params.filter()[name]" ng-show="filter==\'select\'" class="filter filter-select form-control" name="{{column.filterName}}"> </select>'),a.put("ng-table/filters/text.html",'<input type="text" name="{{column.filterName}}" ng-model="params.filter()[name]" ng-if="filter==\'text\'" class="input-filter form-control"/>'),a.put("ng-table/header.html",'<tr> <th ng-repeat="column in $columns" ng-class="{ \'sortable\': parse(column.sortable), \'sort-asc\': params.sorting()[parse(column.sortable)]==\'asc\', \'sort-desc\': params.sorting()[parse(column.sortable)]==\'desc\' }" ng-click="sortBy(column, $event)" ng-show="column.show(this)" ng-init="template=column.headerTemplateURL(this)" class="header {{column.class}}"> <div ng-if="!template" ng-show="!template" ng-bind="parse(column.title)"></div> <div ng-if="template" ng-show="template"><div ng-include="template"></div></div> </th> </tr> <tr ng-show="show_filter" class="ng-table-filters"> <th ng-repeat="column in $columns" ng-show="column.show(this)" class="filter"> <div ng-repeat="(name, filter) in column.filter"> <div ng-if="column.filterTemplateURL" ng-show="column.filterTemplateURL"> <div ng-include="column.filterTemplateURL"></div> </div> <div ng-if="!column.filterTemplateURL" ng-show="!column.filterTemplateURL"> <div ng-include="\'ng-table/filters/\' + filter + \'.html\'"></div> </div> </div> </th> </tr>'),a.put("ng-table/pager.html",'<div class="ng-cloak ng-table-pager"> <div ng-if="params.settings().counts.length" class="ng-table-counts btn-group pull-right"> <button ng-repeat="count in params.settings().counts" type="button" ng-class="{\'active\':params.count()==count}" ng-click="params.count(count)" class="btn btn-default"> <span ng-bind="count"></span> </button> </div> <ul class="pagination ng-table-pagination"> <li ng-class="{\'disabled\': !page.active}" ng-repeat="page in pages" ng-switch="page.type"> <a ng-switch-when="prev" ng-click="params.page(page.number)" href="">&laquo;</a> <a ng-switch-when="first" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="page" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="more" ng-click="params.page(page.number)" href="">&#8230;</a> <a ng-switch-when="last" ng-click="params.page(page.number)" href=""><span ng-bind="page.number"></span></a> <a ng-switch-when="next" ng-click="params.page(page.number)" href="">&raquo;</a> </li> </ul> </div> ')}]),b});
//# sourceMappingURL=ng-table.map
;
