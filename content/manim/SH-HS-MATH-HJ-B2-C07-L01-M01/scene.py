"""Manim scene for SH-HS-MATH-HJ-B2-C07-L01-M01.

The scene uses Manim Text labels instead of MathTex so the render pipeline does
not require a local LaTeX distribution for short classroom formula captions.
"""

from math import cos, sin

from manim import *


class SineOriginScene(Scene):
    """Show how unit-circle motion generates the graph of y = sin x."""

    def construct(self):
        self.camera.background_color = "#f7f5ee"

        theta = ValueTracker(0)

        unit_axes = Axes(
            x_range=[-1.25, 1.25, 1],
            y_range=[-1.25, 1.25, 1],
            x_length=3.0,
            y_length=3.0,
            tips=False,
            axis_config={"stroke_color": "#4c566a", "stroke_width": 2},
        ).to_edge(LEFT, buff=0.75).shift(DOWN * 0.25)

        graph_axes = Axes(
            x_range=[0, TAU, PI / 2],
            y_range=[-1.25, 1.25, 1],
            x_length=6.2,
            y_length=3.0,
            tips=False,
            axis_config={"stroke_color": "#4c566a", "stroke_width": 2},
        ).to_edge(RIGHT, buff=0.65).shift(DOWN * 0.25)

        unit_circle = ParametricFunction(
            lambda t: unit_axes.c2p(cos(t), sin(t)),
            t_range=[0, TAU],
            color="#2f80ed",
            stroke_width=4,
        )

        title = Text("Q = (x, sin x)", font_size=38, color="#2f3437")
        title.to_edge(UP, buff=0.45)

        x_label = Text("x", font_size=28, color="#2f3437").next_to(graph_axes.x_axis, RIGHT)
        y_label = Text("y", font_size=28, color="#2f3437").next_to(graph_axes.y_axis, UP)
        sine_label = Text("y = sin x", font_size=32, color="#2f80ed")
        sine_label.next_to(graph_axes, UP, buff=0.35)

        point_p = always_redraw(
            lambda: Dot(
                unit_axes.c2p(cos(theta.get_value()), sin(theta.get_value())),
                radius=0.07,
                color="#e24a4a",
            )
        )
        radius_line = always_redraw(
            lambda: Line(
                unit_axes.c2p(0, 0),
                point_p.get_center(),
                color="#e24a4a",
                stroke_width=4,
            )
        )
        height_point = always_redraw(
            lambda: Dot(
                unit_axes.c2p(0, sin(theta.get_value())),
                radius=0.055,
                color="#f2b705",
            )
        )
        height_line = always_redraw(
            lambda: DashedLine(
                point_p.get_center(),
                height_point.get_center(),
                dash_length=0.06,
                color="#f2b705",
            )
        )
        point_q = always_redraw(
            lambda: Dot(
                graph_axes.c2p(theta.get_value(), sin(theta.get_value())),
                radius=0.07,
                color="#e24a4a",
            )
        )
        transfer_line = always_redraw(
            lambda: DashedLine(
                height_point.get_center(),
                point_q.get_center(),
                dash_length=0.08,
                color="#8a6fdf",
            )
        )

        p_label = always_redraw(
            lambda: Text("P", font_size=26, color="#e24a4a").next_to(point_p, UR, buff=0.08)
        )
        q_label = always_redraw(
            lambda: Text("Q", font_size=26, color="#e24a4a").next_to(point_q, UR, buff=0.08)
        )

        sine_curve = graph_axes.plot(
            lambda x: sin(x),
            x_range=[0, TAU],
            color="#2f80ed",
            stroke_width=4,
        )
        traced_q = TracedPath(point_q.get_center, stroke_color="#2f80ed", stroke_width=4)

        key_angles = VGroup(
            *[
                Dot(graph_axes.c2p(x_value, y_value), radius=0.045, color="#2f80ed")
                for x_value, y_value in [
                    (0, 0),
                    (PI / 2, 1),
                    (PI, 0),
                    (3 * PI / 2, -1),
                    (TAU, 0),
                ]
            ]
        )

        period_hint = Text(
            "sin(x + 2pi) = sin x",
            font_size=34,
            color="#2f3437",
        ).next_to(graph_axes, DOWN, buff=0.45)

        self.play(Write(title))
        self.play(Create(unit_axes), Create(unit_circle), FadeIn(point_p), FadeIn(p_label))
        self.play(Create(radius_line))

        self.play(theta.animate.set_value(PI / 2), run_time=2.0, rate_func=smooth)
        self.wait(0.4)
        self.play(theta.animate.set_value(PI), run_time=2.0, rate_func=smooth)
        self.wait(0.4)

        self.play(FadeIn(height_point), Create(height_line))
        self.play(theta.animate.set_value(3 * PI / 2), run_time=2.0, rate_func=smooth)
        self.wait(0.4)
        self.play(theta.animate.set_value(0), run_time=1.4, rate_func=smooth)

        self.play(Create(graph_axes), FadeIn(x_label), FadeIn(y_label))
        self.play(FadeIn(point_q), FadeIn(q_label), Create(transfer_line))
        self.wait(0.8)

        self.add(traced_q)
        self.play(theta.animate.set_value(TAU), run_time=8.0, rate_func=linear)
        self.wait(0.4)
        self.play(FadeOut(traced_q), Create(sine_curve), FadeIn(key_angles), FadeIn(sine_label))
        self.wait(0.8)

        self.play(Write(period_hint))
        self.wait(1.5)
