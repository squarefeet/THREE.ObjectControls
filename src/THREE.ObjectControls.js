/**
 * THREE.ObjectControls 0.1.0 
 * (c) 2013 Luke Moody (http://www.github.com/squarefeet)
 *
 * THREE.ObjectControls may be freely distributed under the MIT license 
 *  (See the LICENSE file at root of this repository.)
 */

THREE.ObjectControls = function( options ) {
    
    var 
        // An instance of THREE.Vector2 to describe the mouse position.
        mousePos = options.mousePos || new THREE.Vector2(),

        // A Vec2 to scale the mouse position by. Set it to the maximum dimensions the mouse should be 
        // operational within, but half these!
        maxMousePos = options.maxMousePos || new THREE.Vector2( window.innerWidth * 0.5, window.innerHeight * 0.5 ),
            
        // An instance (in whatever form) of THREE.Object3D. 
        targetObject = options.targetObject || null,


        // An instance of THREE.Vector3 describing the x, y, and z acceleration values
        positionalAcceleration = options.positionalAcceleration || new THREE.Vector3( 10, 10, 10 ),

        // Same as above but for positional deceleration. Make sure all axis values are < 1.
        positionalDeceleration = options.positionalDeceleration || new THREE.Vector3( 0.95, 0.95, 0.95 ),

        // A limiter for positional velocity. Set to max values for each axis.
        maxPositionalVelocity = options.maxPositionalVelocity || new THREE.Vector3( 10, 10, 10 ),

        // [ OPTIONAL ] A limiter for negative position velocity. If specified, make sure the values are negative.
        // If not specified, it will default to the inverse of `maxPositionalVelocity`.
        maxNegativePositionalVelocity = options.maxNegativePositionalVelocity || maxPositionalVelocity.clone().negate(),


        // Acceleration for rotation around the z-axis (roll)
        rollAcceleration = options.rollAcceleration || 0.05,

        // Deceleration for z-axis rotation. Must be < 1.
        rollDeceleration = options.rollDeceleration || 0.95,

        // Maximum velocity for rotation on ALL axis
        maxRotationVelocity = options.maxRollVelocity || new THREE.Vector3( 1, 1, 1 );






    var forward = false,
        back = false,
        left = false,
        right = false,
        up = false,
        down = false,
        rollLeft = false,
        rollRight = false,
        rollRotation = 0,
        rotationVector = new THREE.Vector3(),
        rotationQuaternion = new THREE.Quaternion(),
        positionVector = new THREE.Vector3();

    // Internal methods.
    var scaleNumber = function( num, lowIn, highIn, lowOut, highOut ) {
        return ( ( num - lowIn ) / ( highIn - lowIn ) ) * ( highOut - lowOut ) + lowOut;
    };

    var updateRotation = function( dt ) {
        var inc = rollAcceleration,
            dec = rollDeceleration,
            rot = rotationVector,
            max = maxRotationVelocity;

        // Set roll velocity
        if( rollLeft ) {
            rot.z += inc;
        }
        else if( rollRight ) {
            rot.z -= inc;
        }
        else {
            rot.z *= dec;
        }

        // Clamp roll velocity
        if( rot.z > max.z ) {
            rot.z = max.z;
        }
        else if( rot.z < -max.z ) {
            rot.z = -max.z;
        }

        // Handle x and y axes (controlled by mouse movement).
        rotationVector.y = -scaleNumber( mousePos.x, 0, maxMousePos.x, 0, max.x );
        rotationVector.x = -scaleNumber( mousePos.y, 0, maxMousePos.y, 0, max.y );
    };

    var updatePosition = function( dt ) {
        var inc = positionalAcceleration,
            dec = positionalDeceleration,
            max = maxPositionalVelocity,
            maxNeg = maxNegativePositionalVelocity,
            pos = positionVector;

        // Update forward/back velocity (z-axis)
        if( forward )   { pos.z -= inc.z; }
        else if( back ) { pos.z += inc.z; } 
        else            { pos.z *= dec.z; }

        // Update left/right velocity ( x-axis )
        if( left )          { pos.x -= inc.x; }
        else if( right )    { pos.x += inc.x; }
        else                { pos.x *= dec.x; }

        // Update up/down velocity ( y-axis )
        if( up )        { pos.y += inc.y; }
        else if( down ) { pos.y -= inc.y; }
        else            { pos.y *= dec.y; }


        // Clamp forward/backward velocity
        if( pos.z > max.z ) { 
            pos.z = max.z; 
        }
        else if( pos.z < maxNeg.z ) { 
            pos.z = maxNeg.z; 
        }

        // Clamp left/right velocity
        if( pos.x > max.x ) {
            pos.x = max.x;
        }
        else if( pos.x < maxNeg.x ) {
            pos.x = maxNeg.x;
        }

        // Clamp up/down velocity
        if( pos.y > max.y ) {
            pos.y = max.y;
        }
        else if( pos.y < maxNeg.y ) {
            pos.y = maxNeg.y;
        }
    };


    var updateTarget = function( dt ) {
        var velX = positionVector.x * dt,
            velY = positionVector.y * dt,
            velZ = positionVector.z * dt;

        rotationQuaternion.set(
            rotationVector.x * dt,
            rotationVector.y * dt,
            rotationVector.z * dt,
            1
        ).normalize();

        targetObject.quaternion.multiply( rotationQuaternion );

        targetObject.translateX( velX );
        targetObject.translateY( velY );
        targetObject.translateZ( velZ );
    };

    // Instance methods.
    this.update = function( dt ) {
        updateRotation( dt );
        updatePosition( dt );
        updateTarget( dt );
    };

    this.setForward = function( state ) {
        forward = state;
    };

    this.setBackward = function( state ) {
        back = state;
    };

    this.setLeft = function( state ) {
        left = state;
    };

    this.setRight = function( state ) {
        right = state;
    };

    this.setUp = function( state ) {
        up = state;
    };

    this.setDown = function( state ) {
        down = state;
    };

    this.setRollLeft = function( state ) {
        rollLeft = state;
    };

    this.setRollRight = function( state ) {
        rollRight = state;
    };

    this.setRotationXY = function( x, y ) {
        if( arguments.length === 2 ) {
            mousePos.set( x, y );
        }
        else {
            mousePos.copy( x );
        }
    };

    this.setRotationX = function( x ) {
        mousePos.x = x;
    };

    this.setRotationY = function( y ) {
        mousePos.y = y;
    };
}