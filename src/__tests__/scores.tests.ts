import request from 'supertest';
import { server, app } from '../App';
import * as fs from 'fs';
import { Score, ScoreResponse } from '../types/ScoreTypes';
import { calculateAverageScores } from '../services/ScoreService';

describe('ScoreController integration tests', () => {

    it('should error 404 when a invalid file is specified', async () => {

        const response = await request(app).get('/scores?file=test.json');

        expect(response.status).toBe(404);

    });

    it('should error 400 when no file path is specified', async () => {

        const response = await request(app).get('/scores');

        expect(response.status).toBe(400);
    })

    it('should return all scores as "null" if any gender has below 3 answers', async () => {

        const expectedResponse: ScoreResponse = {
            femaleScore: null,
            maleScore: null,
            diverseScore: null
        }

        const response = await request(app).get('/scores?file=testUnder3.answers.json');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    })

    it('should return the average scores if all genders have over 3 answers', async () => {

        const expectedResponse: ScoreResponse = {
            femaleScore: 7.9,
            maleScore: 9.5,
            diverseScore: 6.9
        }

        const response = await request(app).get('/scores?file=average.answers.json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    })
})