import AnnotatorBase from '@selia/annotator';

class Annotator extends AnnotatorBase {
  getEvents() {
    this.onMouseDown = this.onMouseDown.bind(this);

    return {
      mousedown: this.onMouseDown,
      mousemove: this.onMouseMove,
    };
  }

  points = [];

  onMouseDown(event) {
    if (this.closePoligon === 2 && event.button === 0) {
      this.points = [];
    }

    this.closePoligon = event.button;

    this.closePoligon;
    this.point = this.getMouseEventPosition(event);

    if (!this.closePoligon) {
      this.points.push(this.point);
    }

    this.draw();
    this.phase = this.states.EDITING;
  }

  drawEdit() {
    this.drawBBox();
  }

  drawBBox() {
    this.ctx.beginPath();

    const color = 'yellow';
    const width = 5;
    const length = this.points.length;

    if (this.points.length >= 2) {
      this.points.slice(1, this.points.length).forEach((p, index) => {
        const preview = this.points[index];

        this.ctx.moveTo(preview.x, preview.y);
        this.ctx.lineTo(p.x, p.y);

        if (this.closePoligon) {
          const last = this.points[length - 1];
          const first = this.points[0];

          this.ctx.moveTo(last.x, last.y);
          this.ctx.lineTo(first.x, first.y);
        }
      });
    }

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;

    this.ctx.stroke();
  }

  drawAnnotation() {
    this.drawBBox();
  }
}

export default Annotator;
