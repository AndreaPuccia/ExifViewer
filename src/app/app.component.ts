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
  load = true;

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
    if (file) {
      this.load = false;
      if (file.type.match(/image\/jpeg/) == null) {
        this.openSnackbar('Only jpeg images are supported');
        this.load = true;
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.url = reader.result;
        };
        reader.readAsDataURL(file);

        this.exifData = exifr.parse(file).then(output => {
          let response = null;
          if (output !== undefined) {
            response = this.parser.parseData(output);
          }
          this.load = true;
          return response;
        });
      }
    }
  }
}
