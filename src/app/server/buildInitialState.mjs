
import fs from 'fs';
import util from 'util';
import path from 'path';
import {ROUTES_IDS} from 'router';
import {parseGpx} from 'app/gpx';

const readFile = util.promisify(fs.readFile);

const getGpxcontent = async () => {
    const gpxBuffer = await readFile(path.join(__dirname, '../../../static/track.gpx'));
    const gpxString = gpxBuffer.toString();

    return parseGpx(gpxString);
};

const getYmaps = () => ({
    initialized: false,
});

export default async ({state}, next) => {
    const gpxContent = await getGpxcontent();

    const ymaps = getYmaps();

    const {route} = state;

    state.initialState = {gpxContent, ymaps, route};

    return next();
};
