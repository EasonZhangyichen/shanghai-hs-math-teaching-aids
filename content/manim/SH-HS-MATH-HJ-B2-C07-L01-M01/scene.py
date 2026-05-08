"""Manim scene for SH-HS-MATH-HJ-B2-C07-L01-M01.

The scene uses Manim Text labels instead of MathTex so classroom previews do
not depend on a local LaTeX installation.
"""

from math import cos, sin

from manim import *


RESOURCE_ID = "SH-HS-MATH-HJ-B2-C07-L01-M01"


class SineOriginScene(Scene):
    """Show how unit-circle motion generates the graph of y = sin x."""

    def construct(self):
        self.camera.background_color = "#f7f5ee"

        ink = "#2f3437"
        axis_color = "#4c566a"
        circle_color = "#2f80ed"
        point_color = "#d64545"
        height_color = "#f2b705"
        guide_color = "#8a6fdf"
        rule_color = "#5f6673"

        theta = ValueTracker(0)

        title = Text("从单位圆到 y = sin x", font_size=34, color=ink)
        title.to_edge(UP, buff=0.3)
        subtitle = Text("P 的纵坐标生成函数值，Q = (x, sin x)", font_size=24, color=rule_color)
        subtitle.next_to(title, DOWN, buff=0.14)

        unit = self._build_unit_circle(
            axis_color=axis_color,
            circle_color=circle_color,
            ink=ink,
        )
        graph = self._build_sine_graph(
            axis_color=axis_color,
            circle_color=circle_color,
            ink=ink,
        )

        dynamics = self._dynamic_objects(
            theta=theta,
            unit=unit,
            graph=graph,
            point_color=point_color,
            height_color=height_color,
            guide_color=guide_color,
            ink=ink,
        )

        rule_panel = self._build_rule_panel(ink=ink, rule_color=rule_color)
        period_hint = Text("一周后终边重合：sin(x + 2π) = sin x", font_size=25, color=ink)
        period_hint.next_to(graph["axes"], DOWN, buff=0.5)

        self.play(Write(title), run_time=1.3)
        self.play(FadeIn(unit["static"]), run_time=1.6)
        self.play(
            Create(dynamics["radius_line"]),
            FadeIn(dynamics["point_p"]),
            FadeIn(dynamics["p_label"]),
            Create(dynamics["angle_arc"]),
            FadeIn(dynamics["angle_label"]),
            run_time=1.6,
        )
        self.play(FadeIn(dynamics["p_formula"]), run_time=1.0)
        self.wait(0.8)

        self.play(theta.animate.set_value(PI / 2), run_time=2.4, rate_func=smooth)
        self.wait(0.6)
        self.play(theta.animate.set_value(PI), run_time=2.2, rate_func=smooth)
        self.wait(0.6)

        self.play(
            Create(dynamics["height_segment"]),
            Create(dynamics["height_line"]),
            FadeIn(dynamics["height_point"]),
            FadeIn(dynamics["height_label"]),
            run_time=1.5,
        )
        self.play(theta.animate.set_value(3 * PI / 2), run_time=2.6, rate_func=smooth)
        self.wait(0.6)
        self.play(theta.animate.set_value(0), run_time=1.5, rate_func=smooth)

        self.play(
            Create(graph["axes"]),
            FadeIn(graph["axis_labels"]),
            FadeIn(graph["graph_title"]),
            FadeIn(graph["key_markers"][0]),
            FadeIn(subtitle),
            FadeIn(rule_panel),
            run_time=2.0,
        )
        self.play(
            FadeIn(dynamics["point_q"]),
            FadeIn(dynamics["q_label"]),
            Create(dynamics["transfer_line"]),
            run_time=1.3,
        )
        self.wait(1.8)

        self.add(dynamics["traced_q"])
        for x_value, marker in zip(
            [PI / 2, PI, 3 * PI / 2, TAU],
            graph["key_markers"][1:],
        ):
            self.play(theta.animate.set_value(x_value), run_time=2.4, rate_func=linear)
            self.play(FadeIn(marker), run_time=0.45)
            self.wait(0.45)

        self.play(
            FadeOut(dynamics["traced_q"]),
            Create(graph["sine_curve"]),
            FadeIn(graph["sine_label"]),
            run_time=1.3,
        )
        self.wait(0.8)

        self.play(Write(period_hint), run_time=1.3)
        self.play(
            dynamics["radius_line"].animate.set_stroke(width=7),
            graph["sine_curve"].animate.set_stroke(width=6),
            run_time=1.0,
        )
        self.wait(2.5)

    def _build_unit_circle(self, *, axis_color, circle_color, ink):
        axes = Axes(
            x_range=[-1.25, 1.25, 1],
            y_range=[-1.25, 1.25, 1],
            x_length=3.05,
            y_length=3.05,
            tips=False,
            axis_config={"stroke_color": axis_color, "stroke_width": 2},
        )
        axes.to_edge(LEFT, buff=0.72).shift(DOWN * 0.52)

        circle = ParametricFunction(
            lambda t: axes.c2p(cos(t), sin(t)),
            t_range=[0, TAU],
            color=circle_color,
            stroke_width=4,
        )
        label = Text("单位圆", font_size=24, color=ink)
        label.next_to(circle, UP, buff=0.22)

        x_label = Text("1", font_size=18, color=axis_color)
        x_label.next_to(axes.c2p(1, 0), DOWN, buff=0.08)
        y_label = Text("1", font_size=18, color=axis_color)
        y_label.next_to(axes.c2p(0, 1), LEFT, buff=0.08)
        minus_y_label = Text("-1", font_size=18, color=axis_color)
        minus_y_label.next_to(axes.c2p(0, -1), LEFT, buff=0.08)

        static = VGroup(axes, circle, label, x_label, y_label, minus_y_label)
        return {
            "axes": axes,
            "circle": circle,
            "static": static,
        }

    def _build_sine_graph(self, *, axis_color, circle_color, ink):
        axes = Axes(
            x_range=[0, TAU, PI / 2],
            y_range=[-1.25, 1.25, 1],
            x_length=6.25,
            y_length=3.05,
            tips=False,
            axis_config={"stroke_color": axis_color, "stroke_width": 2},
        )
        axes.to_edge(RIGHT, buff=0.58).shift(DOWN * 0.52)

        axis_labels = VGroup()
        for x_value, label_text in [
            (0, "0"),
            (PI / 2, "π/2"),
            (PI, "π"),
            (3 * PI / 2, "3π/2"),
            (TAU, "2π"),
        ]:
            label = Text(label_text, font_size=18, color=axis_color)
            label.next_to(axes.c2p(x_value, 0), DOWN, buff=0.11)
            axis_labels.add(label)

        for y_value, label_text in [(1, "1"), (-1, "-1")]:
            label = Text(label_text, font_size=18, color=axis_color)
            label.next_to(axes.c2p(0, y_value), LEFT, buff=0.08)
            axis_labels.add(label)

        x_label = Text("x", font_size=24, color=ink)
        x_label.next_to(axes.x_axis, RIGHT, buff=0.08)
        y_label = Text("y", font_size=24, color=ink)
        y_label.next_to(axes.y_axis, UP, buff=0.08)
        axis_labels.add(x_label, y_label)

        graph_title = Text("函数图像", font_size=24, color=ink)
        graph_title.next_to(axes, UP, buff=0.34).shift(RIGHT * 1.08)

        sine_curve = axes.plot(lambda x: sin(x), x_range=[0, TAU], color=circle_color, stroke_width=4)
        sine_label = Text("y = sin x", font_size=28, color=circle_color)
        sine_label.next_to(sine_curve, UP, buff=0.16).shift(RIGHT * 0.8)

        key_markers = VGroup()
        for x_value, y_value, label_text, direction in [
            (PI / 2, 1, "(π/2, 1)", UP),
            (PI, 0, "(π, 0)", UP),
            (3 * PI / 2, -1, "(3π/2, -1)", DOWN),
            (TAU, 0, "(2π, 0)", UP),
        ]:
            dot = Dot(axes.c2p(x_value, y_value), radius=0.045, color=circle_color)
            label = Text(label_text, font_size=18, color=ink)
            label.next_to(dot, direction, buff=0.09)
            if x_value == TAU:
                label.shift(LEFT * 0.9 + UP * 0.14)
            key_markers.add(VGroup(dot, label))

        origin_marker = VGroup(
            Dot(axes.c2p(0, 0), radius=0.045, color=circle_color),
            Text("(0, 0)", font_size=18, color=ink).next_to(axes.c2p(0, 0), UP, buff=0.09).shift(RIGHT * 0.25),
        )
        key_markers.insert(0, origin_marker)

        return {
            "axes": axes,
            "axis_labels": axis_labels,
            "graph_title": graph_title,
            "sine_curve": sine_curve,
            "sine_label": sine_label,
            "key_markers": key_markers,
        }

    def _dynamic_objects(
        self,
        *,
        theta,
        unit,
        graph,
        point_color,
        height_color,
        guide_color,
        ink,
    ):
        unit_axes = unit["axes"]
        graph_axes = graph["axes"]

        def angle_value():
            return theta.get_value()

        def point_p_pos():
            value = angle_value()
            return unit_axes.c2p(cos(value), sin(value))

        def height_pos():
            return unit_axes.c2p(0, sin(angle_value()))

        def point_q_pos():
            value = angle_value()
            return graph_axes.c2p(value, sin(value))

        point_p = always_redraw(lambda: Dot(point_p_pos(), radius=0.066, color=point_color))
        radius_line = always_redraw(
            lambda: Line(unit_axes.c2p(0, 0), point_p_pos(), color=point_color, stroke_width=4)
        )
        angle_arc = always_redraw(
            lambda: Arc(
                radius=0.36,
                start_angle=0,
                angle=max(angle_value(), 0.001),
                arc_center=unit_axes.c2p(0, 0),
                color=guide_color,
                stroke_width=4,
            )
        )
        angle_label = always_redraw(
            lambda: Text("x", font_size=22, color=guide_color).move_to(
                unit_axes.c2p(
                    0.46 * cos(max(angle_value(), 0.12) / 2),
                    0.46 * sin(max(angle_value(), 0.12) / 2),
                )
            )
        )
        p_label = always_redraw(lambda: Text("P", font_size=24, color=point_color).next_to(point_p, UR, buff=0.08))
        p_formula = Text("P = (cos x, sin x)", font_size=23, color=ink)
        p_formula.next_to(unit["circle"], DOWN, buff=0.24)

        height_point = always_redraw(lambda: Dot(height_pos(), radius=0.052, color=height_color))
        height_segment = always_redraw(
            lambda: Line(unit_axes.c2p(0, 0), height_pos(), color=height_color, stroke_width=6)
        )
        height_line = always_redraw(
            lambda: DashedLine(point_p_pos(), height_pos(), dash_length=0.07, color=height_color, stroke_width=3)
        )
        height_label = always_redraw(
            lambda: Text("sin x", font_size=22, color=height_color).next_to(height_point, LEFT, buff=0.1)
        )

        point_q = always_redraw(lambda: Dot(point_q_pos(), radius=0.066, color=point_color))

        def make_q_label():
            direction = UP if sin(angle_value()) >= -0.05 else DOWN
            label = Text("Q", font_size=24, color=point_color).next_to(point_q, direction, buff=0.08)
            if angle_value() > TAU - 0.2:
                label.shift(LEFT * 0.18)
            return label

        q_label = always_redraw(make_q_label)
        transfer_line = always_redraw(
            lambda: DashedLine(height_pos(), point_q_pos(), dash_length=0.08, color=guide_color, stroke_width=3)
        )
        traced_q = TracedPath(point_q.get_center, stroke_color="#2f80ed", stroke_width=4)

        return {
            "point_p": point_p,
            "radius_line": radius_line,
            "angle_arc": angle_arc,
            "angle_label": angle_label,
            "p_label": p_label,
            "p_formula": p_formula,
            "height_point": height_point,
            "height_segment": height_segment,
            "height_line": height_line,
            "height_label": height_label,
            "point_q": point_q,
            "q_label": q_label,
            "transfer_line": transfer_line,
            "traced_q": traced_q,
        }

    def _build_rule_panel(self, *, ink, rule_color):
        rules = VGroup(
            Text("画图规则", font_size=24, color=ink),
            Text("输入：角 x 的弧度量", font_size=20, color=rule_color),
            Text("输出：P 的纵坐标 sin x", font_size=20, color=rule_color),
            Text("图像点：Q = (x, sin x)", font_size=20, color=rule_color),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        box = RoundedRectangle(
            corner_radius=0.08,
            width=rules.width + 0.42,
            height=rules.height + 0.35,
            color="#d5d1c8",
            stroke_width=1.5,
            fill_color="#fffdf7",
            fill_opacity=0.92,
        )
        panel = VGroup(box, rules)
        panel.to_corner(UL, buff=0.42).shift(DOWN * 0.5)
        return panel
