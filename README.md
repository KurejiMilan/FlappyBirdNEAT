# FlappyBirdNEAT
Creating flappy bird AI using the NEAT(Neuro Evolution of Augmented Topologies) algorithm.
# ImageGeneticAlgorithm

## Introduction
This project implements the NEAT(Neuro Evolution of Augmented Topologies) Algorithm to train the AI to play flappy bird game. 
The NEAT algorithm implements the Genetic algorithm and artificial nueral netwrok .Genetic algorithm
mimics the process of natural selection where the most fittest and best sample from population are selected
to breed so that their genetic meterial i.e.DNA, we are interested in, is passed to their offspring. This process
is repeated again and again so best of the best genetic materials are only passed to next generation. In this case
the genetic material is the best neural network that can play the game.



<img src="https://github.com/KurejiMilan/FlappyBirdNEAT/blob/main/img/flappyWireframe.jpg" alt="flappy bird wireframe" height="400px" width="600px">

## Technologies and programming language 
* Javascript
* P5js
* NEAT algorithm
* Sublime text editor
* python http server

## Contributors and Developers
* Milan Rai

## Issues

## Improvements
Currently the program only finds the best neural network which as fixed number of layers(input, intermediate and output)
and nodes on each intermediate layers are also fixed. The program can be modified to select best neural network comparing different
number of intermediate layer and nodes per layer.

## Special Thanks
I would like to thank Danial Shiffman(Coding Train) for the wonderful tutorial on genetic algorithm.
Make your own neural netwrok written by tariq rashid was really helpful in making the neural network.
 
## Project status
This project is completed. You can clone the repo and run it on processing. You can change parameters like
mutation rate and population size to see how these parameters effect how fast can it achive the desired goal.
