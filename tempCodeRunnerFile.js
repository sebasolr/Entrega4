function MathChallenge(num) { 

  let sum =0;
  for (let i =0; i <= num-1 ;num++){
  sum +=i
  }
  num += sum
  return num

}
   
// keep this function call here 
console.log(MathChallenge(4));