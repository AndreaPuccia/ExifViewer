import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import exifr from 'exifr';
import {ExifParserService} from './services/exif-parser.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url;
  exifData;
  xSmall: boolean;

  constructor(private parser: ExifParserService, private snackBar: MatSnackBar,
              public breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(state => {
        this.xSmall = state.matches;
      });
  }

  openSnackbar(message: string): void {
    this.snackBar.open(message, null, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'error'
    });
  }

  onLoadFile(event): void {
    const file = event.target.files[0];
    if (!file) {
      this.openSnackbar('You must select an image');
    } else if (file.type.match(/image\/jpeg/) == null) {
      this.openSnackbar('Only jpeg images are supported');
    } else {
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
