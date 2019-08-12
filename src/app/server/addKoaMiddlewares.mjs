import withSession from './withSession';
import withRoute from './withRoute';
import authStrava from './strava/authStrava';
import withAthleteId from './withAthleteId';
import withStravaCredentials from './strava/withStravaCredentials';
import unauthStrava from './strava/unauthStrava';
import handleApiRequest from './handleApiRequest';
import withInitialState from './withInitialState';
import handleHtmlRequest from './handleHtmlRequest';
import applyDemoAuth from './applyDemoAuth';
import logVisit from './logVisit';


const addKoaMiddlewares = (koaServer) => {
    // добавляем koaCtx.state.session
    koaServer.use(withSession);
    // добавляем koaCtx.state.route
    koaServer.use(withRoute);
    // обработка запроса авторизации в strava
    koaServer.use(authStrava);
    // обработка запроса авторизации/деавторизации демо режима
    koaServer.use(applyDemoAuth);
    // добавляем koaCtx.state.athleteId, либо из сессии, либо из демо
    koaServer.use(withAthleteId);
    // добавляем koaCtx.state.stravaCredentials если пользователь авторизован в strava
    koaServer.use(withStravaCredentials);
    // обработка запроса деавторизации в strava
    koaServer.use(unauthStrava);
    // обработка api запросов
    koaServer.use(handleApiRequest);
    // логгируем запрос
    koaServer.use(logVisit);
    // добавляем koaCtx.state.initialState для html странички
    koaServer.use(withInitialState);
    // рисуем html страничку
    koaServer.use(handleHtmlRequest);
};


export default addKoaMiddlewares;
