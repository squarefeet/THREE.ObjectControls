var stats, physijsStats, scene, renderer, skybox;

Physijs.scripts.worker = 'js/vendor/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

function initBasics() {
    scene = new Physijs.Scene();
    scene.setGravity(new THREE.Vector3( 0, 0, 0 ));
    scene.addEventListener( 'update', function() {
        // applyForce();
        physijsStats.update();
        camera.update();
        controls.update( 0.016 );
        scene.simulate( undefined, 1 );
    });

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0';
    document.body.appendChild( stats.domElement );

    physijsStats = new Stats();
    physijsStats.domElement.style.position = 'absolute';
    physijsStats.domElement.style.top = '50px';
    document.body.appendChild( physijsStats.domElement );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

function addLights() {
    var light = new THREE.DirectionalLight( 0xffffff, 5 );
    light.position.set( 0, 100, 0 );
    scene.add( light );

    light = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light.position.set( 0, -100, 50 );
    scene.add( light );
}

function addSkybox( pos ) {
    var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture( 'img/universe.jpg' ),
        side: THREE.BackSide
    });

    var geometry = new THREE.SphereGeometry( 1000, 32, 32 );
    skybox = new THREE.Mesh( geometry, material );

    // if( pos ) skybox.position = pos;

    scene.add( skybox );
}


function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

    if( typeof onRender === 'function' ) {
        onRender();
    }
}