export interface ScoreResponse {
    femaleScore: number | null,
    maleScore: number | null,
    diverseScore: number | null
}

export interface Score {
    _id: string,
    rating: number | '',
    gender: Gender
}

export interface TotalScore {
    totalMaleRating: number,
    totalMaleResponses: number,
    totalFemaleRating: number,
    totalFemaleResponses: number,
    totalDiverseRating: number,
    totalDiverseResponses: number
}

type Gender = 'male' | 'female' | 'diverse' | '';