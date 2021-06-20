// sigma, tanh, relu, leakyRelu activation function are only added for now

var sigmoidAF = input => (1/(1+Math.exp(-1*input)));
var tanhAF = input => Math.tanh(input);
var reluAF = input => Math.max(input, 0);
var leakyReluAF = input => Math.max(input, input*0.1);

var activation = (func, input) => func(input);