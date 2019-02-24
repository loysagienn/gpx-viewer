
import parser from 'fast-xml-parser';


const parseTime = (timeStr) => {
    if (!timeStr) {
        return null;
    }

    const time = Date.parse(timeStr);

    if (Number.isNaN(time)) {
        return null;
    }

    return time;
};

const getTrack = points => points.map(({
    _lat: lat,
    _lon: lon,
    ele: elevation,
    time,
}) => ({
    lat,
    lon,
    elevation,
    time: parseTime(time),
}));

export const parseGpx = (str) => {
    const {gpx} = parser.parse(str, {
        ignoreAttributes: false,
        attributeNamePrefix: '_',
    });

    const {metadata, trk} = gpx;

    return {
        creator: gpx._creator,
        date: parseTime(metadata.time),
        name: trk.name,
        track: getTrack(trk.trkseg.trkpt),
        originalGpxData: gpx,
    };
};
