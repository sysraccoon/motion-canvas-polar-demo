import { parser } from '@lezer/javascript';
import { CODE, Code, Layout, LezerHighlighter, lines, makeScene2D } from '@motion-canvas/2d';
import { createRef, DEFAULT, easeInOutBack, easeInOutSine, tween, Vector2, waitFor } from '@motion-canvas/core';
import { defaultColorScheme as colors } from '../utils/colorscheme';
import { Window } from '../utils/window';

const typescriptHighlighter = new LezerHighlighter(
  parser.configure({
    dialect: 'jsx ts',
  }),
  colors.codeStyle,
);

export default makeScene2D(function* (view) {
  const code = createRef<Code>();
  const codeWindowRoot = createRef<Window>();
  const polarToCartesianBody = Code.createSignal(``);
  const codeText = CODE`\
function polarToCartesian(radius: number, theta: number) {
${polarToCartesianBody}
}`;

  view.add(
    <Window
      ref={codeWindowRoot}
      title={"polar.ts"}
      icon={"tabler:brand-typescript"} 
      viewportProps={{
        layout: true,
      }}
    >
      <Code
        ref={code}
        highlighter={typescriptHighlighter}
        code={codeText}
        fontFamily={"Source Code Pro"}
      />
    </Window>
  );

  yield* myCoolSpawnAnimation(codeWindowRoot());
  yield* waitFor(0.8);
  yield* polarToCartesianBody(`\
  return new Vector2(
    radius * Math.cos(theta * Math.PI/180),
    radius * Math.sin(theta * Math.PI/180),
  );`, 0.5);
  yield* waitFor(0.8);
  yield* code().selection(code().findFirstRange(/function polarToCartesian.*\)/g), 0.5);
  yield* waitFor(0.8);
  yield* code().selection(lines(1, 4), 0.5);
  yield* waitFor(0.8);
  yield* code().selection(DEFAULT, 0.5);
  yield* waitFor(0.8);
});


function* myCoolSpawnAnimation(obj: Layout, duration: number = 0.5) {
  const x = obj.x();
  const scale = obj.scale();
  const opacity = obj.opacity();

  yield* tween(duration, (progress) => {
    obj.x(easeInOutSine(progress, x-150, x));
    obj.scale(Vector2.lerp(scale.scale(0.8), scale, easeInOutBack(progress)));
    obj.opacity(easeInOutSine(progress, 0, opacity));
  });
}

