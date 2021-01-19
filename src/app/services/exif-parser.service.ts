import {Injectable} from '@angular/core';
import {Section} from '../models/section';

@Injectable({
  providedIn: 'root'
})
export class ExifParserService {

  parseData(input): Section[] {

    const properties = Object.getOwnPropertyNames(input)
      .filter((p) => p !== 'latitude' && p !== 'longitude');
    const exif = new Section('Dati EXIF');
    const gps = new Section('Dati GPS');
    properties.forEach((p) => {
      if (!p.includes('GPS')) {
        exif.vectorData.push(this.checkExifData(input[p], p));
      } else {
        gps.vectorData.push(this.checkGpsData(input[p], p));
      }
    });
    const cord = this.getCoordinate(input);
    if (cord != null) {
      gps.vectorData.push(cord);
    }
    return [exif, gps];
  }

  getCoordinate(data): { label: string, value: string } {
    if (Object.getOwnPropertyNames(data).includes('latitude')) {
      const lat = data.latitude.toString();
      const log = data.longitude.toString();
      return {label: 'Coordinate', value: lat + ',' + log};
    } else {
      return null;
    }
  }


  checkExifData(value, properties): { label: string, value: string } {
    if (value === undefined) {
      return {label: properties, value: ''};
    } else if (properties === 'makerNote') {
      const len = value.length;
      return {label: 'MakerNote', value: len + ' Bytes'};
    } else {
      return {label: properties, value: value.toString()};
    }
  }

  checkGpsData(value, properties): { label: string, value: string } {
    if (value === undefined) {
      return {label: properties, value: ''};
    } else if (properties === 'GPSLatitude' || properties === 'GPSLongitude') {
      const val = value[0] + '° ' + value[1] + '\' ' + value[2] + '\'\'';
      return {label: properties, value: val};
    } else {
      return {label: properties, value: value.toString()};
    }
  }
}
