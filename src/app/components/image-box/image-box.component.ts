import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-box',
  templateUrl: './image-box.component.html',
  styleUrls: ['./image-box.component.scss']
})
export class ImageBoxComponent {
  @Input() url = null;

  rotateImage(clockWise: boolean): void {
    const offScreenCanvas = document.createElement('canvas');
    const offScreenCanvasCtx = offScreenCanvas.getContext('2d');

    const img = new Image();
    img.src = this.url;

    offScreenCanvas.height = img.width;
    offScreenCanvas.width = img.height;

    if (clockWise) {
      offScreenCanvasCtx.rotate(90 * Math.PI / 180);
      offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
    } else {
      offScreenCanvasCtx.rotate((-90) * Math.PI / 180);
      offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
    }
    offScreenCanvasCtx.drawImage(img, 0, 0);

    this.url = offScreenCanvas.toDataURL('image/jpeg', 100);
  }
}
