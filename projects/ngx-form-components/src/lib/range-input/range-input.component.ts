import {
  Component, DoCheck,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  IterableDiffers,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

const noop = () => {};

@Component({
  selector: 'nfc-range-input',
  templateUrl: './range-input.component.html',
  styleUrls: ['./range-input.component.css']
})
export class RangeInputComponent implements OnInit, DoCheck {

  @Input() min?: number = 0;
  @Input() max?: number = 100;
  @Input() step?: number = 1;
  @Input() toolTips?: boolean = false;
  @Input() minRangeSlider?: boolean = false;
  @Input() highlightBarCssClass?: string;
  @Input() barCssClass?: string;
  @Input() sliderButtonCssClass?: string;

  @Output() rangeChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('bar') bar: ElementRef;
  @ViewChild('minSliderButton') minSliderButton: ElementRef;
  @ViewChild('maxSliderButton') maxSliderButton: ElementRef;
  @ViewChild('barHighlight') barHighlight: ElementRef;

  private valToPixelFactor: number;
  private iterableDiffer: any;
  private onTouchedCallback: (_: any) => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  minSliderLeft: number;
  maxSliderLeft: number;
  highlightBarWidth: number;
  highlightBarLeft: number;

  sliderWidth: number;
  sliderHeight: number;
  barWidth: number;
  rangeDiff: number;
  minSliderClicked: boolean;
  minSelected: boolean;
  maxSliderClicked: boolean;
  maxSelected: boolean;
  minSliderInitialLeft: number;
  initialMinMouseX: number;
  maxSliderInitialLeft: number;
  initialMaxMouseX: number;
  rangeInPixels: number;

  combineToolTip: boolean = false;
  combineToolTipLeft: number;
  minToolTipWidth: number;
  combineToolTipWidth: number;
  toolTipTop: number;

  range: number[];
  minChange: number;
  maxChange: number;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private iterableDiffers: IterableDiffers) {

    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
  }

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.range);
    if (changes) {
      this.onChangeCallback(this.range);
      this.onTouchedCallback(this.range);

      // only emit array when min range slider is active, else emit number
      if (this.minRangeSlider) {
        this.rangeChange.emit(this.range);
      } else {
        this.rangeChange.emit(this.range[1]);
      }
    }
  }

  ngOnInit() {
    // init range variable
    this.range = [this.min, Math.round(this.max / 2)];
    // init min range, when it's only one slider
    if (!this.minRangeSlider) {
      this.renderer.addClass(this.minSliderButton.nativeElement, 'nfc-range-input__slider-button--hidden');
    }
    // sets all related dimensions (slider bar, -highlighter bar, -buttons and -tooltips)
    this.setDimensions();
    this.setCustomCss();
  }

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

  setBarCss(customCssClass: string) {
    this.renderer.removeClass(this.bar.nativeElement, 'nfc-range-input__bar-styling');
    this.renderer.addClass(this.bar.nativeElement, customCssClass);
  }

  setBarHighlightCss(customCssClass: string) {
    this.renderer.removeClass(this.barHighlight.nativeElement, 'nfc-range-input__bar-highlight-styling');
    this.renderer.addClass(this.barHighlight.nativeElement, customCssClass);
  }

  setSliderCss(customCssClass: string) {
    if (this.minSliderButton) {
      this.renderer.removeClass(this.minSliderButton.nativeElement, 'nfc-range-input__slider-button-styling');
      this.renderer.addClass(this.minSliderButton.nativeElement, customCssClass);
    }

    if (this.minSliderButton) {
      this.renderer.removeClass(this.maxSliderButton.nativeElement, 'nfc-range-input__slider-button-styling');
      this.renderer.addClass(this.maxSliderButton.nativeElement, customCssClass);
    }
  }

  minTouched(event: any) {
    const evt = event.changedTouches[0];
    this.minMouseDown(evt);
  }

  maxTouched(event: any) {
    const evt = event.changedTouches[0];
    this.maxMouseDown(evt);
  }

  minMouseDown(event: any) {
    this.minSliderClicked = true;
    this.minSelected = true;
    this.maxSliderClicked = false;
    this.maxSelected = false;
    this.minSliderInitialLeft = event.target.offsetLeft;
    this.initialMinMouseX = event.clientX;
  }

  maxMouseDown(event: any) {
    this.maxSliderClicked = true;
    this.maxSelected = true;
    this.minSliderClicked = false;
    this.minSelected = false;
    this.maxSliderInitialLeft = event.target.offsetLeft;
    this.initialMaxMouseX = event.clientX;
  }

  touchMove(event: any) {
    const evt = event.changedTouches[0];
    this.mouseMove(evt);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.range) {
      this.setDimensions();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  mouseMove(event: any) {
    if (this.minSelected || this.maxSelected) {
      if (this.minSelected) {
        this.minChange = event.clientX - this.initialMinMouseX;
        const left = this.minSliderInitialLeft + this.minChange;
        const value = this.pixToVal(this.min, left);

        if (value <= this.range[1]) {
          if (value <= this.min) {
            this.minSliderLeft = 0;
            this.range[0] = this.min;
          } else {
            const finalVal = this.calculateDistance(value);
            this.range[0] = finalVal <= this.range[1] ? finalVal : this.range[1];
            this.minSliderLeft = this.valToPixel(this.range[0]);
          }
        }
      } else if (this.maxSelected) {
        this.maxChange = event.clientX - this.initialMaxMouseX;
        const left = this.maxSliderInitialLeft + this.maxChange;
        const value = this.pixToVal(this.min, left);
        if (value >= this.range[0]) {
          if (value >= this.max) {
            this.maxSliderLeft = this.rangeInPixels;
            this.range[1] = this.max;
          } else {
            const final = this.calculateDistance(value);
            this.range[1] = final > this.range[0] ? final <= this.max ? final : this.max : this.range[0];
            this.maxSliderLeft = this.valToPixel(this.range[1]);
          }
        }
      }
      this.setHighlightBarDimensions();
    }
    return false;
  }

  @HostListener('window:mouseup', ['$event'])
  mouseUp(event: any) {
    this.minSelected = false;
    this.maxSelected = false;
  }

  calculateDistance(value: number): number {
    if (this.step) {
      const fin = value - Math.floor(value);
      if (fin >= 0.5) {
        value = Math.ceil(value);
      } else {
        value = Math.floor(value);
      }
      const remainder = value % this.step;
      if (remainder === 0) {
        return value;
      } else {
        if (remainder >= (this.step / 2)) {
          value = value + (this.step - remainder);
        } else {
          value = value - remainder;
        }
      }
    }
    return value;
  }

  setDimensions() {
    if (this.bar && this.maxSliderButton && this.range && this.range[0] !== undefined) {
      this.setBarAndSliderDimensions();
      this.setHighlightBarDimensions();
      this.setTooltipDimensions();
    }
  }

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

  setHighlightBarDimensions() {
    if (this.minRangeSlider) {
      this.highlightBarLeft = this.minSliderLeft + (this.sliderWidth / 2);
    } else {
      this.highlightBarLeft = this.minSliderLeft;
    }
    this.highlightBarWidth = this.maxSliderLeft - this.minSliderLeft;
  }

  setTooltipDimensions() {
    this.toolTipTop = (this.sliderHeight + 10) * - 1;
    this.minToolTipWidth = this.getToolTipLength(this.range[0].toString());
    const cond = this.minToolTipWidth * 8 + this.minSliderLeft + 8;
    if (cond > this.maxSliderLeft && this.toolTips ) {
      this.combineToolTip = true;
      this.combineToolTipWidth = this.getToolTipLength(`${this.range[0]}-${this.range[1]}`) * 8;
      const maxLeft = this.rangeInPixels - this.combineToolTipWidth;
      this.combineToolTipLeft = this.minSliderLeft < maxLeft ? this.minSliderLeft : maxLeft;
    } else {
      this.combineToolTip = false;
    }
  }

  getToolTipLength(num) {
    return  String(num).match(/\d/g).length;
  }

  pixToVal(min: number, left: number): number {
    return Number((min + left * (1 / this.valToPixelFactor)).toFixed(2));
  }

  valToPixel(value: number): number {
    return this.valToPixelFactor * (value - this.min);
  }
}
