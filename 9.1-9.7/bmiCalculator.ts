
export const calculateBmi = (height: number, weight: number) : string => {
  const index = weight/height/height*10000;
  if (index <= 18.4) {
    return 'Underweight (unhealthy weight)';
  } else if( 18.4 < index && index < 25 ) {
    return 'Normal (healthy weight)';
  } else if( 24.9 < index && index < 40 ) {
    return 'Overweight (unhealthy weight)';
  } else ( 40 <= index ); {
    return 'Obese (critical weight)';
  }
};
try {
  const a = Number(process.argv[2]);
  const b = Number(process.argv[3]);
  console.log(calculateBmi(a, b));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);

}