interface results {
    days: number;
    trainingDays: number;
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

export const calculateExercises = (data: Array<number>, target: number) : results => {
  const days = data.length;
  const trainingDays = data.filter((hours) => hours !== 0).length;
  const average = data.reduce((a, b) => a + b, 0) / data.length;
  const success = average >= target;
  let rating = 1;
  let ratingDescription = '';
  if (average / target < 1) {
    rating = 1;
    ratingDescription = 'Good effort, but not enough';
  } else if (average / target > 1 && average / target <1.5) {
    rating = 2;
    ratingDescription = 'Not bad, keep up the good work!';
  } else if (average / target >1.5) {
    rating = 3;
    ratingDescription = 'Amazing work! No need to call you lazy!';
  }
  return {
    days,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};
try {
  const target = Number(process.argv[2]);
  const data = process.argv.slice(2);
  const period = data.map((hours) => Number(hours));
  const result = calculateExercises(period, target);
  console.log('Periodlength:', result.days);
  console.log('trainingDays:', result.trainingDays);
  console.log('success:', result.success);
  console.log('rating:', result.rating);
  console.log('rating description:', result.ratingDescription);
  console.log('target hours:', result.target);
  console.log('average hours:', result.average);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);

}



