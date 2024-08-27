import { Circle, Grid, Latex, Layout, Line, makeScene2D, ShapeProps, TxtProps } from '@motion-canvas/2d';
import { createRef, createSignal, Direction, easeInOutSine, slideTransition, Vector2 } from '@motion-canvas/core';
import { defaultColorScheme as colors } from '../utils/colorscheme';
import { Window } from '../utils/window';

export default makeScene2D(function* (view) {
  const theta = createSignal<number>(0);
  const radius = createSignal<number>(200);
  const cartesianPosition = Vector2.createSignal(() => polarToCartesian(radius(), theta()));

  const strokeStyle: ShapeProps = {
    lineWidth: 12,
    lineCap: "round",
  };

  const labelStyle: TxtProps = {
    fontSize: 32,
    fill: colors.foreground,
  };

  const demoWindow = createRef<Window>();
  const backgroundSpiral = createRef<Circle>();
  const activeCircle = createRef<Circle>();
  const grid = createRef<Grid>();
  view.add(
    <Window
      ref={demoWindow}
      title={"polar coordinates demo"}
      icon={"tabler:math-function"}
      size={[1200, 1300]}
      viewportProps={{
        layout: false,
      }}
    >
      <Grid
        ref={grid}
        size={"100%"}
        stroke={colors.foregroundAlt}
        spacing={100}
      />
      <Circle
        ref={backgroundSpiral}
        {...strokeStyle}
        stroke={colors.foreground}
        size={() => radius()*2}
      />
      <Circle
        endAngle={() => theta()}
        {...strokeStyle}
        stroke={colors.green}
        size={() => radius()*2}
      />
      <Line
        {...strokeStyle}
        stroke={colors.green}
        points={[
          Vector2.zero,
          cartesianPosition,
        ]}
      />
      <Circle
        ref={activeCircle}
        position={cartesianPosition}
        size={42}
        {...strokeStyle}
        fill={colors.green}
        stroke={colors.backgroundAlt}
      />
      <Latex
        {...labelStyle}
        tex={() => `r=${radius().toFixed(1)}`}
        offset={() => cartesianPosition().normalized.mul(-1)}
        position={() => polarToCartesian(radius() + 40, theta())}
      />
      <Latex
        {...labelStyle}
        tex={() => `\\theta=${theta().toFixed(1)}`}
        offset={() => cartesianPosition().normalized}
        position={() => polarToCartesian(20, theta()-180)}
      />
      <Latex
        {...labelStyle}
        tex={() => `(x,y) = [${cartesianPosition().x.toFixed(1)}, ${cartesianPosition().y.toFixed(1)}]`}
        position={() => backgroundSpiral().bottom().addY(150)}
      />
    </Window>
  );
  radius(() => theta()/3+0.1*Math.sin(4 * theta() / 180 * Math.PI) + 250);

  yield* slideTransition(Direction.Right, 0.6);

  yield* theta(360, 3, easeInOutSine);
  yield* theta(0, 3, easeInOutSine);
});


function polarToCartesian(radius: number, theta: number) {
  return new Vector2(
    radius * Math.cos(theta * Math.PI/180),
    radius * Math.sin(theta * Math.PI/180),
  );
}

