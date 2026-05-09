"""Manim scene for SH-HS-MATH-HJ-B2-C07-L05-M01.

The scene uses Text labels instead of MathTex so preview renders do not depend
on a local LaTeX installation.
"""

from math import sin

from manim import *


class TransformOrderScene(Scene):
    """Decompose y = A sin(ωx + φ) into classroom-sized transformations."""

    def construct(self):
        self.camera.background_color = "#f7f5ee"

        ink = "#2f3437"
        guide = "#8a8f98"
        base_color = "#2f80ed"
        current_color = "#d64545"
        accent = "#8a6fdf"
        font = "PingFang SC"

        def label(text, font_size, color):
            return Text(text, font=font, font_size=font_size, color=color)

        axes = Axes(
            x_range=[-PI, 2 * PI, PI / 2],
            y_range=[-2, 2, 1],
            x_length=8.4,
            y_length=3.8,
            tips=False,
            axis_config={"stroke_color": "#4c566a", "stroke_width": 2},
        ).to_edge(DOWN, buff=0.65)

        title = label("图像变换顺序：y = A sin(ωx + φ)", 32, ink)
        title.to_edge(UP, buff=0.35)

        formula = label("y = -1.5 sin(2x + π/2)", 30, ink)
        formula.next_to(title, DOWN, buff=0.25)

        factored = label("y = -1.5 sin(2(x + π/4))", 28, accent)
        factored.next_to(formula, DOWN, buff=0.25)

        shift_rule = label("平移量 -φ/ω = -π/4，所以向左平移 π/4", 24, accent)
        shift_rule.next_to(factored, DOWN, buff=0.16)

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

        base_label = label("基准：y = sin x", 24, base_color)
        base_label.next_to(axes, UP, buff=0.2).align_to(axes, LEFT)

        step_label = label("1. ω = 2：周期 2π → π", 24, current_color)
        step_label.next_to(axes, UP, buff=0.2).align_to(axes, RIGHT)

        period_brace = BraceBetweenPoints(
            axes.c2p(-PI / 4, -1.75),
            axes.c2p(3 * PI / 4, -1.75),
            color=guide,
        )
        period_label = label("周期 = π", 22, guide).next_to(period_brace, DOWN, buff=0.1)

        shift_arrow = Arrow(
            start=axes.c2p(0, 1.55),
            end=axes.c2p(-PI / 4, 1.55),
            buff=0,
            color=accent,
            stroke_width=5,
            max_tip_length_to_length_ratio=0.2,
        )
        shift_label = label("左移 π/4", 22, accent).next_to(shift_arrow, UP, buff=0.1)

        amplitude_line = DashedLine(
            axes.c2p(PI / 2, 0),
            axes.c2p(PI / 2, 1.5),
            color=guide,
            dash_length=0.08,
        )
        amplitude_label = label("振幅 |A| = 1.5", 22, guide).next_to(amplitude_line, RIGHT)

        readout = VGroup(
            label("图像读数", 26, ink),
            label("振幅 |A| = 1.5", 23, ink),
            label("周期 2π/|ω| = π", 23, ink),
            label("平移 -φ/ω = -π/4", 23, ink),
            label("即向左 π/4", 23, ink),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        readout.to_corner(UR, buff=0.55).shift(DOWN * 0.95)

        final_dots = VGroup(
            Dot(axes.c2p(-PI / 4, 0), radius=0.05, color=accent),
            Dot(axes.c2p(0, -1.5), radius=0.05, color=accent),
            Dot(axes.c2p(PI / 4, 0), radius=0.05, color=accent),
            Dot(axes.c2p(PI / 2, 1.5), radius=0.05, color=accent),
            Dot(axes.c2p(3 * PI / 4, 0), radius=0.05, color=accent),
        )

        self.play(Write(title), Write(formula), run_time=2.0)
        self.play(Create(axes), Create(base_curve), FadeIn(base_label), run_time=3.0)
        self.wait(2.0)

        self.play(Write(factored), Write(shift_rule), run_time=2.5)
        self.wait(4.0)

        self.play(Transform(base_curve, compressed_curve), FadeIn(step_label), FadeOut(base_label), run_time=4.0)
        self.play(FadeIn(period_brace), FadeIn(period_label), run_time=2.0)
        self.wait(4.0)

        shift_step_label = label("2. φ 与 ω 共同决定：左移 π/4", 24, current_color)
        shift_step_label.move_to(step_label)
        self.play(Transform(step_label, shift_step_label), FadeIn(shift_arrow), FadeIn(shift_label), run_time=3.0)
        self.play(Transform(base_curve, shifted_curve), run_time=4.0)
        self.wait(4.0)

        amplitude_step_label = label("3. A = -1.5：纵向放大并关于 x 轴翻折", 24, current_color)
        amplitude_step_label.move_to(step_label)
        self.play(Transform(step_label, amplitude_step_label), run_time=2.5)
        self.play(Transform(base_curve, final_curve), FadeIn(amplitude_line), FadeIn(amplitude_label), run_time=4.0)
        self.play(FadeIn(final_dots), run_time=1.5)
        self.wait(4.0)

        self.play(FadeOut(step_label), run_time=0.5)
        self.play(FadeIn(readout), run_time=2.0)
        self.wait(5.0)
