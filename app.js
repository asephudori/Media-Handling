require('dotenv').config();
const express = require('express');
const app = express();
const Sentry = require('@sentry/node')
const { PORT = 3000, SENTRY_DSN, ENV } = process.env;

Sentry.init({
    dsn: SENTRY_DSN ,
    integrations: (
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Express({ app })
    ),
    tracesSampleRate: 1.0,
    environment: ENV
})

app.use(express.json());

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use('/images', express.static('public/images'));
app.use('/videos', express.static('public/videos'));
app.use('/documents', express.static('public/documents'));

app.get('/', (req, res) => {
    console.log(name)
    return res.json({
        status: true,
        message: 'hello world',
        error: null,
        data: null,
    })
})

const mediaRouter = require('./routes/media.routes.js');
app.use('/api/v1', mediaRouter);

app.use(Sentry.Handlers.errorHandler())

//404
app.use(( req, res, next )=> {
    res.status(404).json({
        status: false,
        message: 'Not Found',
        error: null,
        data: null
    })
})

//500
app.use(( req, res, next )=> {
    res.status(500).json({
        status: false,
        message: 'Not Found',
        error: null,
        data: null
    })
})

app.listen(PORT, () => console.log('listening on port', PORT));