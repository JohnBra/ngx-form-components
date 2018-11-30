/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostListener, Input, IterableDiffers, Output, Renderer2, ViewChild } from '@angular/core';
/** @type {?} */
const noop = () => { };
const ɵ0 = noop;
export class RangeInputComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} iterableDiffers
     */
    constructor(elementRef, renderer, iterableDiffers) {
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
    ngDoCheck() {
        /** @type {?} */
        const changes = this.iterableDiffer.diff(this.range);
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // sets range default value and removes the min slider button if disabled
        this.setDefaultRange();
        // sets all related dimensions (slider bar, -highlighter bar, -buttons and -tooltips)
        this.setDimensions();
        this.setCustomCss();
    }
    /**
     * @return {?}
     */
    setDefaultRange() {
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
                console.error(`default range is not compliant with min and max values ... set fallback values`);
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
    }
    /**
     * @return {?}
     */
    setCustomCss() {
        if (this.sliderButtonCssClass) {
            this.setSliderCss(this.sliderButtonCssClass);
        }
        if (this.barCssClass) {
            this.setBarCss(this.barCssClass);
        }
        if (this.highlightBarCssClass) {
            this.setBarHighlightCss(this.highlightBarCssClass);
        }
    }
    /**
     * @param {?} customCssClass
     * @return {?}
     */
    setBarCss(customCssClass) {
        this.renderer.removeClass(this.bar.nativeElement, 'nfc-range-input__bar-styling');
        this.renderer.addClass(this.bar.nativeElement, customCssClass);
    }
    /**
     * @param {?} customCssClass
     * @return {?}
     */
    setBarHighlightCss(customCssClass) {
        this.renderer.removeClass(this.barHighlight.nativeElement, 'nfc-range-input__bar-highlight-styling');
        this.renderer.addClass(this.barHighlight.nativeElement, customCssClass);
    }
    /**
     * @param {?} customCssClass
     * @return {?}
     */
    setSliderCss(customCssClass) {
        if (this.minSliderButton) {
            this.renderer.removeClass(this.minSliderButton.nativeElement, 'nfc-range-input__slider-button-styling');
            this.renderer.addClass(this.minSliderButton.nativeElement, customCssClass);
        }
        if (this.minSliderButton) {
            this.renderer.removeClass(this.maxSliderButton.nativeElement, 'nfc-range-input__slider-button-styling');
            this.renderer.addClass(this.maxSliderButton.nativeElement, customCssClass);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    minTouched(event) {
        /** @type {?} */
        const evt = event.changedTouches[0];
        this.minMouseDown(evt);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    maxTouched(event) {
        /** @type {?} */
        const evt = event.changedTouches[0];
        this.maxMouseDown(evt);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    minMouseDown(event) {
        this.minSliderClicked = true;
        this.minSelected = true;
        this.maxSliderClicked = false;
        this.maxSelected = false;
        this.minSliderInitialLeft = event.target.offsetLeft;
        this.initialMinMouseX = event.clientX;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    maxMouseDown(event) {
        this.maxSliderClicked = true;
        this.maxSelected = true;
        this.minSliderClicked = false;
        this.minSelected = false;
        this.maxSliderInitialLeft = event.target.offsetLeft;
        this.initialMaxMouseX = event.clientX;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    touchMove(event) {
        /** @type {?} */
        const evt = event.changedTouches[0];
        this.mouseMove(evt);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        if (this.range) {
            this.setDimensions();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseMove(event) {
        if (this.minSelected || this.maxSelected) {
            if (this.minSelected) {
                this.minChange = event.clientX - this.initialMinMouseX;
                /** @type {?} */
                const left = this.minSliderInitialLeft + this.minChange;
                /** @type {?} */
                const value = this.pixToVal(this.min, left);
                if (value <= this.range[1]) {
                    if (value <= this.min) {
                        this.minSliderLeft = 0;
                        this.range[0] = this.min;
                    }
                    else {
                        /** @type {?} */
                        const finalVal = this.calculateDistance(value);
                        this.range[0] = finalVal <= this.range[1] ? finalVal : this.range[1];
                        this.minSliderLeft = this.valToPixel(this.range[0]);
                    }
                }
            }
            else if (this.maxSelected) {
                this.maxChange = event.clientX - this.initialMaxMouseX;
                /** @type {?} */
                const left = this.maxSliderInitialLeft + this.maxChange;
                /** @type {?} */
                const value = this.pixToVal(this.min, left);
                if (value >= this.range[0]) {
                    if (value >= this.max) {
                        this.maxSliderLeft = this.rangeInPixels;
                        this.range[1] = this.max;
                    }
                    else {
                        /** @type {?} */
                        const final = this.calculateDistance(value);
                        this.range[1] = final > this.range[0] ? final <= this.max ? final : this.max : this.range[0];
                        this.maxSliderLeft = this.valToPixel(this.range[1]);
                    }
                }
            }
            this.setHighlightBarDimensions();
            this.setTooltipDimensions();
        }
        return false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mouseUp(event) {
        this.minSelected = false;
        this.maxSelected = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    calculateDistance(value) {
        if (this.step) {
            /** @type {?} */
            const fin = value - Math.floor(value);
            if (fin >= 0.5) {
                value = Math.ceil(value);
            }
            else {
                value = Math.floor(value);
            }
            /** @type {?} */
            const remainder = value % this.step;
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
    }
    /**
     * @return {?}
     */
    setDimensions() {
        if (this.bar && this.maxSliderButton && this.range && this.range[0] !== undefined) {
            this.setBarAndSliderDimensions();
            this.setHighlightBarDimensions();
            this.setTooltipDimensions();
        }
    }
    /**
     * @return {?}
     */
    setBarAndSliderDimensions() {
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
    }
    /**
     * @return {?}
     */
    setHighlightBarDimensions() {
        if (this.minRangeSlider) {
            this.highlightBarLeft = this.minSliderLeft + (this.sliderWidth / 2);
        }
        else {
            this.highlightBarLeft = this.minSliderLeft;
        }
        this.highlightBarWidth = this.maxSliderLeft - this.minSliderLeft;
    }
    /**
     * @return {?}
     */
    setTooltipDimensions() {
        this.toolTipTop = (this.sliderHeight + 10) * -1;
        this.minToolTipWidth = this.getToolTipLength(this.range[0].toString());
        /** @type {?} */
        const cond = this.minToolTipWidth * 8 + this.minSliderLeft + 8;
        if (cond > this.maxSliderLeft && this.toolTips && this.minRangeSlider) {
            this.combineToolTip = true;
            this.combineToolTipWidth = this.getToolTipLength(`${this.range[0]}-${this.range[1]}`) * 8;
            /** @type {?} */
            const maxLeft = this.rangeInPixels - this.combineToolTipWidth;
            this.combineToolTipLeft = this.minSliderLeft < maxLeft ? this.minSliderLeft : maxLeft;
        }
        else {
            this.combineToolTip = false;
        }
    }
    /**
     * @param {?} num
     * @return {?}
     */
    getToolTipLength(num) {
        return String(num).match(/\d/g).length;
    }
    /**
     * @param {?} min
     * @param {?} left
     * @return {?}
     */
    pixToVal(min, left) {
        return Number((min + left * (1 / this.valToPixelFactor)).toFixed(2));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    valToPixel(value) {
        return this.valToPixelFactor * (value - this.min);
    }
}
RangeInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'nfc-range-input',
                template: "<div #bar class=\"nfc-range-input nfc-range-input__bar nfc-range-input__bar-styling\"\n     (touchmove)=\"touchMove($event)\" (touchend)=\"mouseUp($event)\">\n\n  <!-- tooltips -->\n  <span *ngIf=\"toolTips && minRangeSlider && !combineToolTip\" class=\"nfc-range-input__tooltip\"\n        [style.top.px]=\"toolTipTop\" [style.left.px]=\"minSliderLeft\">{{range[0]}}</span>\n  <span *ngIf=\"toolTips && !combineToolTip\" class=\"nfc-range-input__tooltip\"\n        [style.top.px]=\"toolTipTop\" [style.left.px]=\"maxSliderLeft\">{{range[1]}}</span>\n  <span *ngIf=\"toolTips && minRangeSlider && range && combineToolTip\" class=\"nfc-range-input__tooltip\"\n        [style.top.px]=\"toolTipTop\" [style.left.px]=\"combineToolTipLeft\"  >{{range[0]}}-{{range[1]}}</span>\n\n  <!-- bar highlight -->\n  <div #barHighlight class=\"nfc-range-input__bar-highlight nfc-range-input__bar-highlight-styling\"\n       [style.left.px]=\"highlightBarLeft\" [style.width.px]=\"highlightBarWidth\"></div>\n  <!-- left slider -->\n  <div #minSliderButton class=\"nfc-range-input__slider-button nfc-range-input__slider-button-styling\"\n       [style.left.px]=\"minSliderLeft\" (mousedown)=\"minMouseDown($event)\"\n       (mouseup)=\"mouseUp($event)\" (touchstart)=\"minTouched($event)\"></div>\n  <!-- right slider -->\n  <div #maxSliderButton class=\"nfc-range-input__slider-button nfc-range-input__slider-button-styling\"\n       [style.left.px]=\"maxSliderLeft\" (mousedown)=\"maxMouseDown($event)\"\n       (mouseup)=\"mouseUp($event)\" (touchstart)=\"maxTouched($event)\"></div>\n\n</div>\n",
                styles: [".nfc-range-input{position:relative;margin:20px 0;box-sizing:border-box}.nfc-range-input__slider-button{position:absolute;cursor:pointer;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.nfc-range-input__slider-button-styling{width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 2px 4px rgba(0,0,0,.2);cursor:pointer}.nfc-range-input__slider-button--hidden{display:none}.nfc-range-input__bar{width:100%}.nfc-range-input__bar-styling{height:4px;border-radius:4px;background:#d3d3d3}.nfc-range-input__bar-highlight{position:absolute;height:inherit}.nfc-range-input__bar-highlight-styling{background:#4169e1;border-radius:4px}.nfc-range-input__tooltip{position:absolute}"]
            }] }
];
/** @nocollapse */
RangeInputComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: IterableDiffers }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWZvcm0tY29tcG9uZW50cy8iLCJzb3VyY2VzIjpbImxpYi9yYW5nZS1pbnB1dC9yYW5nZS1pbnB1dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLGVBQWUsRUFFZixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQzs7TUFFakIsSUFBSSxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUM7O0FBT3JCLE1BQU0sT0FBTyxtQkFBbUI7Ozs7OztJQXVEOUIsWUFBb0IsVUFBc0IsRUFDdEIsUUFBbUIsRUFDbkIsZUFBZ0M7UUFGaEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQXZEM0MsUUFBRyxHQUFZLENBQUMsQ0FBQztRQUNqQixRQUFHLEdBQVksR0FBRyxDQUFDO1FBQ25CLFNBQUksR0FBWSxDQUFDLENBQUM7UUFDbEIsYUFBUSxHQUFhLEtBQUssQ0FBQztRQUMzQixtQkFBYyxHQUFhLEtBQUssQ0FBQztRQU1oQyxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBUzNELHNCQUFpQixHQUFxQixJQUFJLENBQUM7UUFDM0MscUJBQWdCLEdBQXFCLElBQUksQ0FBQzs7UUEyQmxELG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBVTlCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUM7Ozs7SUFFRCxTQUFTOztjQUNELE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FB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WUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFPeEMsWUFBWSxTQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDO3NCQXVDM0MsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBbk8xQyxrQ0FBMEI7O0lBQzFCLGtDQUE0Qjs7SUFDNUIsbUNBQTJCOztJQUMzQix1Q0FBb0M7O0lBQ3BDLDZDQUEwQzs7SUFDMUMsMkNBQTRCOztJQUM1QixtREFBdUM7O0lBQ3ZDLDBDQUE4Qjs7SUFDOUIsbURBQXVDOztJQUV2QywwQ0FBbUU7O0lBRW5FLGtDQUFrQzs7SUFDbEMsOENBQTBEOztJQUMxRCw4Q0FBMEQ7O0lBQzFELDJDQUFvRDs7Ozs7SUFFcEQsK0NBQWlDOzs7OztJQUNqQyw2Q0FBNEI7Ozs7O0lBQzVCLGdEQUFtRDs7Ozs7SUFDbkQsK0NBQWtEOztJQUdsRCw0Q0FBc0I7O0lBQ3RCLDRDQUFzQjs7SUFDdEIsMENBQW9COztJQUNwQiwyQ0FBcUI7O0lBQ3JCLHVDQUFpQjs7SUFDakIsZ0RBQTBCOztJQUMxQiwrQ0FBeUI7O0lBR3pCLG9DQUFnQjs7SUFDaEIsd0NBQWtCOztJQUNsQiwrQ0FBMEI7O0lBQzFCLDBDQUFxQjs7SUFDckIsK0NBQTBCOztJQUMxQiwwQ0FBcUI7O0lBQ3JCLG1EQUE2Qjs7SUFDN0IsK0NBQXlCOztJQUN6QixtREFBNkI7O0lBQzdCLCtDQUF5Qjs7SUFDekIsNENBQXNCOztJQUN0Qix3Q0FBa0I7O0lBQ2xCLHdDQUFrQjs7SUFHbEIsNkNBQWdDOztJQUNoQyxpREFBMkI7O0lBQzNCLDhDQUF3Qjs7SUFDeEIsa0RBQTRCOztJQUM1Qix5Q0FBbUI7Ozs7O0lBRVAseUNBQThCOzs7OztJQUM5Qix1Q0FBMkI7Ozs7O0lBQzNCLDhDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LCBEb0NoZWNrLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBJdGVyYWJsZURpZmZlcnMsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5jb25zdCBub29wID0gKCkgPT4ge307XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25mYy1yYW5nZS1pbnB1dCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3JhbmdlLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9yYW5nZS1pbnB1dC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhbmdlSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIERvQ2hlY2sge1xyXG5cclxuICBASW5wdXQoKSBtaW4/OiBudW1iZXIgPSAwO1xyXG4gIEBJbnB1dCgpIG1heD86IG51bWJlciA9IDEwMDtcclxuICBASW5wdXQoKSBzdGVwPzogbnVtYmVyID0gMTtcclxuICBASW5wdXQoKSB0b29sVGlwcz86IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBtaW5SYW5nZVNsaWRlcj86IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBkZWZhdWx0UmFuZ2U/OiBhbnk7XHJcbiAgQElucHV0KCkgaGlnaGxpZ2h0QmFyQ3NzQ2xhc3M/OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYmFyQ3NzQ2xhc3M/OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc2xpZGVyQnV0dG9uQ3NzQ2xhc3M/OiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSByYW5nZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnYmFyJykgYmFyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ21pblNsaWRlckJ1dHRvbicpIG1pblNsaWRlckJ1dHRvbjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdtYXhTbGlkZXJCdXR0b24nKSBtYXhTbGlkZXJCdXR0b246IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnYmFySGlnaGxpZ2h0JykgYmFySGlnaGxpZ2h0OiBFbGVtZW50UmVmO1xyXG5cclxuICBwcml2YXRlIHZhbFRvUGl4ZWxGYWN0b3I6IG51bWJlcjtcclxuICBwcml2YXRlIGl0ZXJhYmxlRGlmZmVyOiBhbnk7XHJcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuXHJcbiAgLy8gZGltZW5zaW9uYWwgdmFyaWFibGVzXHJcbiAgbWluU2xpZGVyTGVmdDogbnVtYmVyO1xyXG4gIG1heFNsaWRlckxlZnQ6IG51bWJlcjtcclxuICBzbGlkZXJXaWR0aDogbnVtYmVyO1xyXG4gIHNsaWRlckhlaWdodDogbnVtYmVyO1xyXG4gIGJhcldpZHRoOiBudW1iZXI7XHJcbiAgaGlnaGxpZ2h0QmFyV2lkdGg6IG51bWJlcjtcclxuICBoaWdobGlnaHRCYXJMZWZ0OiBudW1iZXI7XHJcblxyXG4gIC8vIGNhbGN1bGF0aW9uIGFuZCBldmVudCB2YXJpYWJsZXNcclxuICByYW5nZTogbnVtYmVyW107XHJcbiAgcmFuZ2VEaWZmOiBudW1iZXI7XHJcbiAgbWluU2xpZGVyQ2xpY2tlZDogYm9vbGVhbjtcclxuICBtaW5TZWxlY3RlZDogYm9vbGVhbjtcclxuICBtYXhTbGlkZXJDbGlja2VkOiBib29sZWFuO1xyXG4gIG1heFNlbGVjdGVkOiBib29sZWFuO1xyXG4gIG1pblNsaWRlckluaXRpYWxMZWZ0OiBudW1iZXI7XHJcbiAgaW5pdGlhbE1pbk1vdXNlWDogbnVtYmVyO1xyXG4gIG1heFNsaWRlckluaXRpYWxMZWZ0OiBudW1iZXI7XHJcbiAgaW5pdGlhbE1heE1vdXNlWDogbnVtYmVyO1xyXG4gIHJhbmdlSW5QaXhlbHM6IG51bWJlcjtcclxuICBtaW5DaGFuZ2U6IG51bWJlcjtcclxuICBtYXhDaGFuZ2U6IG51bWJlcjtcclxuXHJcbiAgLy8gdG9vbHRpcCB2YXJpYWJsZXNcclxuICBjb21iaW5lVG9vbFRpcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGNvbWJpbmVUb29sVGlwTGVmdDogbnVtYmVyO1xyXG4gIG1pblRvb2xUaXBXaWR0aDogbnVtYmVyO1xyXG4gIGNvbWJpbmVUb29sVGlwV2lkdGg6IG51bWJlcjtcclxuICB0b29sVGlwVG9wOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpdGVyYWJsZURpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycykge1xyXG5cclxuICAgIHRoaXMuaXRlcmFibGVEaWZmZXIgPSB0aGlzLml0ZXJhYmxlRGlmZmVycy5maW5kKFtdKS5jcmVhdGUobnVsbCk7XHJcbiAgfVxyXG5cclxuICBuZ0RvQ2hlY2soKSB7XHJcbiAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5pdGVyYWJsZURpZmZlci5kaWZmKHRoaXMucmFuZ2UpO1xyXG4gICAgaWYgKGNoYW5nZXMpIHtcclxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMucmFuZ2UpO1xyXG4gICAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKHRoaXMucmFuZ2UpO1xyXG5cclxuICAgICAgLy8gb25seSBlbWl0IGFycmF5IHdoZW4gbWluIHJhbmdlIHNsaWRlciBpcyBhY3RpdmUsIGVsc2UgZW1pdCBudW1iZXJcclxuICAgICAgaWYgKHRoaXMubWluUmFuZ2VTbGlkZXIpIHtcclxuICAgICAgICB0aGlzLnJhbmdlQ2hhbmdlLmVtaXQodGhpcy5yYW5nZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yYW5nZUNoYW5nZS5lbWl0KHRoaXMucmFuZ2VbMV0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIHNldHMgcmFuZ2UgZGVmYXVsdCB2YWx1ZSBhbmQgcmVtb3ZlcyB0aGUgbWluIHNsaWRlciBidXR0b24gaWYgZGlzYWJsZWRcclxuICAgIHRoaXMuc2V0RGVmYXVsdFJhbmdlKCk7XHJcbiAgICAvLyBzZXRzIGFsbCByZWxhdGVkIGRpbWVuc2lvbnMgKHNsaWRlciBiYXIsIC1oaWdobGlnaHRlciBiYXIsIC1idXR0b25zIGFuZCAtdG9vbHRpcHMpXHJcbiAgICB0aGlzLnNldERpbWVuc2lvbnMoKTtcclxuICAgIHRoaXMuc2V0Q3VzdG9tQ3NzKCk7XHJcbiAgfVxyXG5cclxuICBzZXREZWZhdWx0UmFuZ2UoKSB7XHJcbiAgICAvLyBpbml0IHJhbmdlIHZhcmlhYmxlXHJcbiAgICBpZiAoIWlzTmFOKHRoaXMuZGVmYXVsdFJhbmdlKSkge1xyXG4gICAgICB0aGlzLnJhbmdlID0gW3RoaXMubWluLCB0aGlzLmRlZmF1bHRSYW5nZV07XHJcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5kZWZhdWx0UmFuZ2UpICYmIHRoaXMuZGVmYXVsdFJhbmdlLmxlbmd0aCA9PT0gMiAmJiAhdGhpcy5kZWZhdWx0UmFuZ2Uuc29tZShpc05hTikpIHtcclxuICAgICAgLy8gY2hlY2sgaWYgZGVmYXVsdCB2YWx1ZXMgYXJlIGNvbXBsaWFudCB3aXRoIG1pbiBhbmQgbWF4IHZhbHVlc1xyXG4gICAgICBpZiAodGhpcy5kZWZhdWx0UmFuZ2VbMF0gPj0gdGhpcy5taW4gJiYgdGhpcy5kZWZhdWx0UmFuZ2VbMV0gPD0gdGhpcy5tYXgpIHtcclxuICAgICAgICAvLyBzZXQgZGVmYXVsdCB2YWx1ZXMgdG8gcGFzc2VkIGFycmF5IGlmIG1pblJhbmdlU2xpZGVyIGlzIG9uXHJcbiAgICAgICAgaWYgKHRoaXMubWluUmFuZ2VTbGlkZXIpIHtcclxuICAgICAgICAgIHRoaXMucmFuZ2UgPSB0aGlzLmRlZmF1bHRSYW5nZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gc2V0IGRlZmF1bHQgdmFsdWUgdG8gbWluIGlmIG1pblJhbmdlU2xpZGVyIGlzIG9mZlxyXG4gICAgICAgICAgdGhpcy5yYW5nZSA9IFt0aGlzLm1pbiwgdGhpcy5kZWZhdWx0UmFuZ2VbMV1dO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBmYWxsYmFjayBpZiBkZWZhdWx0IHZhbHVlcyBhcmUgbm90IGNvbXBsaWFudCB3aXRoIG1pbiBhbmQgbWF4IHZhbHVlc1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGRlZmF1bHQgcmFuZ2UgaXMgbm90IGNvbXBsaWFudCB3aXRoIG1pbiBhbmQgbWF4IHZhbHVlcyAuLi4gc2V0IGZhbGxiYWNrIHZhbHVlc2ApO1xyXG4gICAgICAgIHRoaXMucmFuZ2UgPSBbdGhpcy5taW4sIE1hdGgucm91bmQodGhpcy5tYXggLyAyKV07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGZhbGxiYWNrIGlmIGFycmF5IGhhcyBhbnl0aGluZyBlbHNlIHRoYW4gMiBzbG90cywgYW55dGhpbmcgYnV0IG51bWJlcnMgb3IgaXMgbm90IGFycmF5XHJcbiAgICAgIHRoaXMucmFuZ2UgPSBbdGhpcy5taW4sIE1hdGgucm91bmQodGhpcy5tYXggLyAyKV07XHJcbiAgICB9XHJcbiAgICAvLyBpbml0IG1pbiByYW5nZSwgd2hlbiBpdCdzIG9ubHkgb25lIHNsaWRlclxyXG4gICAgaWYgKCF0aGlzLm1pblJhbmdlU2xpZGVyKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5taW5TbGlkZXJCdXR0b24ubmF0aXZlRWxlbWVudCwgJ25mYy1yYW5nZS1pbnB1dF9fc2xpZGVyLWJ1dHRvbi0taGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRDdXN0b21Dc3MoKSB7XHJcbiAgICBpZiAodGhpcy5zbGlkZXJCdXR0b25Dc3NDbGFzcykge1xyXG4gICAgICB0aGlzLnNldFNsaWRlckNzcyh0aGlzLnNsaWRlckJ1dHRvbkNzc0NsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5iYXJDc3NDbGFzcykge1xyXG4gICAgICB0aGlzLnNldEJhckNzcyh0aGlzLmJhckNzc0NsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oaWdobGlnaHRCYXJDc3NDbGFzcykge1xyXG4gICAgICB0aGlzLnNldEJhckhpZ2hsaWdodENzcyh0aGlzLmhpZ2hsaWdodEJhckNzc0NsYXNzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEJhckNzcyhjdXN0b21Dc3NDbGFzczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuYmFyLm5hdGl2ZUVsZW1lbnQsICduZmMtcmFuZ2UtaW5wdXRfX2Jhci1zdHlsaW5nJyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuYmFyLm5hdGl2ZUVsZW1lbnQsIGN1c3RvbUNzc0NsYXNzKTtcclxuICB9XHJcblxyXG4gIHNldEJhckhpZ2hsaWdodENzcyhjdXN0b21Dc3NDbGFzczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuYmFySGlnaGxpZ2h0Lm5hdGl2ZUVsZW1lbnQsICduZmMtcmFuZ2UtaW5wdXRfX2Jhci1oaWdobGlnaHQtc3R5bGluZycpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmJhckhpZ2hsaWdodC5uYXRpdmVFbGVtZW50LCBjdXN0b21Dc3NDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBzZXRTbGlkZXJDc3MoY3VzdG9tQ3NzQ2xhc3M6IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMubWluU2xpZGVyQnV0dG9uKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5taW5TbGlkZXJCdXR0b24ubmF0aXZlRWxlbWVudCwgJ25mYy1yYW5nZS1pbnB1dF9fc2xpZGVyLWJ1dHRvbi1zdHlsaW5nJyk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5taW5TbGlkZXJCdXR0b24ubmF0aXZlRWxlbWVudCwgY3VzdG9tQ3NzQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm1pblNsaWRlckJ1dHRvbikge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMubWF4U2xpZGVyQnV0dG9uLm5hdGl2ZUVsZW1lbnQsICduZmMtcmFuZ2UtaW5wdXRfX3NsaWRlci1idXR0b24tc3R5bGluZycpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubWF4U2xpZGVyQnV0dG9uLm5hdGl2ZUVsZW1lbnQsIGN1c3RvbUNzc0NsYXNzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1pblRvdWNoZWQoZXZlbnQ6IGFueSkge1xyXG4gICAgY29uc3QgZXZ0ID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XHJcbiAgICB0aGlzLm1pbk1vdXNlRG93bihldnQpO1xyXG4gIH1cclxuXHJcbiAgbWF4VG91Y2hlZChldmVudDogYW55KSB7XHJcbiAgICBjb25zdCBldnQgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcclxuICAgIHRoaXMubWF4TW91c2VEb3duKGV2dCk7XHJcbiAgfVxyXG5cclxuICBtaW5Nb3VzZURvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5taW5TbGlkZXJDbGlja2VkID0gdHJ1ZTtcclxuICAgIHRoaXMubWluU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5tYXhTbGlkZXJDbGlja2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLm1heFNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLm1pblNsaWRlckluaXRpYWxMZWZ0ID0gZXZlbnQudGFyZ2V0Lm9mZnNldExlZnQ7XHJcbiAgICB0aGlzLmluaXRpYWxNaW5Nb3VzZVggPSBldmVudC5jbGllbnRYO1xyXG4gIH1cclxuXHJcbiAgbWF4TW91c2VEb3duKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMubWF4U2xpZGVyQ2xpY2tlZCA9IHRydWU7XHJcbiAgICB0aGlzLm1heFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgIHRoaXMubWluU2xpZGVyQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5taW5TZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5tYXhTbGlkZXJJbml0aWFsTGVmdCA9IGV2ZW50LnRhcmdldC5vZmZzZXRMZWZ0O1xyXG4gICAgdGhpcy5pbml0aWFsTWF4TW91c2VYID0gZXZlbnQuY2xpZW50WDtcclxuICB9XHJcblxyXG4gIHRvdWNoTW92ZShldmVudDogYW55KSB7XHJcbiAgICBjb25zdCBldnQgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcclxuICAgIHRoaXMubW91c2VNb3ZlKGV2dCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcclxuICBvblJlc2l6ZShldmVudDogYW55KSB7XHJcbiAgICBpZiAodGhpcy5yYW5nZSkge1xyXG4gICAgICB0aGlzLnNldERpbWVuc2lvbnMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzptb3VzZW1vdmUnLCBbJyRldmVudCddKVxyXG4gIG1vdXNlTW92ZShldmVudDogYW55KSB7XHJcbiAgICBpZiAodGhpcy5taW5TZWxlY3RlZCB8fCB0aGlzLm1heFNlbGVjdGVkKSB7XHJcbiAgICAgIGlmICh0aGlzLm1pblNlbGVjdGVkKSB7XHJcbiAgICAgICAgdGhpcy5taW5DaGFuZ2UgPSBldmVudC5jbGllbnRYIC0gdGhpcy5pbml0aWFsTWluTW91c2VYO1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLm1pblNsaWRlckluaXRpYWxMZWZ0ICsgdGhpcy5taW5DaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBpeFRvVmFsKHRoaXMubWluLCBsZWZ0KTtcclxuXHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IHRoaXMucmFuZ2VbMV0pIHtcclxuICAgICAgICAgIGlmICh2YWx1ZSA8PSB0aGlzLm1pbikge1xyXG4gICAgICAgICAgICB0aGlzLm1pblNsaWRlckxlZnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmdlWzBdID0gdGhpcy5taW47XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBmaW5hbFZhbCA9IHRoaXMuY2FsY3VsYXRlRGlzdGFuY2UodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnJhbmdlWzBdID0gZmluYWxWYWwgPD0gdGhpcy5yYW5nZVsxXSA/IGZpbmFsVmFsIDogdGhpcy5yYW5nZVsxXTtcclxuICAgICAgICAgICAgdGhpcy5taW5TbGlkZXJMZWZ0ID0gdGhpcy52YWxUb1BpeGVsKHRoaXMucmFuZ2VbMF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm1heFNlbGVjdGVkKSB7XHJcbiAgICAgICAgdGhpcy5tYXhDaGFuZ2UgPSBldmVudC5jbGllbnRYIC0gdGhpcy5pbml0aWFsTWF4TW91c2VYO1xyXG4gICAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLm1heFNsaWRlckluaXRpYWxMZWZ0ICsgdGhpcy5tYXhDaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBpeFRvVmFsKHRoaXMubWluLCBsZWZ0KTtcclxuICAgICAgICBpZiAodmFsdWUgPj0gdGhpcy5yYW5nZVswXSkge1xyXG4gICAgICAgICAgaWYgKHZhbHVlID49IHRoaXMubWF4KSB7XHJcbiAgICAgICAgICAgIHRoaXMubWF4U2xpZGVyTGVmdCA9IHRoaXMucmFuZ2VJblBpeGVscztcclxuICAgICAgICAgICAgdGhpcy5yYW5nZVsxXSA9IHRoaXMubWF4O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgZmluYWwgPSB0aGlzLmNhbGN1bGF0ZURpc3RhbmNlKHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5yYW5nZVsxXSA9IGZpbmFsID4gdGhpcy5yYW5nZVswXSA/IGZpbmFsIDw9IHRoaXMubWF4ID8gZmluYWwgOiB0aGlzLm1heCA6IHRoaXMucmFuZ2VbMF07XHJcbiAgICAgICAgICAgIHRoaXMubWF4U2xpZGVyTGVmdCA9IHRoaXMudmFsVG9QaXhlbCh0aGlzLnJhbmdlWzFdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRIaWdobGlnaHRCYXJEaW1lbnNpb25zKCk7XHJcbiAgICAgIHRoaXMuc2V0VG9vbHRpcERpbWVuc2lvbnMoKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzptb3VzZXVwJywgWyckZXZlbnQnXSlcclxuICBtb3VzZVVwKGV2ZW50OiBhbnkpIHtcclxuICAgIHRoaXMubWluU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMubWF4U2VsZWN0ZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZURpc3RhbmNlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgaWYgKHRoaXMuc3RlcCkge1xyXG4gICAgICBjb25zdCBmaW4gPSB2YWx1ZSAtIE1hdGguZmxvb3IodmFsdWUpO1xyXG4gICAgICBpZiAoZmluID49IDAuNSkge1xyXG4gICAgICAgIHZhbHVlID0gTWF0aC5jZWlsKHZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHJlbWFpbmRlciA9IHZhbHVlICUgdGhpcy5zdGVwO1xyXG4gICAgICBpZiAocmVtYWluZGVyID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChyZW1haW5kZXIgPj0gKHRoaXMuc3RlcCAvIDIpKSB7XHJcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlICsgKHRoaXMuc3RlcCAtIHJlbWFpbmRlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhbHVlID0gdmFsdWUgLSByZW1haW5kZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBzZXREaW1lbnNpb25zKCkge1xyXG4gICAgaWYgKHRoaXMuYmFyICYmIHRoaXMubWF4U2xpZGVyQnV0dG9uICYmIHRoaXMucmFuZ2UgJiYgdGhpcy5yYW5nZVswXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc2V0QmFyQW5kU2xpZGVyRGltZW5zaW9ucygpO1xyXG4gICAgICB0aGlzLnNldEhpZ2hsaWdodEJhckRpbWVuc2lvbnMoKTtcclxuICAgICAgdGhpcy5zZXRUb29sdGlwRGltZW5zaW9ucygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0QmFyQW5kU2xpZGVyRGltZW5zaW9ucygpIHtcclxuICAgIHRoaXMuc2xpZGVyV2lkdGggPSB0aGlzLm1heFNsaWRlckJ1dHRvbi5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgdGhpcy5zbGlkZXJIZWlnaHQgPSB0aGlzLm1heFNsaWRlckJ1dHRvbi5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIHRoaXMuYmFyV2lkdGggPSB0aGlzLmJhci5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgaWYgKHRoaXMuc2xpZGVyV2lkdGggJiYgdGhpcy5iYXJXaWR0aCkge1xyXG4gICAgICB0aGlzLnJhbmdlRGlmZiA9IHRoaXMubWF4IC0gdGhpcy5taW47XHJcbiAgICAgIHRoaXMucmFuZ2VJblBpeGVscyA9IHRoaXMuYmFyV2lkdGggLSB0aGlzLnNsaWRlcldpZHRoO1xyXG4gICAgICBpZiAodGhpcy5iYXJXaWR0aCAmJiB0aGlzLnNsaWRlcldpZHRoKSB7XHJcbiAgICAgICAgdGhpcy52YWxUb1BpeGVsRmFjdG9yID0gKCh0aGlzLnJhbmdlSW5QaXhlbHMpIC8gdGhpcy5yYW5nZURpZmYpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubWluU2xpZGVyTGVmdCA9ICh0aGlzLnJhbmdlWzBdIC0gdGhpcy5taW4pICogdGhpcy52YWxUb1BpeGVsRmFjdG9yO1xyXG4gICAgICB0aGlzLm1heFNsaWRlckxlZnQgPSAodGhpcy5yYW5nZVsxXSAtIHRoaXMubWluKSAqIHRoaXMudmFsVG9QaXhlbEZhY3RvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEhpZ2hsaWdodEJhckRpbWVuc2lvbnMoKSB7XHJcbiAgICBpZiAodGhpcy5taW5SYW5nZVNsaWRlcikge1xyXG4gICAgICB0aGlzLmhpZ2hsaWdodEJhckxlZnQgPSB0aGlzLm1pblNsaWRlckxlZnQgKyAodGhpcy5zbGlkZXJXaWR0aCAvIDIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRCYXJMZWZ0ID0gdGhpcy5taW5TbGlkZXJMZWZ0O1xyXG4gICAgfVxyXG4gICAgdGhpcy5oaWdobGlnaHRCYXJXaWR0aCA9IHRoaXMubWF4U2xpZGVyTGVmdCAtIHRoaXMubWluU2xpZGVyTGVmdDtcclxuICB9XHJcblxyXG4gIHNldFRvb2x0aXBEaW1lbnNpb25zKCkge1xyXG4gICAgdGhpcy50b29sVGlwVG9wID0gKHRoaXMuc2xpZGVySGVpZ2h0ICsgMTApICogLSAxO1xyXG4gICAgdGhpcy5taW5Ub29sVGlwV2lkdGggPSB0aGlzLmdldFRvb2xUaXBMZW5ndGgodGhpcy5yYW5nZVswXS50b1N0cmluZygpKTtcclxuICAgIGNvbnN0IGNvbmQgPSB0aGlzLm1pblRvb2xUaXBXaWR0aCAqIDggKyB0aGlzLm1pblNsaWRlckxlZnQgKyA4O1xyXG4gICAgaWYgKGNvbmQgPiB0aGlzLm1heFNsaWRlckxlZnQgJiYgdGhpcy50b29sVGlwcyAmJiB0aGlzLm1pblJhbmdlU2xpZGVyKSB7XHJcbiAgICAgIHRoaXMuY29tYmluZVRvb2xUaXAgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNvbWJpbmVUb29sVGlwV2lkdGggPSB0aGlzLmdldFRvb2xUaXBMZW5ndGgoYCR7dGhpcy5yYW5nZVswXX0tJHt0aGlzLnJhbmdlWzFdfWApICogODtcclxuICAgICAgY29uc3QgbWF4TGVmdCA9IHRoaXMucmFuZ2VJblBpeGVscyAtIHRoaXMuY29tYmluZVRvb2xUaXBXaWR0aDtcclxuICAgICAgdGhpcy5jb21iaW5lVG9vbFRpcExlZnQgPSB0aGlzLm1pblNsaWRlckxlZnQgPCBtYXhMZWZ0ID8gdGhpcy5taW5TbGlkZXJMZWZ0IDogbWF4TGVmdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29tYmluZVRvb2xUaXAgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFRvb2xUaXBMZW5ndGgobnVtKSB7XHJcbiAgICByZXR1cm4gIFN0cmluZyhudW0pLm1hdGNoKC9cXGQvZykubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcGl4VG9WYWwobWluOiBudW1iZXIsIGxlZnQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTnVtYmVyKChtaW4gKyBsZWZ0ICogKDEgLyB0aGlzLnZhbFRvUGl4ZWxGYWN0b3IpKS50b0ZpeGVkKDIpKTtcclxuICB9XHJcblxyXG4gIHZhbFRvUGl4ZWwodmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy52YWxUb1BpeGVsRmFjdG9yICogKHZhbHVlIC0gdGhpcy5taW4pO1xyXG4gIH1cclxufVxyXG4iXX0=