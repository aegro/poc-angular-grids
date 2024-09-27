import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { ICellRendererParams } from '@ag-grid-community/core';
import { Component } from '@angular/core';
import { images } from '../images';

@Component({
    selector: 'country-logo-renderer',
    standalone: true,
    template: `
        <span :class="imgSpanLogo">
            @if (value) {
                <img [alt]="value" [src]="value" [height]="30" :class="logo"/>
            }
        </span>
    `,
})
export class CountryLogoRenderer implements ICellRendererAngularComp {
    // Init Cell Value
    public value!: string;
    agInit(params: ICellRendererParams): void {
        this.refresh(params);
    }

    // Return Cell Value
    refresh(params: ICellRendererParams): boolean {
        this.value = this.getFlag(params.value);
        return true;
    }

    getFlag(country: string): string {
        const code: string = country;
        const image: { [Key: string]: string } = images;
    
        return image[code];
    }
}