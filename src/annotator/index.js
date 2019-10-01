import AnnotatorBase from '@selia/annotator';

class Annotator extends AnnotatorBase {
  getEvents() {
    this.onMouseDown = this.onMouseDown.bind(this);

    return {
      mousedown: this.onMouseDown,
      mousemove: this.onMouseMove,
    };
  }

  // Arreglo para guardar puntos necesarios para la creacion del poligono
  points = [];

  /**
   * Funcion que se encarga de escuchar el evento del mouse down
   * es aqui donde se van guardando los puntos en el arreglo.
   */
  onMouseDown(event) {
    // Si la bandera de closePoligon ya estaba activa y el click que se detecto
    // es el boton izquierdo, procedemos a reinicar el arreglo.
    if (this.closePoligon === 2 && event.button === 0) {
      this.points = [];
    }

    // bandera de controll para cerrar poligono
    this.closePoligon = event.button;

    this.point = this.getMouseEventPosition(event);

    if (!this.closePoligon) {
      this.points.push(this.point);
    }

    this.draw();
    this.phase = this.states.EDITING;
  }

  drawEdit() {
    this.drawPoligon();
  }

  /**
   * Funcion que se encarda que pintar las lineas que generan
   * al poligono.
   */
  drawPoligon() {
    this.ctx.beginPath();

    const color = 'yellow';
    const width = 5;
    const length = this.points.length;

    // Solo se crean lineas si hay por no menos 2 puntos
    if (this.points.length >= 2) {
      this.points.slice(1, this.points.length).forEach((p, index) => {
        const preview = this.points[index];

        this.ctx.moveTo(preview.x, preview.y);
        this.ctx.lineTo(p.x, p.y);

        // Si se detecta que click es boton derecho, procedemos a
        // cerrar el poligono.
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
    this.drawPoligon();
  }
}

export default Annotator;
