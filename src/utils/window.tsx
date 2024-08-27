import { Circle, Icon, Layout, LayoutProps, Rect, RectProps, signal, Txt } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal } from "@motion-canvas/core";
import { defaultColorScheme as colors } from "./colorscheme";

export interface WindowProps extends RectProps {
  title: SignalValue<string>;
  icon: SignalValue<string>;
  viewportProps: LayoutProps;
}

export class Window extends Rect {
  @signal()
  public declare readonly title: SimpleSignal<string, this>;

  @signal()
  public declare readonly icon: SimpleSignal<string, this>;

  public constructor(props?: WindowProps) {
    super({
      fill: colors.backgroundAlt,
      padding: 50,
      radius: 20,
      gap: 40,
      ...props,
      direction: "column",
      layout: true,
    });

    this.add(
      <>
        <Layout
          layout
          gap={50}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Layout gap={12} alignItems={"center"}>
            <Icon
              icon={this.icon} 
              color={colors.foreground}
              size={48}
            />
            <Txt
              text={this.title}
              fill={colors.foreground}
              fontSize={48}
              fontFamily={"Source Code Pro"}
            />
          </Layout>
          <Layout gap={12} alignItems={"center"}>
            <Circle size={42} fill={colors.green} />
            <Circle size={42} fill={colors.yellow} />
            <Circle size={42} fill={colors.red} />
          </Layout>
        </Layout>

        <Layout clip grow={1}>
          <Layout {...props.viewportProps}>
            {props.children}
          </Layout>
        </Layout>
      </>
    );
  }
}
