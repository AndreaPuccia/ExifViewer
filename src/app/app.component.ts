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
    this.url = null;
    const file = event.target.files[0];
    this.fileName = file.name;
    console.log(file);
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
    } else if (file.type.match(/image\/jpeg/) == null) {
      this.msg = 'Only jpeg images are supported';
    } else {
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
