import {Injectable} from '@angular/core';
import {Section} from '../models/section';

@Injectable({
  providedIn: 'root'
})
export class ExifParserService {

  parseData(input): Section[] {

    const exifFields = Object.getOwnPropertyNames(input)
      .filter((p) => p !== 'latitude' && p !== 'longitude');
    const exif = new Section('EXIF Data');
    const gps = new Section('GPS Data');
    exifFields.forEach((p) => {
      if (!p.includes('GPS')) {
        exif.addProperties(this.checkExifData(input[p], p));
      } else {
        gps.addProperties(this.checkGpsData(input[p], p));
      }
    });
    gps.addProperties(this.getCoordinate(input));
    return gps.properties.length > 0 ? [exif, gps] : [exif];
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
    } else if (value.constructor === Uint8Array && value.length > 4) {
      const len = value.length;
      return {label: properties, value: len + ' Bytes'};
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
