const Util = require('./util.js');
const THREE = require('three');

class InputTransformer {
    constructor(domElement, camera, scene) {
        this.domElement = domElement;
        this.camera = camera;
        this.scene = scene;
        this.raycaster = new THREE.Raycaster();

        this.domElement.onclick = this.handleClick.bind(this);
        this.domElement.onmousemove = this.handleMouseMove.bind(this);
        this.domElement.onmouseleave = this.handleMouseLeave.bind(this);
        this.domElement.onmouseenter = this.handleMouseEnter.bind(this);
    }

    handleClick(e) {
        if (this.objectWithCursor && this.objectWithCursor.handleSGClick) {
            this.objectWithCursor.handleSGClick(this.lastIntersection.point);
        }
    }

    handleMouseMove(e) {
        const pos = Util.canvasMousePos(e, this.domElement);
        this.raycaster.setFromCamera(Util.getNDCMousePosition(pos, this.domElement.offsetWidth, this.domElement.offsetHeight), this.camera);

        const intersections = this.raycaster.intersectObject(this.scene, true)
                                .filter(intersection => !intersection.object.textSprite);

        const nearestIntersection = intersections[0];
        let nearestObject;

        if (nearestIntersection) {
            nearestObject = nearestIntersection.object;
            this.lastIntersection = nearestIntersection;
        }

        this.objectWithCursor = nearestObject;

        if (this.objectWithCursor !== this.lastObjectWithCursor) {
            this.objectWithCursorChanged(this.lastObjectWithCursor, this.objectWithCursor);
        } else if (this.objectWithCursor && this.objectWithCursor.handleSGMouseMoved) {
            this.objectWithCursor.handleSGMouseMoved(this.lastIntersection.point);
        }

        this.lastObjectWithCursor = this.objectWithCursor;
    }

    handleMouseLeave() {
        if (this.objectWithCursor && this.objectWithCursor.handleSGMouseLeft) {
            this.objectWithCursor.handleSGMouseLeft();
        }

        this.objectWithCursor = undefined;
    }

    handleMouseEnter() {
        if (this.objectWithCursor && this.objectWithCursor.handleSGMouseEntered) {
            this.objectWithCursor.handleSGMouseEntered();
        }
    }

    objectWithCursorChanged(previous, current) {
        if (previous && previous.handleSGMouseLeft) {
            previous.handleSGMouseLeft();
        }

        if (current && current.handleSGMouseEntered) {
            current.handleSGMouseEntered();
        }
    }
}

module.exports = InputTransformer;