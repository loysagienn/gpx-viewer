
import fs from 'fs';
import util from 'util';
import path from 'path';
import {parseGpx} from '../gpx';

const readFile = util.promisify(fs.readFile);

const getGpxcontent = async () => {
    const gpxBuffer = await readFile(path.join(__dirname, '../../../static/track.gpx'));
    const gpxString = gpxBuffer.toString();

    return parseGpx(gpxString);
};

const getYmaps = () => ({
    initialized: false,
});

export default async () => {
    const gpxContent = await getGpxcontent();
    const ymaps = getYmaps();

    return {gpxContent, ymaps};
};
