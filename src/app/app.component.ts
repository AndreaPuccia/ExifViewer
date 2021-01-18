import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  url;
  fileName = null;
  msg;

  onLoadFile(event): void {
    const file = event.target.files[0];
    console.log(file);
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
      this.fileName = null;
    } else if (file.type.match(/image\/jpeg/) == null) {
      this.msg = 'Only jpeg images are supported';
      this.fileName = null;
    } else {
      this.fileName = file.name;
      this.msg = null;
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result;
      };
    }
  }

  onClick(): void {
    document.getElementById('fileInput').click();
  }
}
