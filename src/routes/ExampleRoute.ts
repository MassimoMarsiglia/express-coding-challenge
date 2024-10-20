import express from 'express';
import { getScores } from '../controllers/ScoreController';


export default (router: express.Router) => {
    router.get('/scores', getScores)
}