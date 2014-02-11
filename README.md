THREE.ObjectControls
==================
A six-axis-of-freedom movement helper for THREE.js. Give it an THREE.Object3D instance, a mouse position, and setup some keyboard inputs and off you go.

Version 0.1.0
=============
Whilst in its infancy, I can't see the API for this changing much. I am planning to make a version that integrates with `Physijs`, though, but that will be an additional file.


Examples
========
There's only one example at the moment (`examples/spaceship.html`), but you do get to fly a spaceship, so it ain't all bad.


Usage
=====

```javascript
    
    // The target object to move must be an instance of THREE.Object3D in 
    // one form or another (mesh, imported object, etc.)
    var myTargetObject = new THREE.Object3D();

    // In this example, mousePos never changes, but in reality,
    // you'd set the axes of this vector to your mouse position.
    var mousePos = new THREE.Vector2();

    // Also just for this example, this delta-time value is fixed.
    // In reality you should use a real dt value.
    var dt = 0.016;

    // Create the controls, using `myTargetObject` as the object to control.
    var controls = new THREE.ObjectControls( {
        mousePos: mousePos,
        targetObject: myTargetObject,
        positionalAcceleration: new THREE.Vector3( 3, 10, 10 ),
        positionalDeceleration: new THREE.Vector3( 0.8, 0.8, 0.99 ),
        maxPositionalVelocity: new THREE.Vector3( 100, 100, 100 )
    } );

    // ...

    // In your render loop:
    controls.update( dt );
```

Constructor Options
===================
**`mousePos`**: *THREE.Vector2.* 
> A 2d vector describing your mouse position. This helper *does* scale mouse movement (see next option), but *does not* automatically set the center of your screen to be `0,0`. You gotta do that yourself.

**`maxMousePos`**: *THREE.Vector2.* 
> A Vec2 to scale the mouse position by. Set it to the maximum dimensions the mouse should be operational within, but don't forget to half these values if you want the middle of your screen to be `0,0`.
> What this allows for is equal x and y axis rotation regardless of screen-size.

**`targetObject`**: *THREE.Object3D.* 
> The THREE.Object3D instance to move. Can be a mesh, or an imported object, or whatever. Just so long as it inherits from THREE.Object3D at some point, all will be well.

**`positionalAcceleration`**: *THREE.Vector3.* 
> An instance of THREE.Vector3 describing the x, y, and z acceleration values.

**`positionalDeceleration`**: *THREE.Vector3.* 
> Same as above but for positional deceleration. Make sure all axis values are < 1 so that deceleration and not acceleration will occur.

**`maxPositionalVelocity`**: *THREE.Vector3.* 
> A limiter for positional velocity. Set to max values for each axis.

**`maxNegativePositionalVelocity`**: *THREE.Vector3.* 
> [ OPTIONAL ] A limiter for negative position velocity. If specified, make sure the values are negative. If not specified, it will default to the inverse of `maxPositionalVelocity`.

**`rollAcceleration`**: *Number.* 
> Acceleration for rotation around the z-axis (roll).

**`rollDeceleration`**: *Number.* 
> Deceleration for z-axis rotation. Again, must be < 1 so deceleration and not acceleration occurs.

**`maxRotationVelocity`**: *THREE.Vector3.* 
> Maximum velocity for rotation on *ALL* axis.


Instance Methods
================
**`.update( dt )`**: 
> Call this method once per-frame. Pass in a valid delta time (`dt`) value.

**`.setForward( state )`**: 
> `state`: *Boolean* Enable or disable forward (-z) movement.

**`.setBackward( state )`**: 
> `state`: *Boolean* Enable or disable backward (+z) movement.

**`.setLeft( state )`**: 
> `state`: *Boolean* Enable or disable left (-x) movement.

**`.setLeft( state )`**: 
> `state`: *Boolean* Enable or disable right (+x) movement.

**`.setUp( state )`**: 
> `state`: *Boolean* Enable or disable up (+y) movement.

**`.setDown( state )`**: 
> `state`: *Boolean* Enable or disable up (-y) movement.

**`.setRollLeft( state )`**: 
> `state`: *Boolean* Enable or disable left roll (+z) movement.

**`.setRollRight( state )`**: 
> `state`: *Boolean* Enable or disable right roll (-z) movement.

**`.setRotationXY( x, y )`**: 
> `x`: *Number | THREE.Vector2* Either mouse x-axis position, or a vec2 describing both mouse x- and y-axis position.
> `y`: *Number | undefined* Mouse y-axis position.

**`.setRotationX( x )`**:
> `x`: *Number* Mouse x-axis position.

**`.setRotationY( y )`**:
> `y`: *Number* Mouse y-axis position.



Building
========
This project uses [Grunt](http://gruntjs.com/) to create the minimized build. If you make changes and want to build it, follow these steps:

If you don't have grunt installed, first make sure you've got [NodeJS](http://nodejs.org/) and NPM installed, then install Grunt CLI. You might have to do this as root:

`npm install -g grunt-cli`

Now you can install the local grunt package

`cd chaseCamera`

`npm install`

`grunt`


The output of grunt will sit in the `build` folder.