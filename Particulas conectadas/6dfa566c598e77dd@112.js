// https://observablehq.com/@mbostock/voronoi-particles@112
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Voronoi Particles

Some particles on a random walk, with their Voronoi diagram.`
)});
  main.variable(observer("canvas")).define("canvas", ["DOM","width","height","voronoi","n","positions","velocities","margin"], function*(DOM,width,height,voronoi,n,positions,velocities,margin)
{
  const context = DOM.context2d(width, height);
  context.strokeStyle = "red";
  while (true) {
    context.save();
    context.clearRect(0, 0, width, height);
    context.beginPath();
    voronoi.delaunay.renderPoints(context);
    context.fill();
    context.beginPath();
    voronoi.render(context);
    context.stroke();
    yield context.canvas;
    for (let i = 0; i < n; ++i) {
      const x = i << 1;
      const y = x + 1;
      positions[x] += velocities[x];
      positions[y] += velocities[y];
      if (positions[x] < -margin) positions[x] += width + margin * 2;
      else if (positions[x] > width + margin) positions[x] -= width + margin * 2;
      if (positions[y] < -margin) positions[y] += height + margin * 2;
      else if (positions[y] > height + margin) positions[y] -= height + margin * 2;
      velocities[x] += 0.2 * (Math.random() - 0.5) - 0.01 * velocities[x];
      velocities[y] += 0.2 * (Math.random() - 0.5) - 0.01 * velocities[y];
    }
    voronoi.update();
  }
}
);
  main.variable(observer("positions")).define("positions", ["n","height","width"], function(n,height,width){return(
Float64Array.from({length: n * 2}, (_, i) => Math.random() * (i & 1 ? height : width))
)});
  main.variable(observer("velocities")).define("velocities", ["n"], function(n){return(
new Float64Array(n * 2)
)});
  main.variable(observer("voronoi")).define("voronoi", ["d3","positions","width","height"], function(d3,positions,width,height){return(
new d3.Delaunay(positions).voronoi([0, 0, width, height])
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("margin")).define("margin", function(){return(
60
)});
  main.variable(observer("n")).define("n", function(){return(
200
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3-delaunay@^5.1")
)});
  return main;
}
