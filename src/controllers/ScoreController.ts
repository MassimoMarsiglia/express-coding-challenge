import { calculateAverageScores } from "../services/ScoreService"
import { ScoreResponse } from "../types/ScoreTypes"
import { Request, Response } from 'express';


export const getScores = async (req: Request, res: Response): Promise<void> => {
    try {

        const fileName = req.query.file;

        if(!fileName) {
            res.status(400).json({ error: 'File parameter is required' });
            return;
        }

        const scores: ScoreResponse = await calculateAverageScores(fileName as string);

        res.json(scores).send();
        return;
        
    } catch (error) {

        console.error('Error retrieving scores:', error);

        if (error instanceof Error) {

            res.status(404).json({ error: error.message });
        } else {

            res.status(500).json({ error: 'Failed to retrieve scores' });
        }
    }
}