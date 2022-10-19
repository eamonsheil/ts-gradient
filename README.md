## Programmatically Created Gradient

the goal of this mini project is to create an smooth gradient between two user-selectex colors

#### Rules:
1. The gradient cannot be created through any css properties, except for general layout purposes
2. the gradient must contain at least 3 distinct colors, to give it a 'morphing' effect
3. the gradient should not be perfectly linear (to limit banding). There should be a sort of 3d effect - which can be achieved by offsetting the gradient's starting point.
    - can be achieved by creating a Radial Gradient in a large container, containing a solid cover 'wall' div, then placing a smaller 'window' div element offset from the center of the gradient, to obscure the source.
4. The inputs should be able to accept the following formats: 'ffffff' (hex), 'fff' (hex as 3 digits), 'white' (color names)


#### Stretch Goals:
1. allow user to select multiple colors, and the order, they should also be able to select a 'randomize' option in which the colors are ordered
2. users can take a 'snapshot' and save their created gradients.
