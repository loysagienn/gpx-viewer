
import parser from 'fast-xml-parser';

const {isNaN} = Number;

const parseTime = (timeStr) => {
    if (!timeStr) {
        return null;
    }

    const time = Date.parse(timeStr);

    if (isNaN(time)) {
        return null;
    }

    return time;
};

const getTrackPoint = ({
    _lat: strLat,
    _lon: strLon,
    ele: elevation,
    time,
}) => {
    const lat = parseFloat(strLat);
    const lon = parseFloat(strLon);

    if (isNaN(lat) || isNaN(lon)) {
        throw new Error(`Track point lat/lon parse error: lat: "${strLat}", lon: "${strLon}"`);
    }

    return {
        lat,
        lon,
        elevation,
        time: parseTime(time),
    };
};

const getTrack = points => points.map(getTrackPoint);

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
