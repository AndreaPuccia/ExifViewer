import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-exif-data',
  templateUrl: './exif-data.component.html',
  styleUrls: ['./exif-data.component.scss']
})
export class ExifDataComponent {
  @Input() exifData;

  constructor() {
  }
}
