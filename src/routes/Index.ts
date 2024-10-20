import express from 'express';
import ExampleRoute from './ExampleRoute';


const router = express.Router();

export default(): express.Router=> {
    ExampleRoute(router);
    return router;
}