"""Manim scene for SH-HS-MATH-HJ-B2-C07-L06-M01.

The scene uses Text labels instead of MathTex so preview renders do not depend
on a local LaTeX installation.
"""

from math import cos, pi, sin, tan

from manim import *


RESOURCE_ID = "SH-HS-MATH-HJ-B2-C07-L06-M01"


class TangentAsymptoteScene(Scene):
    """Explain tangent asymptotes through a terminal ray approaching the y-axis."""

    def construct(self):
        self.camera.background_color = "#f7f5ee"

        ink = "#2f3437"
        axis_color = "#4c566a"
        guide = "#8a8f98"
        ray_color = "#2f80ed"
        tangent_color = "#d64545"
        asymptote_color = "#8a6fdf"
        sin_color = "#2f9e44"
        cos_color = "#e07a2f"
        period_color = "#7b8794"

        title = Text("正切图像为什么有竖直渐近线？", font_size=34, color=ink)
        title.to_edge(UP, buff=0.32)

        formula = Text("tan x = sin x / cos x", font_size=28, color=ink)
        formula.next_to(title, DOWN, buff=0.16)

        unit_group = self._build_unit_circle(
            ink=ink,
            axis_color=axis_color,
            guide=guide,
            ray_color=ray_color,
            sin_color=sin_color,
            cos_color=cos_color,
        )
        graph_group = self._build_tangent_graph(
            ink=ink,
            axis_color=axis_color,
            guide=guide,
            tangent_color=tangent_color,
            asymptote_color=asymptote_color,
            period_color=period_color,
        )

        self.play(Write(title), Write(formula), run_time=2.0)
        self.play(FadeIn(unit_group["static"]), FadeIn(graph_group["static"]), run_time=2.5)
        self.wait(1.0)

        theta = ValueTracker(0.18)
        ray, moving_dot, cos_segment, sin_segment, graph_dot, value_label = self._dynamic_objects(
            theta=theta,
            unit=unit_group,
            graph=graph_group,
            ray_color=ray_color,
            sin_color=sin_color,
            cos_color=cos_color,
            tangent_color=tangent_color,
            ink=ink,
        )

        self.play(
            Create(ray),
            FadeIn(moving_dot),
            Create(cos_segment),
            Create(sin_segment),
            FadeIn(graph_dot),
            FadeIn(value_label),
            run_time=2.0,
        )

        shrink_note = Text("cos x 接近 0", font_size=24, color=cos_color)
        shrink_note.next_to(unit_group["circle"], DOWN, buff=0.22)

        self.play(FadeIn(shrink_note), run_time=1.0)
        self.play(theta.animate.set_value(1.31), run_time=7.0, rate_func=smooth)
        self.wait(1.0)

        climb_note = Text("正切值不断增大", font_size=24, color=tangent_color)
        climb_note.next_to(graph_group["axes"], DOWN, buff=0.16).align_to(graph_group["axes"], LEFT)
        self.play(
            FadeIn(climb_note),
            graph_group["right_asymptote"].animate.set_stroke(width=5),
            run_time=1.5,
        )
        self.wait(2.0)

        no_value_panel = VGroup(
            Text("当 x = π/2 时：", font_size=25, color=ink),
            Text("cos x = 0", font_size=25, color=cos_color),
            Text("tan x 未定义", font_size=25, color=tangent_color),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        no_value_panel.to_corner(UR, buff=0.48).shift(DOWN * 0.62)

        no_bridge = Text("图像不能跨过断点", font_size=24, color=asymptote_color)
        no_bridge.next_to(graph_group["right_asymptote"], LEFT, buff=0.18).shift(UP * 1.15)

        right_side_arrow = Arrow(
            graph_group["axes"].c2p(pi / 2 + 0.35, -0.5),
            graph_group["axes"].c2p(pi / 2 + 0.12, -3.3),
            buff=0,
            color=asymptote_color,
            stroke_width=4,
            max_tip_length_to_length_ratio=0.18,
        )
        right_side_label = Text("右侧趋向 -∞", font_size=21, color=asymptote_color)
        right_side_label.next_to(right_side_arrow, RIGHT, buff=0.06).shift(UP * 0.12)

        self.play(FadeIn(no_value_panel), FadeIn(no_bridge), run_time=2.0)
        self.play(Create(right_side_arrow), FadeIn(right_side_label), run_time=1.5)
        self.wait(2.5)

        self.play(
            FadeIn(graph_group["left_curve"]),
            FadeIn(graph_group["right_curve"]),
            FadeIn(graph_group["period_arrow"]),
            FadeIn(graph_group["period_label"]),
            run_time=2.4,
        )
        period_note = Text("tan(x + π) = tan x", font_size=26, color=period_color)
        period_note.next_to(graph_group["period_arrow"], DOWN, buff=0.12)
        self.play(Write(period_note), run_time=1.5)
        self.wait(2.5)

        rules = VGroup(
            Text("画图规则", font_size=27, color=ink),
            Text("定义域：x ≠ π/2 + kπ, k ∈ Z", font_size=21, color=ink),
            Text("渐近线：x = π/2 + kπ, k ∈ Z", font_size=21, color=ink),
            Text("周期：π", font_size=21, color=ink),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        rules.to_edge(LEFT, buff=0.85).shift(DOWN * 1.1)

        self.play(
            FadeOut(unit_group["static"]),
            FadeOut(ray),
            FadeOut(moving_dot),
            FadeOut(cos_segment),
            FadeOut(sin_segment),
            FadeOut(graph_dot),
            FadeOut(value_label),
            FadeOut(shrink_note),
            FadeOut(climb_note),
            FadeOut(no_value_panel),
            FadeOut(no_bridge),
            FadeOut(right_side_arrow),
            FadeOut(right_side_label),
            FadeIn(rules),
            run_time=2.0,
        )
        self.wait(4.0)

    def _build_unit_circle(self, *, ink, axis_color, guide, ray_color, sin_color, cos_color):
        origin = LEFT * 4.55 + DOWN * 0.68
        radius = 1.35

        x_axis = Line(origin + LEFT * 1.72, origin + RIGHT * 1.72, color=axis_color, stroke_width=2)
        y_axis = Line(origin + DOWN * 1.72, origin + UP * 1.72, color=axis_color, stroke_width=2)
        circle = Circle(radius=radius, color=axis_color, stroke_width=3).move_to(origin)
        y_axis_highlight = DashedLine(origin + DOWN * 1.65, origin + UP * 1.65, color=guide, dash_length=0.09)

        label = Text("终边斜率", font_size=25, color=ink)
        label.next_to(circle, UP, buff=0.22)

        cos_label = Text("cos x", font_size=21, color=cos_color)
        cos_label.next_to(origin + RIGHT * 0.68 + DOWN * 0.08, DOWN, buff=0.1)
        sin_label = Text("sin x", font_size=21, color=sin_color)
        sin_label.next_to(origin + RIGHT * 0.92 + UP * 0.68, RIGHT, buff=0.08)

        static = VGroup(x_axis, y_axis, circle, y_axis_highlight, label, cos_label, sin_label)
        return {
            "origin": origin,
            "radius": radius,
            "circle": circle,
            "static": static,
        }

    def _build_tangent_graph(self, *, ink, axis_color, guide, tangent_color, asymptote_color, period_color):
        axes = Axes(
            x_range=[-pi, pi, pi / 2],
            y_range=[-4, 4, 2],
            x_length=7.0,
            y_length=4.05,
            tips=False,
            axis_config={"stroke_color": axis_color, "stroke_width": 2},
        )
        axes.to_edge(RIGHT, buff=0.55).shift(DOWN * 0.68)

        label = Text("y = tan x", font_size=25, color=ink)
        label.next_to(axes, UP, buff=0.18).align_to(axes, LEFT)

        center_curve = axes.plot(lambda x: tan(x), x_range=[-1.32, 1.32], color=tangent_color, stroke_width=4)
        left_curve = axes.plot(lambda x: tan(x), x_range=[-pi + 0.25, -pi / 2 - 0.25], color=period_color, stroke_width=3)
        right_curve = axes.plot(lambda x: tan(x), x_range=[pi / 2 + 0.25, pi - 0.25], color=period_color, stroke_width=3)

        left_asymptote = DashedLine(
            axes.c2p(-pi / 2, -3.75),
            axes.c2p(-pi / 2, 3.75),
            color=asymptote_color,
            dash_length=0.1,
            stroke_width=3,
        )
        right_asymptote = DashedLine(
            axes.c2p(pi / 2, -3.75),
            axes.c2p(pi / 2, 3.75),
            color=asymptote_color,
            dash_length=0.1,
            stroke_width=3,
        )
        asymptote_label = Text("x = π/2", font_size=21, color=asymptote_color)
        asymptote_label.next_to(right_asymptote, UP, buff=0.04)

        period_arrow = DoubleArrow(
            axes.c2p(-0.72, -3.35),
            axes.c2p(-0.72 + pi, -3.35),
            buff=0,
            color=period_color,
            stroke_width=4,
            max_tip_length_to_length_ratio=0.12,
        )
        period_label = Text("π", font_size=23, color=period_color)
        period_label.next_to(period_arrow, UP, buff=0.08)

        static = VGroup(axes, label, center_curve, left_asymptote, right_asymptote, asymptote_label)
        return {
            "axes": axes,
            "center_curve": center_curve,
            "left_curve": left_curve,
            "right_curve": right_curve,
            "left_asymptote": left_asymptote,
            "right_asymptote": right_asymptote,
            "period_arrow": period_arrow,
            "period_label": period_label,
            "static": static,
        }

    def _dynamic_objects(
        self,
        *,
        theta,
        unit,
        graph,
        ray_color,
        sin_color,
        cos_color,
        tangent_color,
        ink,
    ):
        origin = unit["origin"]
        radius = unit["radius"]
        axes = graph["axes"]

        def point_on_circle():
            angle = theta.get_value()
            return origin + radius * (cos(angle) * RIGHT + sin(angle) * UP)

        def graph_point():
            angle = theta.get_value()
            return axes.c2p(angle, tan(angle))

        ray = always_redraw(lambda: Line(origin, point_on_circle(), color=ray_color, stroke_width=5))
        moving_dot = always_redraw(lambda: Dot(point_on_circle(), radius=0.065, color=ray_color))
        cos_segment = always_redraw(
            lambda: Line(
                origin,
                origin + radius * cos(theta.get_value()) * RIGHT,
                color=cos_color,
                stroke_width=5,
            )
        )
        sin_segment = always_redraw(
            lambda: Line(
                origin + radius * cos(theta.get_value()) * RIGHT,
                point_on_circle(),
                color=sin_color,
                stroke_width=5,
            )
        )
        graph_dot = always_redraw(lambda: Dot(graph_point(), radius=0.06, color=tangent_color))

        def make_value_label():
            angle = theta.get_value()
            label = Text(f"tan x ≈ {tan(angle):.2f}", font_size=22, color=ink)
            label.move_to(axes.c2p(0.18, 3.28))
            return label

        value_label = always_redraw(make_value_label)
        return ray, moving_dot, cos_segment, sin_segment, graph_dot, value_label
