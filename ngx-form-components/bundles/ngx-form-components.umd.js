(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-form-components', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['ngx-form-components'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,i0,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxFormComponentsService = /** @class */ (function () {
        function NgxFormComponentsService() {
        }
        NgxFormComponentsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NgxFormComponentsService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxFormComponentsService.ngInjectableDef = i0.defineInjectable({ factory: function NgxFormComponentsService_Factory() { return new NgxFormComponentsService(); }, token: NgxFormComponentsService, providedIn: "root" });
        return NgxFormComponentsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxFormComponentsComponent = /** @class */ (function () {
        function NgxFormComponentsComponent() {
        }
        /**
         * @return {?}
         */
        NgxFormComponentsComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        NgxFormComponentsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nfc-ngx-form-components',
                        template: "\n    <p>\n      ngx-form-components works!\n    </p>\n  "
                    }] }
        ];
        /** @nocollapse */
        NgxFormComponentsComponent.ctorParameters = function () { return []; };
        return NgxFormComponentsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var noop = function () { };
    var RangeInputComponent = /** @class */ (function () {
        function RangeInputComponent(elementRef, renderer, iterableDiffers) {
            this.elementRef = elementRef;
            this.renderer = renderer;
            this.iterableDiffers = iterableDiffers;
            this.min = 0;
            this.max = 100;
            this.step = 1;
            this.toolTips = false;
            this.minRangeSlider = false;
            this.rangeChange = new i0.EventEmitter();
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
            // tooltip variables
            this.combineToolTip = false;
            this.iterableDiffer = this.iterableDiffers.find([]).create(null);
        }
        /**
         * @return {?}
         */
        RangeInputComponent.prototype.ngDoCheck = /**
         * @return {?}
         */
            function () {
                /** @type {?} */
                var changes = this.iterableDiffer.diff(this.range);
                if (changes) {
                    this.onChangeCallback(this.range);
                    this.onTouchedCallback(this.range);
                    // only emit array when min range slider is active, else emit number
                    if (this.minRangeSlider) {
                        this.rangeChange.emit(this.range);
                    }
                    else {
                        this.rangeChange.emit(this.range[1]);
                    }
                }
            };
        /**
         * @return {?}
         */
        RangeInputComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                // sets range default value and removes the min slider button if disabled
                this.setDefaultRange();
                // sets all related dimensions (slider bar, -highlighter bar, -buttons and -tooltips)
                this.setDimensions();
                this.setCustomCss();
            };
        /**
         * @return {?}
         */
        RangeInputComponent.prototype.setDefaultRange = /**
         * @return {?}
         */
            function () {
                // init range variable
                if (!isNaN(this.defaultRange)) {
                    this.range = [this.min, this.defaultRange];
                }
                else if (Array.isArray(this.defaultRange) && this.defaultRange.length === 2 && !this.defaultRange.some(isNaN)) {
                    // check if default values are compliant with min and max values
                    if (this.defaultRange[0] >= this.min && this.defaultRange[1] <= this.max) {
                        // set default values to passed array if minRangeSlider is on
                        if (this.minRangeSlider) {
                            this.range = this.defaultRange;
                        }
                        else {
                            // set default value to min if minRangeSlider is off
                            this.range = [this.min, this.defaultRange[1]];
                        }
                    }
                    else {
                        // fallback if default values are not compliant with min and max values
                        console.error("default range is not compliant with min and max values ... set fallback values");
                        this.range = [this.min, Math.round(this.max / 2)];
                    }
                }
                else {
                    // fallback if array has anything else than 2 slots, anything but numbers or is not array
                    this.range = [this.min, Math.round(this.max / 2)];
                }
                // init min range, when it's only one slider
                if (!this.minRangeSlider) {
                    this.renderer.addClass(this.minSliderButton.nativeElement, 'nfc-range-input__slider-button--hidden');
                }
            };
        /**
         * @return {?}
         */
        RangeInputComponent.prototype.setCustomCss = /**
         * @return {?}
         */
            function () {
                if (this.sliderButtonCssClass) {
                    this.setSliderCss(this.sliderButtonCssClass);
                }
                if (this.barCssClass) {
                    this.setBarCss(this.barCssClass);
                }
                if (this.highlightBarCssClass) {
                    this.setBarHighlightCss(this.highlightBarCssClass);
                }
            };
        /**
         * @param {?} customCssClass
         * @return {?}
         */
        RangeInputComponent.prototype.setBarCss = /**
         * @param {?} customCssClass
         * @return {?}
         */
            function (customCssClass) {
                this.renderer.removeClass(this.bar.nativeElement, 'nfc-range-input__bar-styling');
                this.renderer.addClass(this.bar.nativeElement, customCssClass);
            };
        /**
         * @param {?} customCssClass
         * @return {?}
         */
        RangeInputComponent.prototype.setBarHighlightCss = /**
         * @param {?} customCssClass
         * @return {?}
         */
            function (customCssClass) {
                this.renderer.removeClass(this.barHighlight.nativeElement, 'nfc-range-input__bar-highlight-styling');
                this.renderer.addClass(this.barHighlight.nativeElement, customCssClass);
            };
        /**
         * @param {?} customCssClass
         * @return {?}
         */
        RangeInputComponent.prototype.setSliderCss = /**
         * @param {?} customCssClass
         * @return {?}
         */
            function (customCssClass) {
                if (this.minSliderButton) {
                    this.renderer.removeClass(this.minSliderButton.nativeElement, 'nfc-range-input__slider-button-styling');
                    this.renderer.addClass(this.minSliderButton.nativeElement, customCssClass);
                }
                if (this.minSliderButton) {
                    this.renderer.removeClass(this.maxSliderButton.nativeElement, 'nfc-range-input__slider-button-styling');
                    this.renderer.addClass(this.maxSliderButton.nativeElement, customCssClass);
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        RangeInputComponent.prototype.minTouched = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var evt = event.changedTouches[0];
                this.minMouseDown(evt);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        RangeInputComponent.prototype.maxTouched = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var evt = event.changedTouches[0];
                this.maxMouseDown(evt);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        RangeInputComponent.prototype.minMouseDown = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.minSliderClicked = true;
                this.minSelected = true;
                this.maxSliderClicked = false;
                this.maxSelected = false;
                this.minSliderInitialLeft = event.target.offsetLeft;
                this.initialMinMouseX = event.clientX;
            };
        /**
         * @param {?} event
         * @return {?}
         */
        RangeInputComponent.prototype.maxMouseDown = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.maxSliderClicked = true;
                this.maxSelected = true;
                this.minSliderClicked = false;
                this.minSelected = false;
                this.maxSliderInitialLeft = event.target.offsetLeft;
                this.initialMaxMouseX = event.clientX;
            };
        /**
         * @param {?} event
         * @return {?}
         */
        RangeInputComponent.prototype.touchMove = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                /** @type {?} */
                var evt = event.changedTouches[0];
                this.mouseMove(evt);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        RangeInputComponent.prototype.onResize = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.range) {
                    this.setDimensions();
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        RangeInputComponent.prototype.mouseMove = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (this.minSelected || this.maxSelected) {
                    if (this.minSelected) {
                        this.minChange = event.clientX - this.initialMinMouseX;
                        /** @type {?} */
                        var left = this.minSliderInitialLeft + this.minChange;
                        /** @type {?} */
                        var value = this.pixToVal(this.min, left);
                        if (value <= this.range[1]) {
                            if (value <= this.min) {
                                this.minSliderLeft = 0;
                                this.range[0] = this.min;
                            }
                            else {
                                /** @type {?} */
                                var finalVal = this.calculateDistance(value);
                                this.range[0] = finalVal <= this.range[1] ? finalVal : this.range[1];
                                this.minSliderLeft = this.valToPixel(this.range[0]);
                            }
                        }
                    }
                    else if (this.maxSelected) {
                        this.maxChange = event.clientX - this.initialMaxMouseX;
                        /** @type {?} */
                        var left = this.maxSliderInitialLeft + this.maxChange;
                        /** @type {?} */
                        var value = this.pixToVal(this.min, left);
                        if (value >= this.range[0]) {
                            if (value >= this.max) {
                                this.maxSliderLeft = this.rangeInPixels;
                                this.range[1] = this.max;
                            }
                            else {
                                /** @type {?} */
                                var final = this.calculateDistance(value);
                                this.range[1] = final > this.range[0] ? final <= this.max ? final : this.max : this.range[0];
                                this.maxSliderLeft = this.valToPixel(this.range[1]);
                            }
                        }
                    }
                    this.setHighlightBarDimensions();
                    this.setTooltipDimensions();
                }
                return false;
            };
        /**
         * @param {?} event
         * @return {?}
         */
        RangeInputComponent.prototype.mouseUp = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.minSelected = false;
                this.maxSelected = false;
            };
        /**
         * @param {?} value
         * @return {?}
         */
        RangeInputComponent.prototype.calculateDistance = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                if (this.step) {
                    /** @type {?} */
                    var fin = value - Math.floor(value);
                    if (fin >= 0.5) {
                        value = Math.ceil(value);
                    }
                    else {
                        value = Math.floor(value);
                    }
                    /** @type {?} */
                    var remainder = value % this.step;
                    if (remainder === 0) {
                        return value;
                    }
                    else {
                        if (remainder >= (this.step / 2)) {
                            value = value + (this.step - remainder);
                        }
                        else {
                            value = value - remainder;
                        }
                    }
                }
                return value;
            };
        /**
         * @return {?}
         */
        RangeInputComponent.prototype.setDimensions = /**
         * @return {?}
         */
            function () {
                if (this.bar && this.maxSliderButton && this.range && this.range[0] !== undefined) {
                    this.setBarAndSliderDimensions();
                    this.setHighlightBarDimensions();
                    this.setTooltipDimensions();
                }
            };
        /**
         * @return {?}
         */
        RangeInputComponent.prototype.setBarAndSliderDimensions = /**
         * @return {?}
         */
            function () {
                this.sliderWidth = this.maxSliderButton.nativeElement.offsetWidth;
                this.sliderHeight = this.maxSliderButton.nativeElement.offsetHeight;
                this.barWidth = this.bar.nativeElement.offsetWidth;
                if (this.sliderWidth && this.barWidth) {
                    this.rangeDiff = this.max - this.min;
                    this.rangeInPixels = this.barWidth - this.sliderWidth;
                    if (this.barWidth && this.sliderWidth) {
                        this.valToPixelFactor = ((this.rangeInPixels) / this.rangeDiff);
                    }
                    this.minSliderLeft = (this.range[0] - this.min) * this.valToPixelFactor;
                    this.maxSliderLeft = (this.range[1] - this.min) * this.valToPixelFactor;
                }
            };
        /**
         * @return {?}
         */
        RangeInputComponent.prototype.setHighlightBarDimensions = /**
         * @return {?}
         */
            function () {
                if (this.minRangeSlider) {
                    this.highlightBarLeft = this.minSliderLeft + (this.sliderWidth / 2);
                }
                else {
                    this.highlightBarLeft = this.minSliderLeft;
                }
                this.highlightBarWidth = this.maxSliderLeft - this.minSliderLeft;
            };
        /**
         * @return {?}
         */
        RangeInputComponent.prototype.setTooltipDimensions = /**
         * @return {?}
         */
            function () {
                this.toolTipTop = (this.sliderHeight + 10) * -1;
                this.minToolTipWidth = this.getToolTipLength(this.range[0].toString());
                /** @type {?} */
                var cond = this.minToolTipWidth * 8 + this.minSliderLeft + 8;
                if (cond > this.maxSliderLeft && this.toolTips && this.minRangeSlider) {
                    this.combineToolTip = true;
                    this.combineToolTipWidth = this.getToolTipLength(this.range[0] + "-" + this.range[1]) * 8;
                    /** @type {?} */
                    var maxLeft = this.rangeInPixels - this.combineToolTipWidth;
                    this.combineToolTipLeft = this.minSliderLeft < maxLeft ? this.minSliderLeft : maxLeft;
                }
                else {
                    this.combineToolTip = false;
                }
            };
        /**
         * @param {?} num
         * @return {?}
         */
        RangeInputComponent.prototype.getToolTipLength = /**
         * @param {?} num
         * @return {?}
         */
            function (num) {
                return String(num).match(/\d/g).length;
            };
        /**
         * @param {?} min
         * @param {?} left
         * @return {?}
         */
        RangeInputComponent.prototype.pixToVal = /**
         * @param {?} min
         * @param {?} left
         * @return {?}
         */
            function (min, left) {
                return Number((min + left * (1 / this.valToPixelFactor)).toFixed(2));
            };
        /**
         * @param {?} value
         * @return {?}
         */
        RangeInputComponent.prototype.valToPixel = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                return this.valToPixelFactor * (value - this.min);
            };
        RangeInputComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'nfc-range-input',
                        template: "<div #bar class=\"nfc-range-input nfc-range-input__bar nfc-range-input__bar-styling\"\n     (touchmove)=\"touchMove($event)\" (touchend)=\"mouseUp($event)\">\n\n  <!-- tooltips -->\n  <span *ngIf=\"toolTips && minRangeSlider && !combineToolTip\" class=\"nfc-range-input__tooltip\"\n        [style.top.px]=\"toolTipTop\" [style.left.px]=\"minSliderLeft\">{{range[0]}}</span>\n  <span *ngIf=\"toolTips && !combineToolTip\" class=\"nfc-range-input__tooltip\"\n        [style.top.px]=\"toolTipTop\" [style.left.px]=\"maxSliderLeft\">{{range[1]}}</span>\n  <span *ngIf=\"toolTips && minRangeSlider && range && combineToolTip\" class=\"nfc-range-input__tooltip\"\n        [style.top.px]=\"toolTipTop\" [style.left.px]=\"combineToolTipLeft\"  >{{range[0]}}-{{range[1]}}</span>\n\n  <!-- bar highlight -->\n  <div #barHighlight class=\"nfc-range-input__bar-highlight nfc-range-input__bar-highlight-styling\"\n       [style.left.px]=\"highlightBarLeft\" [style.width.px]=\"highlightBarWidth\"></div>\n  <!-- left slider -->\n  <div #minSliderButton class=\"nfc-range-input__slider-button nfc-range-input__slider-button-styling\"\n       [style.left.px]=\"minSliderLeft\" (mousedown)=\"minMouseDown($event)\"\n       (mouseup)=\"mouseUp($event)\" (touchstart)=\"minTouched($event)\"></div>\n  <!-- right slider -->\n  <div #maxSliderButton class=\"nfc-range-input__slider-button nfc-range-input__slider-button-styling\"\n       [style.left.px]=\"maxSliderLeft\" (mousedown)=\"maxMouseDown($event)\"\n       (mouseup)=\"mouseUp($event)\" (touchstart)=\"maxTouched($event)\"></div>\n\n</div>\n",
                        styles: [".nfc-range-input{position:relative;margin:20px 0;box-sizing:border-box}.nfc-range-input__slider-button{position:absolute;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.nfc-range-input__slider-button-styling{width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 2px 4px rgba(0,0,0,.2);cursor:pointer}.nfc-range-input__slider-button--hidden{display:none}.nfc-range-input__bar{width:100%}.nfc-range-input__bar-styling{height:4px;border-radius:4px;background:#d3d3d3}.nfc-range-input__bar-highlight{position:absolute;height:inherit}.nfc-range-input__bar-highlight-styling{background:#4169e1;border-radius:4px}.nfc-range-input__tooltip{position:absolute}"]
                    }] }
        ];
        /** @nocollapse */
        RangeInputComponent.ctorParameters = function () {
            return [
                { type: i0.ElementRef },
                { type: i0.Renderer2 },
                { type: i0.IterableDiffers }
            ];
        };
        RangeInputComponent.propDecorators = {
            min: [{ type: i0.Input }],
            max: [{ type: i0.Input }],
            step: [{ type: i0.Input }],
            toolTips: [{ type: i0.Input }],
            minRangeSlider: [{ type: i0.Input }],
            defaultRange: [{ type: i0.Input }],
            highlightBarCssClass: [{ type: i0.Input }],
            barCssClass: [{ type: i0.Input }],
            sliderButtonCssClass: [{ type: i0.Input }],
            rangeChange: [{ type: i0.Output }],
            bar: [{ type: i0.ViewChild, args: ['bar',] }],
            minSliderButton: [{ type: i0.ViewChild, args: ['minSliderButton',] }],
            maxSliderButton: [{ type: i0.ViewChild, args: ['maxSliderButton',] }],
            barHighlight: [{ type: i0.ViewChild, args: ['barHighlight',] }],
            onResize: [{ type: i0.HostListener, args: ['window:resize', ['$event'],] }],
            mouseMove: [{ type: i0.HostListener, args: ['window:mousemove', ['$event'],] }],
            mouseUp: [{ type: i0.HostListener, args: ['window:mouseup', ['$event'],] }]
        };
        return RangeInputComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxFormComponentsModule = /** @class */ (function () {
        function NgxFormComponentsModule() {
        }
        NgxFormComponentsModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [
                            NgxFormComponentsComponent,
                            RangeInputComponent
                        ],
                        imports: [
                            common.CommonModule
                        ],
                        exports: [
                            NgxFormComponentsComponent,
                            RangeInputComponent
                        ]
                    },] }
        ];
        return NgxFormComponentsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgxFormComponentsService = NgxFormComponentsService;
    exports.NgxFormComponentsComponent = NgxFormComponentsComponent;
    exports.NgxFormComponentsModule = NgxFormComponentsModule;
    exports.RangeInputComponent = RangeInputComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWZvcm0tY29tcG9uZW50cy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1mb3JtLWNvbXBvbmVudHMvbGliL25neC1mb3JtLWNvbXBvbmVudHMuc2VydmljZS50cyIsIm5nOi8vbmd4LWZvcm0tY29tcG9uZW50cy9saWIvbmd4LWZvcm0tY29tcG9uZW50cy5jb21wb25lbnQudHMiLCJuZzovL25neC1mb3JtLWNvbXBvbmVudHMvbGliL3JhbmdlLWlucHV0L3JhbmdlLWlucHV0LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWZvcm0tY29tcG9uZW50cy9saWIvbmd4LWZvcm0tY29tcG9uZW50cy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hGb3JtQ29tcG9uZW50c1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZmMtbmd4LWZvcm0tY29tcG9uZW50cycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBuZ3gtZm9ybS1jb21wb25lbnRzIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGb3JtQ29tcG9uZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xyXG4gIENvbXBvbmVudCwgRG9DaGVjayxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5wdXQsXHJcbiAgSXRlcmFibGVEaWZmZXJzLFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFZpZXdDaGlsZFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZmMtcmFuZ2UtaW5wdXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yYW5nZS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcmFuZ2UtaW5wdXQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYW5nZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBEb0NoZWNrIHtcclxuXHJcbiAgQElucHV0KCkgbWluPzogbnVtYmVyID0gMDtcclxuICBASW5wdXQoKSBtYXg/OiBudW1iZXIgPSAxMDA7XHJcbiAgQElucHV0KCkgc3RlcD86IG51bWJlciA9IDE7XHJcbiAgQElucHV0KCkgdG9vbFRpcHM/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbWluUmFuZ2VTbGlkZXI/OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgZGVmYXVsdFJhbmdlPzogYW55O1xyXG4gIEBJbnB1dCgpIGhpZ2hsaWdodEJhckNzc0NsYXNzPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGJhckNzc0NsYXNzPzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHNsaWRlckJ1dHRvbkNzc0NsYXNzPzogc3RyaW5nO1xyXG5cclxuICBAT3V0cHV0KCkgcmFuZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2JhcicpIGJhcjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdtaW5TbGlkZXJCdXR0b24nKSBtaW5TbGlkZXJCdXR0b246IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbWF4U2xpZGVyQnV0dG9uJykgbWF4U2xpZGVyQnV0dG9uOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2JhckhpZ2hsaWdodCcpIGJhckhpZ2hsaWdodDogRWxlbWVudFJlZjtcclxuXHJcbiAgcHJpdmF0ZSB2YWxUb1BpeGVsRmFjdG9yOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBpdGVyYWJsZURpZmZlcjogYW55O1xyXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xyXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XHJcblxyXG4gIC8vIGRpbWVuc2lvbmFsIHZhcmlhYmxlc1xyXG4gIG1pblNsaWRlckxlZnQ6IG51bWJlcjtcclxuICBtYXhTbGlkZXJMZWZ0OiBudW1iZXI7XHJcbiAgc2xpZGVyV2lkdGg6IG51bWJlcjtcclxuICBzbGlkZXJIZWlnaHQ6IG51bWJlcjtcclxuICBiYXJXaWR0aDogbnVtYmVyO1xyXG4gIGhpZ2hsaWdodEJhcldpZHRoOiBudW1iZXI7XHJcbiAgaGlnaGxpZ2h0QmFyTGVmdDogbnVtYmVyO1xyXG5cclxuICAvLyBjYWxjdWxhdGlvbiBhbmQgZXZlbnQgdmFyaWFibGVzXHJcbiAgcmFuZ2U6IG51bWJlcltdO1xyXG4gIHJhbmdlRGlmZjogbnVtYmVyO1xyXG4gIG1pblNsaWRlckNsaWNrZWQ6IGJvb2xlYW47XHJcbiAgbWluU2VsZWN0ZWQ6IGJvb2xlYW47XHJcbiAgbWF4U2xpZGVyQ2xpY2tlZDogYm9vbGVhbjtcclxuICBtYXhTZWxlY3RlZDogYm9vbGVhbjtcclxuICBtaW5TbGlkZXJJbml0aWFsTGVmdDogbnVtYmVyO1xyXG4gIGluaXRpYWxNaW5Nb3VzZVg6IG51bWJlcjtcclxuICBtYXhTbGlkZXJJbml0aWFsTGVmdDogbnVtYmVyO1xyXG4gIGluaXRpYWxNYXhNb3VzZVg6IG51bWJlcjtcclxuICByYW5nZUluUGl4ZWxzOiBudW1iZXI7XHJcbiAgbWluQ2hhbmdlOiBudW1iZXI7XHJcbiAgbWF4Q2hhbmdlOiBudW1iZXI7XHJcblxyXG4gIC8vIHRvb2x0aXAgdmFyaWFibGVzXHJcbiAgY29tYmluZVRvb2xUaXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBjb21iaW5lVG9vbFRpcExlZnQ6IG51bWJlcjtcclxuICBtaW5Ub29sVGlwV2lkdGg6IG51bWJlcjtcclxuICBjb21iaW5lVG9vbFRpcFdpZHRoOiBudW1iZXI7XHJcbiAgdG9vbFRpcFRvcDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgaXRlcmFibGVEaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMpIHtcclxuXHJcbiAgICB0aGlzLml0ZXJhYmxlRGlmZmVyID0gdGhpcy5pdGVyYWJsZURpZmZlcnMuZmluZChbXSkuY3JlYXRlKG51bGwpO1xyXG4gIH1cclxuXHJcbiAgbmdEb0NoZWNrKCkge1xyXG4gICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuaXRlcmFibGVEaWZmZXIuZGlmZih0aGlzLnJhbmdlKTtcclxuICAgIGlmIChjaGFuZ2VzKSB7XHJcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLnJhbmdlKTtcclxuICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayh0aGlzLnJhbmdlKTtcclxuXHJcbiAgICAgIC8vIG9ubHkgZW1pdCBhcnJheSB3aGVuIG1pbiByYW5nZSBzbGlkZXIgaXMgYWN0aXZlLCBlbHNlIGVtaXQgbnVtYmVyXHJcbiAgICAgIGlmICh0aGlzLm1pblJhbmdlU2xpZGVyKSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZUNoYW5nZS5lbWl0KHRoaXMucmFuZ2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmFuZ2VDaGFuZ2UuZW1pdCh0aGlzLnJhbmdlWzFdKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBzZXRzIHJhbmdlIGRlZmF1bHQgdmFsdWUgYW5kIHJlbW92ZXMgdGhlIG1pbiBzbGlkZXIgYnV0dG9uIGlmIGRpc2FibGVkXHJcbiAgICB0aGlzLnNldERlZmF1bHRSYW5nZSgpO1xyXG4gICAgLy8gc2V0cyBhbGwgcmVsYXRlZCBkaW1lbnNpb25zIChzbGlkZXIgYmFyLCAtaGlnaGxpZ2h0ZXIgYmFyLCAtYnV0dG9ucyBhbmQgLXRvb2x0aXBzKVxyXG4gICAgdGhpcy5zZXREaW1lbnNpb25zKCk7XHJcbiAgICB0aGlzLnNldEN1c3RvbUNzcygpO1xyXG4gIH1cclxuXHJcbiAgc2V0RGVmYXVsdFJhbmdlKCkge1xyXG4gICAgLy8gaW5pdCByYW5nZSB2YXJpYWJsZVxyXG4gICAgaWYgKCFpc05hTih0aGlzLmRlZmF1bHRSYW5nZSkpIHtcclxuICAgICAgdGhpcy5yYW5nZSA9IFt0aGlzLm1pbiwgdGhpcy5kZWZhdWx0UmFuZ2VdO1xyXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZGVmYXVsdFJhbmdlKSAmJiB0aGlzLmRlZmF1bHRSYW5nZS5sZW5ndGggPT09IDIgJiYgIXRoaXMuZGVmYXVsdFJhbmdlLnNvbWUoaXNOYU4pKSB7XHJcbiAgICAgIC8vIGNoZWNrIGlmIGRlZmF1bHQgdmFsdWVzIGFyZSBjb21wbGlhbnQgd2l0aCBtaW4gYW5kIG1heCB2YWx1ZXNcclxuICAgICAgaWYgKHRoaXMuZGVmYXVsdFJhbmdlWzBdID49IHRoaXMubWluICYmIHRoaXMuZGVmYXVsdFJhbmdlWzFdIDw9IHRoaXMubWF4KSB7XHJcbiAgICAgICAgLy8gc2V0IGRlZmF1bHQgdmFsdWVzIHRvIHBhc3NlZCBhcnJheSBpZiBtaW5SYW5nZVNsaWRlciBpcyBvblxyXG4gICAgICAgIGlmICh0aGlzLm1pblJhbmdlU2xpZGVyKSB7XHJcbiAgICAgICAgICB0aGlzLnJhbmdlID0gdGhpcy5kZWZhdWx0UmFuZ2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHNldCBkZWZhdWx0IHZhbHVlIHRvIG1pbiBpZiBtaW5SYW5nZVNsaWRlciBpcyBvZmZcclxuICAgICAgICAgIHRoaXMucmFuZ2UgPSBbdGhpcy5taW4sIHRoaXMuZGVmYXVsdFJhbmdlWzFdXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gZmFsbGJhY2sgaWYgZGVmYXVsdCB2YWx1ZXMgYXJlIG5vdCBjb21wbGlhbnQgd2l0aCBtaW4gYW5kIG1heCB2YWx1ZXNcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBkZWZhdWx0IHJhbmdlIGlzIG5vdCBjb21wbGlhbnQgd2l0aCBtaW4gYW5kIG1heCB2YWx1ZXMgLi4uIHNldCBmYWxsYmFjayB2YWx1ZXNgKTtcclxuICAgICAgICB0aGlzLnJhbmdlID0gW3RoaXMubWluLCBNYXRoLnJvdW5kKHRoaXMubWF4IC8gMildO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBmYWxsYmFjayBpZiBhcnJheSBoYXMgYW55dGhpbmcgZWxzZSB0aGFuIDIgc2xvdHMsIGFueXRoaW5nIGJ1dCBudW1iZXJzIG9yIGlzIG5vdCBhcnJheVxyXG4gICAgICB0aGlzLnJhbmdlID0gW3RoaXMubWluLCBNYXRoLnJvdW5kKHRoaXMubWF4IC8gMildO1xyXG4gICAgfVxyXG4gICAgLy8gaW5pdCBtaW4gcmFuZ2UsIHdoZW4gaXQncyBvbmx5IG9uZSBzbGlkZXJcclxuICAgIGlmICghdGhpcy5taW5SYW5nZVNsaWRlcikge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubWluU2xpZGVyQnV0dG9uLm5hdGl2ZUVsZW1lbnQsICduZmMtcmFuZ2UtaW5wdXRfX3NsaWRlci1idXR0b24tLWhpZGRlbicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0Q3VzdG9tQ3NzKCkge1xyXG4gICAgaWYgKHRoaXMuc2xpZGVyQnV0dG9uQ3NzQ2xhc3MpIHtcclxuICAgICAgdGhpcy5zZXRTbGlkZXJDc3ModGhpcy5zbGlkZXJCdXR0b25Dc3NDbGFzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuYmFyQ3NzQ2xhc3MpIHtcclxuICAgICAgdGhpcy5zZXRCYXJDc3ModGhpcy5iYXJDc3NDbGFzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaGlnaGxpZ2h0QmFyQ3NzQ2xhc3MpIHtcclxuICAgICAgdGhpcy5zZXRCYXJIaWdobGlnaHRDc3ModGhpcy5oaWdobGlnaHRCYXJDc3NDbGFzcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRCYXJDc3MoY3VzdG9tQ3NzQ2xhc3M6IHN0cmluZykge1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmJhci5uYXRpdmVFbGVtZW50LCAnbmZjLXJhbmdlLWlucHV0X19iYXItc3R5bGluZycpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmJhci5uYXRpdmVFbGVtZW50LCBjdXN0b21Dc3NDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBzZXRCYXJIaWdobGlnaHRDc3MoY3VzdG9tQ3NzQ2xhc3M6IHN0cmluZykge1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmJhckhpZ2hsaWdodC5uYXRpdmVFbGVtZW50LCAnbmZjLXJhbmdlLWlucHV0X19iYXItaGlnaGxpZ2h0LXN0eWxpbmcnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5iYXJIaWdobGlnaHQubmF0aXZlRWxlbWVudCwgY3VzdG9tQ3NzQ2xhc3MpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2xpZGVyQ3NzKGN1c3RvbUNzc0NsYXNzOiBzdHJpbmcpIHtcclxuICAgIGlmICh0aGlzLm1pblNsaWRlckJ1dHRvbikge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMubWluU2xpZGVyQnV0dG9uLm5hdGl2ZUVsZW1lbnQsICduZmMtcmFuZ2UtaW5wdXRfX3NsaWRlci1idXR0b24tc3R5bGluZycpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubWluU2xpZGVyQnV0dG9uLm5hdGl2ZUVsZW1lbnQsIGN1c3RvbUNzc0NsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5taW5TbGlkZXJCdXR0b24pIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLm1heFNsaWRlckJ1dHRvbi5uYXRpdmVFbGVtZW50LCAnbmZjLXJhbmdlLWlucHV0X19zbGlkZXItYnV0dG9uLXN0eWxpbmcnKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLm1heFNsaWRlckJ1dHRvbi5uYXRpdmVFbGVtZW50LCBjdXN0b21Dc3NDbGFzcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBtaW5Ub3VjaGVkKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IGV2dCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xyXG4gICAgdGhpcy5taW5Nb3VzZURvd24oZXZ0KTtcclxuICB9XHJcblxyXG4gIG1heFRvdWNoZWQoZXZlbnQ6IGFueSkge1xyXG4gICAgY29uc3QgZXZ0ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XHJcbiAgICB0aGlzLm1heE1vdXNlRG93bihldnQpO1xyXG4gIH1cclxuXHJcbiAgbWluTW91c2VEb3duKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMubWluU2xpZGVyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICB0aGlzLm1pblNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIHRoaXMubWF4U2xpZGVyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYXhTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5taW5TbGlkZXJJbml0aWFsTGVmdCA9IGV2ZW50LnRhcmdldC5vZmZzZXRMZWZ0O1xyXG4gICAgdGhpcy5pbml0aWFsTWluTW91c2VYID0gZXZlbnQuY2xpZW50WDtcclxuICB9XHJcblxyXG4gIG1heE1vdXNlRG93bihldmVudDogYW55KSB7XHJcbiAgICB0aGlzLm1heFNsaWRlckNsaWNrZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5tYXhTZWxlY3RlZCA9IHRydWU7XHJcbiAgICB0aGlzLm1pblNsaWRlckNsaWNrZWQgPSBmYWxzZTtcclxuICAgIHRoaXMubWluU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMubWF4U2xpZGVySW5pdGlhbExlZnQgPSBldmVudC50YXJnZXQub2Zmc2V0TGVmdDtcclxuICAgIHRoaXMuaW5pdGlhbE1heE1vdXNlWCA9IGV2ZW50LmNsaWVudFg7XHJcbiAgfVxyXG5cclxuICB0b3VjaE1vdmUoZXZlbnQ6IGFueSkge1xyXG4gICAgY29uc3QgZXZ0ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XHJcbiAgICB0aGlzLm1vdXNlTW92ZShldnQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXHJcbiAgb25SZXNpemUoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMucmFuZ2UpIHtcclxuICAgICAgdGhpcy5zZXREaW1lbnNpb25zKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6bW91c2Vtb3ZlJywgWyckZXZlbnQnXSlcclxuICBtb3VzZU1vdmUoZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKHRoaXMubWluU2VsZWN0ZWQgfHwgdGhpcy5tYXhTZWxlY3RlZCkge1xyXG4gICAgICBpZiAodGhpcy5taW5TZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMubWluQ2hhbmdlID0gZXZlbnQuY2xpZW50WCAtIHRoaXMuaW5pdGlhbE1pbk1vdXNlWDtcclxuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5taW5TbGlkZXJJbml0aWFsTGVmdCArIHRoaXMubWluQ2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5waXhUb1ZhbCh0aGlzLm1pbiwgbGVmdCk7XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLnJhbmdlWzFdKSB7XHJcbiAgICAgICAgICBpZiAodmFsdWUgPD0gdGhpcy5taW4pIHtcclxuICAgICAgICAgICAgdGhpcy5taW5TbGlkZXJMZWZ0ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5yYW5nZVswXSA9IHRoaXMubWluO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZmluYWxWYWwgPSB0aGlzLmNhbGN1bGF0ZURpc3RhbmNlKHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5yYW5nZVswXSA9IGZpbmFsVmFsIDw9IHRoaXMucmFuZ2VbMV0gPyBmaW5hbFZhbCA6IHRoaXMucmFuZ2VbMV07XHJcbiAgICAgICAgICAgIHRoaXMubWluU2xpZGVyTGVmdCA9IHRoaXMudmFsVG9QaXhlbCh0aGlzLnJhbmdlWzBdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhTZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMubWF4Q2hhbmdlID0gZXZlbnQuY2xpZW50WCAtIHRoaXMuaW5pdGlhbE1heE1vdXNlWDtcclxuICAgICAgICBjb25zdCBsZWZ0ID0gdGhpcy5tYXhTbGlkZXJJbml0aWFsTGVmdCArIHRoaXMubWF4Q2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5waXhUb1ZhbCh0aGlzLm1pbiwgbGVmdCk7XHJcbiAgICAgICAgaWYgKHZhbHVlID49IHRoaXMucmFuZ2VbMF0pIHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA+PSB0aGlzLm1heCkge1xyXG4gICAgICAgICAgICB0aGlzLm1heFNsaWRlckxlZnQgPSB0aGlzLnJhbmdlSW5QaXhlbHM7XHJcbiAgICAgICAgICAgIHRoaXMucmFuZ2VbMV0gPSB0aGlzLm1heDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbmFsID0gdGhpcy5jYWxjdWxhdGVEaXN0YW5jZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmFuZ2VbMV0gPSBmaW5hbCA+IHRoaXMucmFuZ2VbMF0gPyBmaW5hbCA8PSB0aGlzLm1heCA/IGZpbmFsIDogdGhpcy5tYXggOiB0aGlzLnJhbmdlWzBdO1xyXG4gICAgICAgICAgICB0aGlzLm1heFNsaWRlckxlZnQgPSB0aGlzLnZhbFRvUGl4ZWwodGhpcy5yYW5nZVsxXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0SGlnaGxpZ2h0QmFyRGltZW5zaW9ucygpO1xyXG4gICAgICB0aGlzLnNldFRvb2x0aXBEaW1lbnNpb25zKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6bW91c2V1cCcsIFsnJGV2ZW50J10pXHJcbiAgbW91c2VVcChldmVudDogYW55KSB7XHJcbiAgICB0aGlzLm1pblNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLm1heFNlbGVjdGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVEaXN0YW5jZSh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmICh0aGlzLnN0ZXApIHtcclxuICAgICAgY29uc3QgZmluID0gdmFsdWUgLSBNYXRoLmZsb29yKHZhbHVlKTtcclxuICAgICAgaWYgKGZpbiA+PSAwLjUpIHtcclxuICAgICAgICB2YWx1ZSA9IE1hdGguY2VpbCh2YWx1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCByZW1haW5kZXIgPSB2YWx1ZSAlIHRoaXMuc3RlcDtcclxuICAgICAgaWYgKHJlbWFpbmRlciA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAocmVtYWluZGVyID49ICh0aGlzLnN0ZXAgLyAyKSkge1xyXG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZSArICh0aGlzLnN0ZXAgLSByZW1haW5kZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlIC0gcmVtYWluZGVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2V0RGltZW5zaW9ucygpIHtcclxuICAgIGlmICh0aGlzLmJhciAmJiB0aGlzLm1heFNsaWRlckJ1dHRvbiAmJiB0aGlzLnJhbmdlICYmIHRoaXMucmFuZ2VbMF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnNldEJhckFuZFNsaWRlckRpbWVuc2lvbnMoKTtcclxuICAgICAgdGhpcy5zZXRIaWdobGlnaHRCYXJEaW1lbnNpb25zKCk7XHJcbiAgICAgIHRoaXMuc2V0VG9vbHRpcERpbWVuc2lvbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEJhckFuZFNsaWRlckRpbWVuc2lvbnMoKSB7XHJcbiAgICB0aGlzLnNsaWRlcldpZHRoID0gdGhpcy5tYXhTbGlkZXJCdXR0b24ubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIHRoaXMuc2xpZGVySGVpZ2h0ID0gdGhpcy5tYXhTbGlkZXJCdXR0b24ubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICB0aGlzLmJhcldpZHRoID0gdGhpcy5iYXIubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIGlmICh0aGlzLnNsaWRlcldpZHRoICYmIHRoaXMuYmFyV2lkdGgpIHtcclxuICAgICAgdGhpcy5yYW5nZURpZmYgPSB0aGlzLm1heCAtIHRoaXMubWluO1xyXG4gICAgICB0aGlzLnJhbmdlSW5QaXhlbHMgPSB0aGlzLmJhcldpZHRoIC0gdGhpcy5zbGlkZXJXaWR0aDtcclxuICAgICAgaWYgKHRoaXMuYmFyV2lkdGggJiYgdGhpcy5zbGlkZXJXaWR0aCkge1xyXG4gICAgICAgIHRoaXMudmFsVG9QaXhlbEZhY3RvciA9ICgodGhpcy5yYW5nZUluUGl4ZWxzKSAvIHRoaXMucmFuZ2VEaWZmKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm1pblNsaWRlckxlZnQgPSAodGhpcy5yYW5nZVswXSAtIHRoaXMubWluKSAqIHRoaXMudmFsVG9QaXhlbEZhY3RvcjtcclxuICAgICAgdGhpcy5tYXhTbGlkZXJMZWZ0ID0gKHRoaXMucmFuZ2VbMV0gLSB0aGlzLm1pbikgKiB0aGlzLnZhbFRvUGl4ZWxGYWN0b3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRIaWdobGlnaHRCYXJEaW1lbnNpb25zKCkge1xyXG4gICAgaWYgKHRoaXMubWluUmFuZ2VTbGlkZXIpIHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRCYXJMZWZ0ID0gdGhpcy5taW5TbGlkZXJMZWZ0ICsgKHRoaXMuc2xpZGVyV2lkdGggLyAyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0QmFyTGVmdCA9IHRoaXMubWluU2xpZGVyTGVmdDtcclxuICAgIH1cclxuICAgIHRoaXMuaGlnaGxpZ2h0QmFyV2lkdGggPSB0aGlzLm1heFNsaWRlckxlZnQgLSB0aGlzLm1pblNsaWRlckxlZnQ7XHJcbiAgfVxyXG5cclxuICBzZXRUb29sdGlwRGltZW5zaW9ucygpIHtcclxuICAgIHRoaXMudG9vbFRpcFRvcCA9ICh0aGlzLnNsaWRlckhlaWdodCArIDEwKSAqIC0gMTtcclxuICAgIHRoaXMubWluVG9vbFRpcFdpZHRoID0gdGhpcy5nZXRUb29sVGlwTGVuZ3RoKHRoaXMucmFuZ2VbMF0udG9TdHJpbmcoKSk7XHJcbiAgICBjb25zdCBjb25kID0gdGhpcy5taW5Ub29sVGlwV2lkdGggKiA4ICsgdGhpcy5taW5TbGlkZXJMZWZ0ICsgODtcclxuICAgIGlmIChjb25kID4gdGhpcy5tYXhTbGlkZXJMZWZ0ICYmIHRoaXMudG9vbFRpcHMgJiYgdGhpcy5taW5SYW5nZVNsaWRlcikge1xyXG4gICAgICB0aGlzLmNvbWJpbmVUb29sVGlwID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jb21iaW5lVG9vbFRpcFdpZHRoID0gdGhpcy5nZXRUb29sVGlwTGVuZ3RoKGAke3RoaXMucmFuZ2VbMF19LSR7dGhpcy5yYW5nZVsxXX1gKSAqIDg7XHJcbiAgICAgIGNvbnN0IG1heExlZnQgPSB0aGlzLnJhbmdlSW5QaXhlbHMgLSB0aGlzLmNvbWJpbmVUb29sVGlwV2lkdGg7XHJcbiAgICAgIHRoaXMuY29tYmluZVRvb2xUaXBMZWZ0ID0gdGhpcy5taW5TbGlkZXJMZWZ0IDwgbWF4TGVmdCA/IHRoaXMubWluU2xpZGVyTGVmdCA6IG1heExlZnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNvbWJpbmVUb29sVGlwID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRUb29sVGlwTGVuZ3RoKG51bSkge1xyXG4gICAgcmV0dXJuICBTdHJpbmcobnVtKS5tYXRjaCgvXFxkL2cpLmxlbmd0aDtcclxuICB9XHJcblxyXG4gIHBpeFRvVmFsKG1pbjogbnVtYmVyLCBsZWZ0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE51bWJlcigobWluICsgbGVmdCAqICgxIC8gdGhpcy52YWxUb1BpeGVsRmFjdG9yKSkudG9GaXhlZCgyKSk7XHJcbiAgfVxyXG5cclxuICB2YWxUb1BpeGVsKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMudmFsVG9QaXhlbEZhY3RvciAqICh2YWx1ZSAtIHRoaXMubWluKTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neEZvcm1Db21wb25lbnRzQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtZm9ybS1jb21wb25lbnRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSYW5nZUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9yYW5nZS1pbnB1dC9yYW5nZS1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4Rm9ybUNvbXBvbmVudHNDb21wb25lbnQsXG4gICAgUmFuZ2VJbnB1dENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIE5neEZvcm1Db21wb25lbnRzQ29tcG9uZW50LFxuICAgIFJhbmdlSW5wdXRDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hGb3JtQ29tcG9uZW50c01vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiQ29tcG9uZW50IiwiRXZlbnRFbWl0dGVyIiwiRWxlbWVudFJlZiIsIlJlbmRlcmVyMiIsIkl0ZXJhYmxlRGlmZmVycyIsIklucHV0IiwiT3V0cHV0IiwiVmlld0NoaWxkIiwiSG9zdExpc3RlbmVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7O3VDQUpEO0tBRUE7Ozs7OztBQ0ZBO1FBYUU7U0FBaUI7Ozs7UUFFakIsNkNBQVE7OztZQUFSO2FBQ0M7O29CQWRGQyxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHlCQUF5Qjt3QkFDbkMsUUFBUSxFQUFFLDJEQUlUO3FCQUVGOzs7O1FBUUQsaUNBQUM7S0FoQkQ7Ozs7OztBQ0ZBO1FBYU0sSUFBSSxHQUFHLGVBQVE7O1FBOERuQiw2QkFBb0IsVUFBc0IsRUFDdEIsUUFBbUIsRUFDbkIsZUFBZ0M7WUFGaEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtZ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