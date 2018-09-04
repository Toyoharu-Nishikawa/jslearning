
"use strict"
export const transpose = A=>A[0].map((k,i)=>A.map((v)=>v[i]))
export const csvParse = csv => csv
  .split(/\r\n|\n|\r/) //split by line feed codes
  .filter((k)=>k.match(/[^,\s\f\n\r\t\v]/)) //remove empty lines
  .map(k=>k.trim() //remove white spaces of begining and end of line
    .replace(/,\s+/g,",") //remove white spaces
    .split(",") //split by cannma
    .map((l)=>isNaN(l)? l:parseFloat(l)) //convert string to flot
    )

