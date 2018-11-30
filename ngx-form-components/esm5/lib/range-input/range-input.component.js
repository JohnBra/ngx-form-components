/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostListener, Input, IterableDiffers, Output, Renderer2, ViewChild } from '@angular/core';
/** @type {?} */
var noop = function () { };
var ɵ0 = noop;
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
        this.rangeChange = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'nfc-range-input',
                    template: "<div #bar class=\"nfc-range-input nfc-range-input__bar nfc-range-input__bar-styling\"\n     (touchmove)=\"touchMove($event)\" (touchend)=\"mouseUp($event)\">\n\n  <!-- tooltips -->\n  <span *ngIf=\"toolTips && minRangeSlider && !combineToolTip\" class=\"nfc-range-input__tooltip\"\n        [style.top.px]=\"toolTipTop\" [style.left.px]=\"minSliderLeft\">{{range[0]}}</span>\n  <span *ngIf=\"toolTips && !combineToolTip\" class=\"nfc-range-input__tooltip\"\n        [style.top.px]=\"toolTipTop\" [style.left.px]=\"maxSliderLeft\">{{range[1]}}</span>\n  <span *ngIf=\"toolTips && minRangeSlider && range && combineToolTip\" class=\"nfc-range-input__tooltip\"\n        [style.top.px]=\"toolTipTop\" [style.left.px]=\"combineToolTipLeft\"  >{{range[0]}}-{{range[1]}}</span>\n\n  <!-- bar highlight -->\n  <div #barHighlight class=\"nfc-range-input__bar-highlight nfc-range-input__bar-highlight-styling\"\n       [style.left.px]=\"highlightBarLeft\" [style.width.px]=\"highlightBarWidth\"></div>\n  <!-- left slider -->\n  <div #minSliderButton class=\"nfc-range-input__slider-button nfc-range-input__slider-button-styling\"\n       [style.left.px]=\"minSliderLeft\" (mousedown)=\"minMouseDown($event)\"\n       (mouseup)=\"mouseUp($event)\" (touchstart)=\"minTouched($event)\"></div>\n  <!-- right slider -->\n  <div #maxSliderButton class=\"nfc-range-input__slider-button nfc-range-input__slider-button-styling\"\n       [style.left.px]=\"maxSliderLeft\" (mousedown)=\"maxMouseDown($event)\"\n       (mouseup)=\"mouseUp($event)\" (touchstart)=\"maxTouched($event)\"></div>\n\n</div>\n",
                    styles: [".nfc-range-input{position:relative;margin:20px 0;box-sizing:border-box}.nfc-range-input__slider-button{position:absolute;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.nfc-range-input__slider-button-styling{width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 2px 4px rgba(0,0,0,.2);cursor:pointer}.nfc-range-input__slider-button--hidden{display:none}.nfc-range-input__bar{width:100%}.nfc-range-input__bar-styling{height:4px;border-radius:4px;background:#d3d3d3}.nfc-range-input__bar-highlight{position:absolute;height:inherit}.nfc-range-input__bar-highlight-styling{background:#4169e1;border-radius:4px}.nfc-range-input__tooltip{position:absolute}"]
                }] }
    ];
    /** @nocollapse */
    RangeInputComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: IterableDiffers }
    ]; };
    RangeInputComponent.propDecorators = {
        min: [{ type: Input }],
        max: [{ type: Input }],
        step: [{ type: Input }],
        toolTips: [{ type: Input }],
        minRangeSlider: [{ type: Input }],
        defaultRange: [{ type: Input }],
        highlightBarCssClass: [{ type: Input }],
        barCssClass: [{ type: Input }],
        sliderButtonCssClass: [{ type: Input }],
        rangeChange: [{ type: Output }],
        bar: [{ type: ViewChild, args: ['bar',] }],
        minSliderButton: [{ type: ViewChild, args: ['minSliderButton',] }],
        maxSliderButton: [{ type: ViewChild, args: ['maxSliderButton',] }],
        barHighlight: [{ type: ViewChild, args: ['barHighlight',] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }],
        mouseMove: [{ type: HostListener, args: ['window:mousemove', ['$event'],] }],
        mouseUp: [{ type: HostListener, args: ['window:mouseup', ['$event'],] }]
    };
    return RangeInputComponent;
}());
export { RangeInputComponent };
if (false) {
    /** @type {?} */
    RangeInputComponent.prototype.min;
    /** @type {?} */
    RangeInputComponent.prototype.max;
    /** @type {?} */
    RangeInputComponent.prototype.step;
    /** @type {?} */
    RangeInputComponent.prototype.toolTips;
    /** @type {?} */
    RangeInputComponent.prototype.minRangeSlider;
    /** @type {?} */
    RangeInputComponent.prototype.defaultRange;
    /** @type {?} */
    RangeInputComponent.prototype.highlightBarCssClass;
    /** @type {?} */
    RangeInputComponent.prototype.barCssClass;
    /** @type {?} */
    RangeInputComponent.prototype.sliderButtonCssClass;
    /** @type {?} */
    RangeInputComponent.prototype.rangeChange;
    /** @type {?} */
    RangeInputComponent.prototype.bar;
    /** @type {?} */
    RangeInputComponent.prototype.minSliderButton;
    /** @type {?} */
    RangeInputComponent.prototype.maxSliderButton;
    /** @type {?} */
    RangeInputComponent.prototype.barHighlight;
    /**
     * @type {?}
     * @private
     */
    RangeInputComponent.prototype.valToPixelFactor;
    /**
     * @type {?}
     * @private
     */
    RangeInputComponent.prototype.iterableDiffer;
    /**
     * @type {?}
     * @private
     */
    RangeInputComponent.prototype.onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    RangeInputComponent.prototype.onChangeCallback;
    /** @type {?} */
    RangeInputComponent.prototype.minSliderLeft;
    /** @type {?} */
    RangeInputComponent.prototype.maxSliderLeft;
    /** @type {?} */
    RangeInputComponent.prototype.sliderWidth;
    /** @type {?} */
    RangeInputComponent.prototype.sliderHeight;
    /** @type {?} */
    RangeInputComponent.prototype.barWidth;
    /** @type {?} */
    RangeInputComponent.prototype.highlightBarWidth;
    /** @type {?} */
    RangeInputComponent.prototype.highlightBarLeft;
    /** @type {?} */
    RangeInputComponent.prototype.range;
    /** @type {?} */
    RangeInputComponent.prototype.rangeDiff;
    /** @type {?} */
    RangeInputComponent.prototype.minSliderClicked;
    /** @type {?} */
    RangeInputComponent.prototype.minSelected;
    /** @type {?} */
    RangeInputComponent.prototype.maxSliderClicked;
    /** @type {?} */
    RangeInputComponent.prototype.maxSelected;
    /** @type {?} */
    RangeInputComponent.prototype.minSliderInitialLeft;
    /** @type {?} */
    RangeInputComponent.prototype.initialMinMouseX;
    /** @type {?} */
    RangeInputComponent.prototype.maxSliderInitialLeft;
    /** @type {?} */
    RangeInputComponent.prototype.initialMaxMouseX;
    /** @type {?} */
    RangeInputComponent.prototype.rangeInPixels;
    /** @type {?} */
    RangeInputComponent.prototype.minChange;
    /** @type {?} */
    RangeInputComponent.prototype.maxChange;
    /** @type {?} */
    RangeInputComponent.prototype.combineToolTip;
    /** @type {?} */
    RangeInputComponent.prototype.combineToolTipLeft;
    /** @type {?} */
    RangeInputComponent.prototype.minToolTipWidth;
    /** @type {?} */
    RangeInputComponent.prototype.combineToolTipWidth;
    /** @type {?} */
    RangeInputComponent.prototype.toolTipTop;
    /**
     * @type {?}
     * @private
     */
    RangeInputComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    RangeInputComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    RangeInputComponent.prototype.iterableDiffers;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZvcm0tY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9yYW5nZS1pbnB1dC9yYW5nZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFFZixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQzs7SUFFakIsSUFBSSxHQUFHLGNBQU8sQ0FBQzs7QUFFckI7SUE0REUsNkJBQW9CLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLGVBQWdDO1FBRmhDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUF2RDNDLFFBQUcsR0FBWSxDQUFDLENBQUM7UUFDakIsUUFBRyxHQUFZLEdBQUcsQ0FBQztRQUNuQixTQUFJLEdBQVksQ0FBQyxDQUFDO1FBQ2xCLGFBQVEsR0FBYSxLQUFLLENBQUM7UUFDM0IsbUJBQWMsR0FBYSxLQUFLLENBQUM7UUFNaEMsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQVMzRCxzQkFBaUIsR0FBcUIsSUFBSSxDQUFDO1FBQzNDLHFCQUFnQixHQUFxQixJQUFJLENBQUM7O1FBMkJsRCxtQkFBYyxHQUFZLEtBQUssQ0FBQztRQVU5QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7O0lBRUQsdUNBQVM7OztJQUFUOztZQUNRLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FB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MkI7O0lBQzNCLDhDQUF3Qjs7SUFDeEIsa0RBQTRCOztJQUM1Qix5Q0FBbUI7Ozs7O0lBRVAseUNBQThCOzs7OztJQUM5Qix1Q0FBMkI7Ozs7O0lBQzNCLDhDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBEb0NoZWNrLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBJdGVyYWJsZURpZmZlcnMsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5jb25zdCBub29wID0gKCkgPT4ge307XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25mYy1yYW5nZS1pbnB1dCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3JhbmdlLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9yYW5nZS1pbnB1dC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhbmdlSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xyXG5cclxuICBASW5wdXQoKSBtaW4/OiBudW1iZXIgPSAwO1xyXG4gIEBJbnB1dCgpIG1heD86IG51bWJlciA9IDEwMDtcclxuICBASW5wdXQoKSBzdGVwPzogbnVtYmVyID0gMTtcclxuICBASW5wdXQoKSB0b29sVGlwcz86IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBtaW5SYW5nZVNsaWRlcj86IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBkZWZhdWx0UmFuZ2U/OiBhbnk7XHJcbiAgQElucHV0KCkgaGlnaGxpZ2h0QmFyQ3NzQ2xhc3M/OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYmFyQ3NzQ2xhc3M/OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc2xpZGVyQnV0dG9uQ3NzQ2xhc3M/OiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSByYW5nZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnYmFyJykgYmFyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ21pblNsaWRlckJ1dHRvbicpIG1pblNsaWRlckJ1dHRvbjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdtYXhTbGlkZXJCdXR0b24nKSBtYXhTbGlkZXJCdXR0b246IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnYmFySGlnaGxpZ2h0JykgYmFySGlnaGxpZ2h0OiBFbGVtZW50UmVmO1xyXG5cclxuICBwcml2YXRlIHZhbFRvUGl4ZWxGYWN0b3I6IG51bWJlcjtcclxuICBwcml2YXRlIGl0ZXJhYmxlRGlmZmVyOiBhbnk7XHJcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuXHJcbiAgLy8gZGltZW5zaW9uYWwgdmFyaWFibGVzXHJcbiAgbWluU2xpZGVyTGVmdDogbnVtYmVyO1xyXG4gIG1heFNsaWRlckxlZnQ6IG51bWJlcjtcclxuICBzbGlkZXJXaWR0aDogbnVtYmVyO1xyXG4gIHNsaWRlckhlaWdodDogbnVtYmVyO1xyXG4gIGJhcldpZHRoOiBudW1iZXI7XHJcbiAgaGlnaGxpZ2h0QmFyV2lkdGg6IG51bWJlcjtcclxuICBoaWdobGlnaHRCYXJMZWZ0OiBudW1iZXI7XHJcblxyXG4gIC8vIGNhbGN1bGF0aW9uIGFuZCBldmVudCB2YXJpYWJsZXNcclxuICByYW5nZTogbnVtYmVyW107XHJcbiAgcmFuZ2VEaWZmOiBudW1iZXI7XHJcbiAgbWluU2xpZGVyQ2xpY2tlZDogYm9vbGVhbjtcclxuICBtaW5TZWxlY3RlZDogYm9vbGVhbjtcclxuICBtYXhTbGlkZXJDbGlja2VkOiBib29sZWFuO1xyXG4gIG1heFNlbGVjdGVkOiBib29sZWFuO1xyXG4gIG1pblNsaWRlckluaXRpYWxMZWZ0OiBudW1iZXI7XHJcbiAgaW5pdGlhbE1pbk1vdXNlWDogbnVtYmVyO1xyXG4gIG1heFNsaWRlckluaXRpYWxMZWZ0OiBudW1iZXI7XHJcbiAgaW5pdGlhbE1heE1vdXNlWDogbnVtYmVyO1xyXG4gIHJhbmdlSW5QaXhlbHM6IG51bWJlcjtcclxuICBtaW5DaGFuZ2U6IG51bWJlcjtcclxuICBtYXhDaGFuZ2U6IG51bWJlcjtcclxuXHJcbiAgLy8gdG9vbHRpcCB2YXJpYWJsZXNcclxuICBjb21iaW5lVG9vbFRpcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvbWJpbmVUb29sVGlwTGVmdDogbnVtYmVyO1xyXG4gIG1pblRvb2xUaXBXaWR0aDogbnVtYmVyO1xyXG4gIGNvbWJpbmVUb29sVGlwV2lkdGg6IG51bWJlcjtcclxuICB0b29sVGlwVG9wOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycykge1xyXG5cclxuICAgIHRoaXMuaXRlcmFibGVEaWZmZXIgPSB0aGlzLml0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKSB7XHJcbiAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5pdGVyYWJsZURpZmZlci5kaWZmKHRoaXMucmFuZ2UpO1xyXG4gICAgaWYgKGNoYW5nZXMpIHtcclxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMucmFuZ2UpO1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHRoaXMucmFuZ2UpO1xyXG5cclxuICAgICAgLy8gb25seSBlbWl0IGFycmF5IHdoZW4gbWluIHJhbmdlIHNsaWRlciBpcyBhY3RpdmUsIGVsc2UgZW1pdCBudW1iZXJcclxuICAgICAgaWYgKHRoaXMubWluUmFuZ2VTbGlkZXIpIHtcclxuICAgICAgICB0aGlzLnJhbmdlQ2hhbmdlLmVtaXQodGhpcy5yYW5nZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZUNoYW5nZS5lbWl0KHRoaXMucmFuZ2VbMV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIHNldHMgcmFuZ2UgZGVmYXVsdCB2YWx1ZSBhbmQgcmVtb3ZlcyB0aGUgbWluIHNsaWRlciBidXR0b24gaWYgZGlzYWJsZWRcclxuICAgIHRoaXMuc2V0RGVmYXVsdFJhbmdlKCk7XHJcbiAgICAvLyBzZXRzIGFsbCByZWxhdGVkIGRpbWVuc2lvbnMgKHNsaWRlciBiYXIsIC1oaWdobGlnaHRlciBiYXIsIC1idXR0b25zIGFuZCAtdG9vbHRpcHMpXHJcbiAgICB0aGlzLnNldERpbWVuc2lvbnMoKTtcclxuICAgIHRoaXMuc2V0Q3VzdG9tQ3NzKCk7XHJcbiAgfVxyXG5cclxuICBzZXREZWZhdWx0UmFuZ2UoKSB7XHJcbiAgICAvLyBpbml0IHJhbmdlIHZhcmlhYmxlXHJcbiAgICBpZiAoIWlzTmFOKHRoaXMuZGVmYXVsdFJhbmdlKSkge1xyXG4gICAgICB0aGlzLnJhbmdlID0gW3RoaXMubWluLCB0aGlzLmRlZmF1bHRSYW5nZV07XHJcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5kZWZhdWx0UmFuZ2UpICYmIHRoaXMuZGVmYXVsdFJhbmdlLmxlbmd0aCA9PT0gMiAmJiAhdGhpcy5kZWZhdWx0UmFuZ2Uuc29tZShpc05hTikpIHtcclxuICAgICAgLy8gY2hlY2sgaWYgZGVmYXVsdCB2YWx1ZXMgYXJlIGNvbXBsaWFudCB3aXRoIG1pbiBhbmQgbWF4IHZhbHVlc1xyXG4gICAgICBpZiAodGhpcy5kZWZhdWx0UmFuZ2VbMF0gPj0gdGhpcy5taW4gJiYgdGhpcy5kZWZhdWx0UmFuZ2VbMV0gPD0gdGhpcy5tYXgpIHtcclxuICAgICAgICAvLyBzZXQgZGVmYXVsdCB2YWx1ZXMgdG8gcGFzc2VkIGFycmF5IGlmIG1pblJhbmdlU2xpZGVyIGlzIG9uXHJcbiAgICAgICAgaWYgKHRoaXMubWluUmFuZ2VTbGlkZXIpIHtcclxuICAgICAgICAgIHRoaXMucmFuZ2UgPSB0aGlzLmRlZmF1bHRSYW5nZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gc2V0IGRlZmF1bHQgdmFsdWUgdG8gbWluIGlmIG1pblJhbmdlU2xpZGVyIGlzIG9mZlxyXG4gICAgICAgICAgdGhpcy5yYW5nZSA9IFt0aGlzLm1pbiwgdGhpcy5kZWZhdWx0UmFuZ2VbMV1dO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBmYWxsYmFjayBpZiBkZWZhdWx0IHZhbHVlcyBhcmUgbm90IGNvbXBsaWFudCB3aXRoIG1pbiBhbmQgbWF4IHZhbHVlc1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGRlZmF1bHQgcmFuZ2UgaXMgbm90IGNvbXBsaWFudCB3aXRoIG1pbiBhbmQgbWF4IHZhbHVlcyAuLi4gc2V0IGZhbGxiYWNrIHZhbHVlc2ApO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSBbdGhpcy5taW4sIE1hdGgucm91bmQodGhpcy5tYXggLyAyKV07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGZhbGxiYWNrIGlmIGFycmF5IGhhcyBhbnl0aGluZyBlbHNlIHRoYW4gMiBzbG90cywgYW55dGhpbmcgYnV0IG51bWJlcnMgb3IgaXMgbm90IGFycmF5XHJcbiAgICAgIHRoaXMucmFuZ2UgPSBbdGhpcy5taW4sIE1hdGgucm91bmQodGhpcy5tYXggLyAyKV07XHJcbiAgICB9XHJcbiAgICAvLyBpbml0IG1pbiByYW5nZSwgd2hlbiBpdCdzIG9ubHkgb25lIHNsaWRlclxyXG4gICAgaWYgKCF0aGlzLm1pblJhbmdlU2xpZGVyKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5taW5TbGlkZXJCdXR0b24ubmF0aXZlRWxlbWVudCwgJ25mYy1yYW5nZS1pbnB1dF9fc2xpZGVyLWJ1dHRvbi0taGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRDdXN0b21Dc3MoKSB7XHJcbiAgICBpZiAodGhpcy5zbGlkZXJCdXR0b25Dc3NDbGFzcykge1xyXG4gICAgICB0aGlzLnNldFNsaWRlckNzcyh0aGlzLnNsaWRlckJ1dHRvbkNzc0NsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5iYXJDc3NDbGFzcykge1xyXG4gICAgICB0aGlzLnNldEJhckNzcyh0aGlzLmJhckNzc0NsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oaWdobGlnaHRCYXJDc3NDbGFzcykge1xyXG4gICAgICB0aGlzLnNldEJhckhpZ2hsaWdodENzcyh0aGlzLmhpZ2hsaWdodEJhckNzc0NsYXNzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEJhckNzcyhjdXN0b21Dc3NDbGFzczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuYmFyLm5hdGl2ZUVsZW1lbnQsICduZmMtcmFuZ2UtaW5wdXRfX2Jhci1zdHlsaW5nJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuYmFyLm5hdGl2ZUVsZW1lbnQsIGN1c3RvbUNzc0NsYXNzKTtcclxuICB9XHJcblxyXG4gIHNldEJhckhpZ2hsaWdodENzcyhjdXN0b21Dc3NDbGFzczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuYmFySGlnaGxpZ2h0Lm5hdGl2ZUVsZW1lbnQsICduZmMtcmFuZ2UtaW5wdXRfX2Jhci1oaWdobGlnaHQtc3R5bGluZycpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmJhckhpZ2hsaWdodC5uYXRpdmVFbGVtZW50LCBjdXN0b21Dc3NDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBzZXRTbGlkZXJDc3MoY3VzdG9tQ3NzQ2xhc3M6IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMubWluU2xpZGVyQnV0dG9uKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5taW5TbGlkZXJCdXR0b24ubmF0aXZlRWxlbWVudCwgJ25mYy1yYW5nZS1pbnB1dF9fc2xpZGVyLWJ1dHRvbi1zdHlsaW5nJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5taW5TbGlkZXJCdXR0b24ubmF0aXZlRWxlbWVudCwgY3VzdG9tQ3NzQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm1pblNsaWRlckJ1dHRvbikge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMubWF4U2xpZGVyQnV0dG9uLm5hdGl2ZUVsZW1lbnQsICduZmMtcmFuZ2UtaW5wdXRfX3NsaWRlci1idXR0b24tc3R5bGluZycpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubWF4U2xpZGVyQnV0dG9uLm5hdGl2ZUVsZW1lbnQsIGN1c3RvbUNzc0NsYXNzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1pblRvdWNoZWQoZXZlbnQ6IGFueSkge1xyXG4gICAgY29uc3QgZXZ0ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XHJcbiAgICB0aGlzLm1pbk1vdXNlRG93bihldnQpO1xyXG4gIH1cclxuXHJcbiAgbWF4VG91Y2hlZChldmVudDogYW55KSB7XHJcbiAgICBjb25zdCBldnQgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcclxuICAgIHRoaXMubWF4TW91c2VEb3duKGV2dCk7XHJcbiAgfVxyXG5cclxuICBtaW5Nb3VzZURvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5taW5TbGlkZXJDbGlja2VkID0gdHJ1ZTtcclxuICAgIHRoaXMubWluU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5tYXhTbGlkZXJDbGlja2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLm1heFNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLm1pblNsaWRlckluaXRpYWxMZWZ0ID0gZXZlbnQudGFyZ2V0Lm9mZnNldExlZnQ7XHJcbiAgICB0aGlzLmluaXRpYWxNaW5Nb3VzZVggPSBldmVudC5jbGllbnRYO1xyXG4gIH1cclxuXHJcbiAgbWF4TW91c2VEb3duKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMubWF4U2xpZGVyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICB0aGlzLm1heFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIHRoaXMubWluU2xpZGVyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5taW5TZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYXhTbGlkZXJJbml0aWFsTGVmdCA9IGV2ZW50LnRhcmdldC5vZmZzZXRMZWZ0O1xyXG4gICAgdGhpcy5pbml0aWFsTWF4TW91c2VYID0gZXZlbnQuY2xpZW50WDtcclxuICB9XHJcblxyXG4gIHRvdWNoTW92ZShldmVudDogYW55KSB7XHJcbiAgICBjb25zdCBldnQgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcclxuICAgIHRoaXMubW91c2VNb3ZlKGV2dCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcclxuICBvblJlc2l6ZShldmVudDogYW55KSB7XHJcbiAgICBpZiAodGhpcy5yYW5nZSkge1xyXG4gICAgICB0aGlzLnNldERpbWVuc2lvbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzptb3VzZW1vdmUnLCBbJyRldmVudCddKVxyXG4gIG1vdXNlTW92ZShldmVudDogYW55KSB7XHJcbiAgICBpZiAodGhpcy5taW5TZWxlY3RlZCB8fCB0aGlzLm1heFNlbGVjdGVkKSB7XHJcbiAgICAgIGlmICh0aGlzLm1pblNlbGVjdGVkKSB7XHJcbiAgICAgICAgdGhpcy5taW5DaGFuZ2UgPSBldmVudC5jbGllbnRYIC0gdGhpcy5pbml0aWFsTWluTW91c2VYO1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLm1pblNsaWRlckluaXRpYWxMZWZ0ICsgdGhpcy5taW5DaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBpeFRvVmFsKHRoaXMubWluLCBsZWZ0KTtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IHRoaXMucmFuZ2VbMV0pIHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLm1pbikge1xyXG4gICAgICAgICAgICB0aGlzLm1pblNsaWRlckxlZnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmdlWzBdID0gdGhpcy5taW47XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBmaW5hbFZhbCA9IHRoaXMuY2FsY3VsYXRlRGlzdGFuY2UodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmdlWzBdID0gZmluYWxWYWwgPD0gdGhpcy5yYW5nZVsxXSA/IGZpbmFsVmFsIDogdGhpcy5yYW5nZVsxXTtcclxuICAgICAgICAgICAgdGhpcy5taW5TbGlkZXJMZWZ0ID0gdGhpcy52YWxUb1BpeGVsKHRoaXMucmFuZ2VbMF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm1heFNlbGVjdGVkKSB7XHJcbiAgICAgICAgdGhpcy5tYXhDaGFuZ2UgPSBldmVudC5jbGllbnRYIC0gdGhpcy5pbml0aWFsTWF4TW91c2VYO1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLm1heFNsaWRlckluaXRpYWxMZWZ0ICsgdGhpcy5tYXhDaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBpeFRvVmFsKHRoaXMubWluLCBsZWZ0KTtcclxuICAgICAgICBpZiAodmFsdWUgPj0gdGhpcy5yYW5nZVswXSkge1xyXG4gICAgICAgICAgaWYgKHZhbHVlID49IHRoaXMubWF4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF4U2xpZGVyTGVmdCA9IHRoaXMucmFuZ2VJblBpeGVscztcclxuICAgICAgICAgICAgdGhpcy5yYW5nZVsxXSA9IHRoaXMubWF4O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZmluYWwgPSB0aGlzLmNhbGN1bGF0ZURpc3RhbmNlKHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5yYW5nZVsxXSA9IGZpbmFsID4gdGhpcy5yYW5nZVswXSA/IGZpbmFsIDw9IHRoaXMubWF4ID8gZmluYWwgOiB0aGlzLm1heCA6IHRoaXMucmFuZ2VbMF07XHJcbiAgICAgICAgICAgIHRoaXMubWF4U2xpZGVyTGVmdCA9IHRoaXMudmFsVG9QaXhlbCh0aGlzLnJhbmdlWzFdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRIaWdobGlnaHRCYXJEaW1lbnNpb25zKCk7XHJcbiAgICAgIHRoaXMuc2V0VG9vbHRpcERpbWVuc2lvbnMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzptb3VzZXVwJywgWyckZXZlbnQnXSlcclxuICBtb3VzZVVwKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMubWluU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMubWF4U2VsZWN0ZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZURpc3RhbmNlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgaWYgKHRoaXMuc3RlcCkge1xyXG4gICAgICBjb25zdCBmaW4gPSB2YWx1ZSAtIE1hdGguZmxvb3IodmFsdWUpO1xyXG4gICAgICBpZiAoZmluID49IDAuNSkge1xyXG4gICAgICAgIHZhbHVlID0gTWF0aC5jZWlsKHZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHZhbHVlICUgdGhpcy5zdGVwO1xyXG4gICAgICBpZiAocmVtYWluZGVyID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChyZW1haW5kZXIgPj0gKHRoaXMuc3RlcCAvIDIpKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgKHRoaXMuc3RlcCAtIHJlbWFpbmRlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhbHVlID0gdmFsdWUgLSByZW1haW5kZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBzZXREaW1lbnNpb25zKCkge1xyXG4gICAgaWYgKHRoaXMuYmFyICYmIHRoaXMubWF4U2xpZGVyQnV0dG9uICYmIHRoaXMucmFuZ2UgJiYgdGhpcy5yYW5nZVswXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc2V0QmFyQW5kU2xpZGVyRGltZW5zaW9ucygpO1xyXG4gICAgICB0aGlzLnNldEhpZ2hsaWdodEJhckRpbWVuc2lvbnMoKTtcclxuICAgICAgdGhpcy5zZXRUb29sdGlwRGltZW5zaW9ucygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0QmFyQW5kU2xpZGVyRGltZW5zaW9ucygpIHtcclxuICAgIHRoaXMuc2xpZGVyV2lkdGggPSB0aGlzLm1heFNsaWRlckJ1dHRvbi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgdGhpcy5zbGlkZXJIZWlnaHQgPSB0aGlzLm1heFNsaWRlckJ1dHRvbi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIHRoaXMuYmFyV2lkdGggPSB0aGlzLmJhci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgaWYgKHRoaXMuc2xpZGVyV2lkdGggJiYgdGhpcy5iYXJXaWR0aCkge1xyXG4gICAgICB0aGlzLnJhbmdlRGlmZiA9IHRoaXMubWF4IC0gdGhpcy5taW47XHJcbiAgICAgIHRoaXMucmFuZ2VJblBpeGVscyA9IHRoaXMuYmFyV2lkdGggLSB0aGlzLnNsaWRlcldpZHRoO1xyXG4gICAgICBpZiAodGhpcy5iYXJXaWR0aCAmJiB0aGlzLnNsaWRlcldpZHRoKSB7XHJcbiAgICAgICAgdGhpcy52YWxUb1BpeGVsRmFjdG9yID0gKCh0aGlzLnJhbmdlSW5QaXhlbHMpIC8gdGhpcy5yYW5nZURpZmYpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubWluU2xpZGVyTGVmdCA9ICh0aGlzLnJhbmdlWzBdIC0gdGhpcy5taW4pICogdGhpcy52YWxUb1BpeGVsRmFjdG9yO1xyXG4gICAgICB0aGlzLm1heFNsaWRlckxlZnQgPSAodGhpcy5yYW5nZVsxXSAtIHRoaXMubWluKSAqIHRoaXMudmFsVG9QaXhlbEZhY3RvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEhpZ2hsaWdodEJhckRpbWVuc2lvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5taW5SYW5nZVNsaWRlcikge1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodEJhckxlZnQgPSB0aGlzLm1pblNsaWRlckxlZnQgKyAodGhpcy5zbGlkZXJXaWR0aCAvIDIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRCYXJMZWZ0ID0gdGhpcy5taW5TbGlkZXJMZWZ0O1xyXG4gICAgfVxyXG4gICAgdGhpcy5oaWdobGlnaHRCYXJXaWR0aCA9IHRoaXMubWF4U2xpZGVyTGVmdCAtIHRoaXMubWluU2xpZGVyTGVmdDtcclxuICB9XHJcblxyXG4gIHNldFRvb2x0aXBEaW1lbnNpb25zKCkge1xyXG4gICAgdGhpcy50b29sVGlwVG9wID0gKHRoaXMuc2xpZGVySGVpZ2h0ICsgMTApICogLSAxO1xyXG4gICAgdGhpcy5taW5Ub29sVGlwV2lkdGggPSB0aGlzLmdldFRvb2xUaXBMZW5ndGgodGhpcy5yYW5nZVswXS50b1N0cmluZygpKTtcclxuICAgIGNvbnN0IGNvbmQgPSB0aGlzLm1pblRvb2xUaXBXaWR0aCAqIDggKyB0aGlzLm1pblNsaWRlckxlZnQgKyA4O1xyXG4gICAgaWYgKGNvbmQgPiB0aGlzLm1heFNsaWRlckxlZnQgJiYgdGhpcy50b29sVGlwcyAmJiB0aGlzLm1pblJhbmdlU2xpZGVyKSB7XHJcbiAgICAgIHRoaXMuY29tYmluZVRvb2xUaXAgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNvbWJpbmVUb29sVGlwV2lkdGggPSB0aGlzLmdldFRvb2xUaXBMZW5ndGgoYCR7dGhpcy5yYW5nZVswXX0tJHt0aGlzLnJhbmdlWzFdfWApICogODtcclxuICAgICAgY29uc3QgbWF4TGVmdCA9IHRoaXMucmFuZ2VJblBpeGVscyAtIHRoaXMuY29tYmluZVRvb2xUaXBXaWR0aDtcclxuICAgICAgdGhpcy5jb21iaW5lVG9vbFRpcExlZnQgPSB0aGlzLm1pblNsaWRlckxlZnQgPCBtYXhMZWZ0ID8gdGhpcy5taW5TbGlkZXJMZWZ0IDogbWF4TGVmdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29tYmluZVRvb2xUaXAgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRvb2xUaXBMZW5ndGgobnVtKSB7XHJcbiAgICByZXR1cm4gIFN0cmluZyhudW0pLm1hdGNoKC9cXGQvZykubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcGl4VG9WYWwobWluOiBudW1iZXIsIGxlZnQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTnVtYmVyKChtaW4gKyBsZWZ0ICogKDEgLyB0aGlzLnZhbFRvUGl4ZWxGYWN0b3IpKS50b0ZpeGVkKDIpKTtcclxuICB9XHJcblxyXG4gIHZhbFRvUGl4ZWwodmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy52YWxUb1BpeGVsRmFjdG9yICogKHZhbHVlIC0gdGhpcy5taW4pO1xyXG4gIH1cclxufVxyXG4iXX0=