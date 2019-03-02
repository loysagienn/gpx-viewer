
import fs from 'fs';
import util from 'util';
import path from 'path';
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

export default async (koaCtx, next) => {
    const gpxContent = await getGpxcontent();

    const {state, origin} = koaCtx;

    const ymaps = getYmaps();

    const {route, stravaCredentials = {}} = state;

    const {athlete = null} = stravaCredentials;

    state.initialState = {
        gpxContent,
        ymaps,
        route,
        athlete,
        meta: {origin},
    };

    return next();
};
