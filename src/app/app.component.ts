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
  msg;
  exifData;

  constructor(private parser: ExifParserService) {
  }

  onLoadFile(event): void {
    const file = event.target.files[0];
    if (!file) {
      this.msg = 'You must select an image';
    } else if (file.type.match(/image\/jpeg/) == null) {
      this.msg = 'Only jpeg images are supported';
    } else {
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
