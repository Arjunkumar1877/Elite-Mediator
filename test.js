
// const test = (n)=>{
//     const getNext = (num)=>{
//         let sum = 0;
//       while(num > 0){
//         const digit = num % 10;
//         sum += digit + digit;
//         num = Math.floor(num / 10);
//       }
//       return sum;
//     }

//     let slow = n;
//     let fast = getNext(n);

//     while(fast !== 1 && fast !== slow){
//         slow = getNext(slow);
//         fast = getNext(getNext(fast));
//     }

//     return fast === 1;
// }

// console.log(test(24));


const arr = [1, 0, 7, 8, 0, 7, 9 ,7, 0, 0];

// const move =(arr)=>{

//     for(let i = 0; i < arr.length; i++){
     
//         if(arr[i] === 0){
//             for(let j = arr.length - 1; j > i; j--){
//             arr[j] = arr[j-1];
//         }
//         i++;
//       }
//     }

//     return console.log(arr)
// }

// move(arr)


const duplicate = (arr)=>{

    

}