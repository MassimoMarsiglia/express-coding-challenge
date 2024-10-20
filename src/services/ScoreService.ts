import path from 'path';
import { Score, ScoreResponse, TotalScore } from '../types/ScoreTypes';
import { readFileSync } from 'fs';



export const calculateAverageScores = async (fileName: string): Promise<ScoreResponse> => {

    const filePath = path.resolve(__dirname, '../../resources', fileName);

    try {
        const scores: Score[] = await JSON.parse(readFileSync(filePath, 'utf-8'));

        const scoreSummary: TotalScore = parseScores(scores);

        return calculateScoreAverages(scoreSummary);

    } catch (error) {
        if (error instanceof Error && error.message.includes('ENOENT')) {
            throw new Error(`File not found: ${fileName}`);
        }
        console.error(`Error reading file ${fileName}:`, error);
        throw new Error('Could not read the file');
    }
    
}

function parseScores(scores: Score[]) {

    let scoreSummary: TotalScore = {
        totalMaleRating: 0,
        totalMaleResponses: 0,
        totalFemaleRating: 0,
        totalFemaleResponses: 0,
        totalDiverseRating: 0,
        totalDiverseResponses: 0,
      };

    scores.forEach(score => {
        if(score.rating !== '') {
            if(score.gender === 'male') {
                scoreSummary.totalMaleRating += score.rating;
                scoreSummary.totalMaleResponses++;
            } else if(score.gender === 'female') {
                scoreSummary.totalFemaleRating += score.rating;
                scoreSummary.totalFemaleResponses++;
            } else if(score.gender === 'diverse') {
                scoreSummary.totalDiverseRating += score.rating;
                scoreSummary.totalDiverseResponses++;
            }
        }
    })
    return scoreSummary;
}

function calculateScoreAverages(scores: TotalScore): ScoreResponse {

    let scoreResponse: ScoreResponse;

    if(scores.totalDiverseResponses < 3 ||
        scores.totalFemaleResponses < 3 ||
        scores.totalMaleResponses < 3
    ) {
        return scoreResponse = {
            femaleScore: null,
            maleScore: null,
            diverseScore: null
        }
    }

    return scoreResponse = {
        femaleScore: calculateAverage(scores.totalFemaleRating, scores.totalFemaleResponses),
        maleScore: calculateAverage(scores.totalMaleRating, scores.totalMaleResponses),
        diverseScore: calculateAverage(scores.totalDiverseRating, scores.totalDiverseResponses)
    };
}

function calculateAverage(totalRating: number, totalResponses: number): number {
    return parseFloat((totalRating / totalResponses).toFixed(1))
}