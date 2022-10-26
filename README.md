## Programmatically Created Gradient

the goal of this mini project is to create an smooth gradient between two user-selectex colors

#### Rules:
1. The gradient cannot be created through any css properties, except for general layout purposes
2. the gradient must contain at least 2 distinct colors, as indicated by the user
3. should create 4 different gradients:
    1. Linear horizontal (iterative) - basic gradient from left to right within the canvas
    2. Linear vertical (iterative) - basic gradient from top to bottom within the canvas
    3. Radial centered (recursive) - first color in the center, 2nd in each corner of the canvas
    4. Radial corner-based (recursive) -first color in the upper left corner, second in the lower right corner ofthe canvas
4. The inputs should be able to accept the following formats: 'ffffff' (hex), 'fff' (hex as 3 digits), 'white' (color names)


#### Stretch Goals:
1. allow user to select multiple colors, and the order, they should also be able to select a 'randomize' option in which the colors are ordered
2. users can take a 'snapshot' and save their created gradients.
