import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-exif-data',
  templateUrl: './exif-data.component.html',
  styleUrls: ['./exif-data.component.scss']
})
export class ExifDataComponent implements OnInit{
  @Input() exifData;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.exifData);
  }


}
