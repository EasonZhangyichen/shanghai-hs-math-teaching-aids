"""Manim scene draft for SH-HS-MATH-HJ-B2-C07-L05-M01.

The scene uses Text labels instead of MathTex so preview renders do not depend
on a local LaTeX installation.
"""

from math import sin

from manim import *


class TransformOrderScene(Scene):
    """Decompose y = A sin(omega x + phi) into classroom-sized transformations."""

    def construct(self):
        self.camera.background_color = "#f7f5ee"

        ink = "#2f3437"
        guide = "#8a8f98"
        base_color = "#2f80ed"
        current_color = "#d64545"
        accent = "#8a6fdf"

        axes = Axes(
            x_range=[-PI, 2 * PI, PI / 2],
            y_range=[-2, 2, 1],
            x_length=8.4,
            y_length=3.8,
            tips=False,
            axis_config={"stroke_color": "#4c566a", "stroke_width": 2},
        ).to_edge(DOWN, buff=0.65)

        title = Text("Transform order for y = A sin(omega x + phi)", font_size=32, color=ink)
        title.to_edge(UP, buff=0.35)

        formula = Text("y = -1.5 sin(2x + pi/2)", font_size=30, color=ink)
        formula.next_to(title, DOWN, buff=0.25)

        factored = Text("2x + pi/2 = 2(x + pi/4)", font_size=28, color=accent)
        factored.next_to(formula, DOWN, buff=0.25)

        base_curve = axes.plot(
            lambda x: sin(x),
            x_range=[-PI, 2 * PI],
            color=base_color,
            stroke_width=4,
        )
        compressed_curve = axes.plot(
            lambda x: sin(2 * x),
            x_range=[-PI, 2 * PI],
            color=current_color,
            stroke_width=4,
        )
        shifted_curve = axes.plot(
            lambda x: sin(2 * x + PI / 2),
            x_range=[-PI, 2 * PI],
            color=current_color,
            stroke_width=4,
        )
        final_curve = axes.plot(
            lambda x: -1.5 * sin(2 * x + PI / 2),
            x_range=[-PI, 2 * PI],
            color=current_color,
            stroke_width=4,
        )

        base_label = Text("base: y = sin x", font_size=24, color=base_color)
        base_label.next_to(axes, UP, buff=0.2).align_to(axes, LEFT)

        step_label = Text("1. omega = 2: period 2pi -> pi", font_size=24, color=current_color)
        step_label.next_to(axes, UP, buff=0.2).align_to(axes, RIGHT)

        period_brace = BraceBetweenPoints(
            axes.c2p(-PI / 4, -1.75),
            axes.c2p(3 * PI / 4, -1.75),
            color=guide,
        )
        period_label = Text("period = pi", font_size=22, color=guide).next_to(period_brace, DOWN, buff=0.1)

        shift_arrow = Arrow(
            start=axes.c2p(0, 1.55),
            end=axes.c2p(-PI / 4, 1.55),
            buff=0,
            color=accent,
            stroke_width=5,
            max_tip_length_to_length_ratio=0.2,
        )
        shift_label = Text("left pi/4", font_size=22, color=accent).next_to(shift_arrow, UP, buff=0.1)

        amplitude_line = DashedLine(
            axes.c2p(PI / 2, 0),
            axes.c2p(PI / 2, 1.5),
            color=guide,
            dash_length=0.08,
        )
        amplitude_label = Text("amplitude = 1.5", font_size=22, color=guide).next_to(amplitude_line, RIGHT)

        readout = VGroup(
            Text("Read from graph", font_size=26, color=ink),
            Text("amplitude = 1.5", font_size=23, color=ink),
            Text("period = pi", font_size=23, color=ink),
            Text("shift = left pi/4", font_size=23, color=ink),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        readout.to_corner(UR, buff=0.55).shift(DOWN * 0.85)

        final_dots = VGroup(
            Dot(axes.c2p(-PI / 4, 0), radius=0.05, color=accent),
            Dot(axes.c2p(0, -1.5), radius=0.05, color=accent),
            Dot(axes.c2p(PI / 4, 0), radius=0.05, color=accent),
            Dot(axes.c2p(PI / 2, 1.5), radius=0.05, color=accent),
            Dot(axes.c2p(3 * PI / 4, 0), radius=0.05, color=accent),
        )

        self.play(Write(title), Write(formula))
        self.play(Create(axes), Create(base_curve), FadeIn(base_label))
        self.wait(0.5)

        self.play(Write(factored))
        self.wait(0.8)

        self.play(Transform(base_curve, compressed_curve), FadeIn(step_label))
        self.play(FadeIn(period_brace), FadeIn(period_label))
        self.wait(0.8)

        shift_step_label = Text("2. phi with omega: shift left pi/4", font_size=24, color=current_color)
        shift_step_label.move_to(step_label)
        self.play(Transform(step_label, shift_step_label), FadeIn(shift_arrow), FadeIn(shift_label))
        self.play(Transform(base_curve, shifted_curve))
        self.wait(0.8)

        amplitude_step_label = Text("3. A = -1.5: stretch and flip", font_size=24, color=current_color)
        amplitude_step_label.move_to(step_label)
        self.play(Transform(step_label, amplitude_step_label))
        self.play(Transform(base_curve, final_curve), FadeIn(amplitude_line), FadeIn(amplitude_label))
        self.play(FadeIn(final_dots))
        self.wait(0.8)

        self.play(FadeIn(readout))
        self.wait(1.5)
