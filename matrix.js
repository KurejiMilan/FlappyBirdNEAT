
// Tensor class is use to create matrix with random weights as the link weights 
// dot product of the matrix

class Tensor{
	constructor(rows,columns){
		this.rows = rows;
		this.columns = columns;
		this.matrix = new Array();
		for(let i=0; i<rows; i++){
			this.matrix[i] = new Array();
			for(let j=0; j<columns; j++){
				this.matrix[i][j] = Math.random();
			}
		}
	}

	// mat1 should be the matrix of weights and mat2 should be input for that layer
	// directly applying activation function here
	static dotProduct(mat1, mat2, func){
		let resultMat = new Array();
		// console.log(mat1);
		// console.log(mat2);
		for(let i=0; i<mat1.rows; i++){
			resultMat[i] = 0;
			for(let j=0; j<mat1.columns; j++) resultMat[i]+=mat1.matrix[i][j]*mat2[j];
			resultMat[i]=activation(func, resultMat[i]);											// calling the activation function from here
		}
		return resultMat;
	}
}