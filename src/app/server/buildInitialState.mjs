
import fs from 'fs';
import util from 'util';
import path from 'path';
import {parseGpx} from 'app/gpx';
import {getAthlete, getActivities} from 'stravaApi';

const readFile = util.promisify(fs.readFile);

const getGpxcontent = async () => {
    const gpxBuffer = await readFile(path.join(__dirname, '../../../static/track.gpx'));
    const gpxString = gpxBuffer.toString();

    return parseGpx(gpxString);
};

const getYmaps = () => ({
    initialized: false,
});

const getAthleteData = async ({state}) => {
    const {stravaCredentials: credentials} = state;

    if (!credentials) {
        return null;
    }

    const [info, activities] = await Promise.all([
        getAthlete(credentials),
        getActivities(credentials),
    ]);

    return {info, activities};
};

export default async (koaCtx, next) => {
    const gpxContent = await getGpxcontent();

    const {state, origin} = koaCtx;

    const ymaps = getYmaps();

    const {route} = state;

    const athlete = await getAthleteData(koaCtx);

    state.initialState = {
        gpxContent,
        ymaps,
        route,
        athlete,
        meta: {origin},
    };

    return next();
};
