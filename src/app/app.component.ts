import {Component} from '@angular/core';
import exifr from 'exifr';
import {ExifParserService} from './services/exif-parser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  url;
  fileName = null;
  msg;
  exifData;

  constructor(private parser: ExifParserService) {
  }

  onLoadFile(event): void {
    const file = event.target.files[0];
    console.log(file);
    if (!file || file.length === 0) {
      this.msg = 'You must select an image';
      this.fileName = null;
    } else if (file.type.match(/image\/jpeg/) == null) {
      this.msg = 'Only jpeg images are supported';
      this.fileName = null;
    } else {
      this.fileName = file.name;
      this.msg = null;
      const reader = new FileReader();
      reader.onload = () => {
        this.url = reader.result;
      };
      reader.readAsDataURL(file);

      this.exifData = exifr.parse(file, {makerNote: true}).then(output => {
        if (output !== undefined) {
          return this.parser.parseData(output);
        } else {
          return null;
        }
      });
    }
  }
}
