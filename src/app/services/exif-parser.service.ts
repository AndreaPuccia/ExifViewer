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
    const result = [exif, gps].filter(e => !e.isEmpty());
    return result.length ? result : null;
  }

  getCoordinate(data): { label: string, value: string } {
    if (Object.getOwnPropertyNames(data).includes('latitude') && Object.getOwnPropertyNames(data).includes('longitude')) {
      const lat = data.latitude.toString();
      const log = data.longitude.toString();
      return {label: 'Coordinate', value: lat + ',' + log};
    } else {
      return null;
    }
  }


  checkExifData(value, properties): { label: string, value: string } {
    if (value === undefined) {
      return null;
    }else {
      return {label: properties, value: value.toString().replace(/,/g, ', ')};
    }
  }

  checkGpsData(value, properties): { label: string, value: string } {
    if (value === undefined) {
      return null;
    } else if (properties === 'GPSLatitude' || properties === 'GPSLongitude') {
      const val = value[0] + '° ' + value[1] + '\' ' + value[2] + '\'\'';
      return {label: properties, value: val};
    } else {
      return {label: properties, value: value.toString().replace(/,/g, ', ')};
    }
  }
}
