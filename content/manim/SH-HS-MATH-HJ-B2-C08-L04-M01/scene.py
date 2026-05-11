"""Manim scene for SH-HS-MATH-HJ-B2-C08-L04-M01."""

from math import cos, sin

from manim import *


RESOURCE_ID = "SH-HS-MATH-HJ-B2-C08-L04-M01"


class DirectedProjectionLengthScene(Scene):
    """Introduce signed projection length before the dot-product lesson."""

    def construct(self):
        self.camera.background_color = "#f7f5ee"

        ink = "#2f3437"
        axis_color = "#4c566a"
        vector_b_color = "#2f80ed"
        vector_a_color = "#d64545"
        guide_color = "#8a8f98"
        positive_color = "#2f9e44"
        zero_color = "#6f7785"
        negative_color = "#8a4fff"
        accent = "#f2b705"
        font = "PingFang SC"

        origin = LEFT * 2.25 + DOWN * 0.45
        vector_length = 2.65
        angle = ValueTracker(55 * DEGREES)

        def label(text, font_size, color=ink):
            return Text(text, font=font, font_size=font_size, color=color)

        def unit_direction():
            value = angle.get_value()
            return cos(value) * RIGHT + sin(value) * UP

        def endpoint():
            return origin + vector_length * unit_direction()

        def projection_value():
            return vector_length * cos(angle.get_value())

        def projection_point():
            return origin + projection_value() * RIGHT

        def projection_color():
            value = projection_value()
            if value > 0.08:
                return positive_color
            if value < -0.08:
                return negative_color
            return zero_color

        def directed_projection_segment():
            value = projection_value()
            color = projection_color()
            if abs(value) < 0.08:
                return VGroup(
                    Line(origin + LEFT * 0.15, origin + RIGHT * 0.15, color=color, stroke_width=5),
                    Dot(origin, radius=0.075, color=color),
                )
            return Arrow(
                origin,
                projection_point(),
                buff=0,
                color=color,
                stroke_width=6,
                max_tip_length_to_length_ratio=0.18,
            )

        title = label("投影长度为什么有正负？", 34)
        title.to_edge(UP, buff=0.32)
        subtitle = label("沿着 b 的方向读数，投影长度是有向长度", 24, axis_color)
        subtitle.next_to(title, DOWN, buff=0.16)

        axis = Arrow(
            origin + LEFT * 2.35,
            origin + RIGHT * 5.4,
            buff=0,
            color=axis_color,
            stroke_width=4,
            max_tip_length_to_length_ratio=0.05,
        )
        negative_hint = label("反方向", 21, guide_color)
        negative_hint.next_to(origin + LEFT * 2.05, DOWN, buff=0.36)
        positive_hint = label("b 的方向（正方向）", 22, vector_b_color)
        positive_hint.next_to(origin + RIGHT * 2.6, DOWN, buff=0.2)
        origin_dot = Dot(origin, radius=0.065, color=ink)
        origin_label = label("O", 22)
        origin_label.next_to(origin_dot, DOWN + LEFT, buff=0.08)

        vector_b = Arrow(
            origin,
            origin + RIGHT * 2.05,
            buff=0,
            color=vector_b_color,
            stroke_width=7,
            max_tip_length_to_length_ratio=0.14,
        )
        b_label = label("b", 28, vector_b_color)
        b_label.next_to(vector_b.get_end(), UP, buff=0.1)

        vector_a = always_redraw(
            lambda: Arrow(
                origin,
                endpoint(),
                buff=0,
                color=vector_a_color,
                stroke_width=7,
                max_tip_length_to_length_ratio=0.14,
            )
        )
        a_label = always_redraw(
            lambda: label("a", 28, vector_a_color).move_to(endpoint() + UP * 0.26 + RIGHT * 0.08)
        )
        endpoint_dot = always_redraw(lambda: Dot(endpoint(), radius=0.06, color=vector_a_color))

        perpendicular = always_redraw(
            lambda: DashedLine(
                endpoint(),
                projection_point(),
                color=guide_color,
                dash_length=0.08,
                stroke_width=3,
            )
        )
        perpendicular_label = always_redraw(
            lambda: label("垂线", 20, guide_color).move_to(
                (endpoint() + projection_point()) / 2 + RIGHT * 0.28
            )
        )
        projection_dot = always_redraw(lambda: Dot(projection_point(), radius=0.065, color=projection_color()))
        h_label = always_redraw(
            lambda: label("H", 22, projection_color()).move_to(projection_point() + DOWN * 0.32)
        )
        directed_segment = always_redraw(directed_projection_segment)

        angle_arc = always_redraw(
            lambda: Arc(
                radius=0.48,
                start_angle=0,
                angle=angle.get_value(),
                arc_center=origin,
                color=accent,
                stroke_width=4,
            )
        )
        angle_label = always_redraw(
            lambda: label("θ", 26, accent).move_to(
                origin
                + 0.78
                * (
                    cos(angle.get_value() / 2) * RIGHT
                    + sin(angle.get_value() / 2) * UP
                )
            )
        )

        construction_note = label("从 a 的终点作垂线，投影点 H 落在 b 所在直线", 24, ink)
        construction_note.next_to(subtitle, DOWN, buff=0.18)

        acute_readout = label("锐角：H 在正方向，投影长度 = |a|cosθ > 0", 27, positive_color)
        acute_readout.to_edge(DOWN, buff=0.42)
        right_readout = label("直角：H 与 O 重合，投影长度 = 0", 27, zero_color)
        right_readout.move_to(acute_readout)
        obtuse_readout = label("钝角：H 在反方向，投影长度 = |a|cosθ < 0", 27, negative_color)
        obtuse_readout.move_to(acute_readout)

        bridge = VGroup(
            label("只作衔接", 24, ink),
            label("a·b = |b| × 投影长度", 25, ink),
            label("完整定义和运算留到下一课", 21, guide_color),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.13)
        bridge.to_corner(UR, buff=0.55).shift(DOWN * 1.3)

        self.play(Write(title), FadeIn(subtitle, shift=DOWN * 0.12), run_time=2.0)
        self.play(
            Create(axis),
            FadeIn(negative_hint),
            FadeIn(positive_hint),
            FadeIn(origin_dot),
            FadeIn(origin_label),
            Create(vector_b),
            FadeIn(b_label),
            run_time=2.0,
        )
        self.play(
            Create(vector_a),
            FadeIn(a_label),
            FadeIn(endpoint_dot),
            Create(angle_arc),
            FadeIn(angle_label),
            run_time=2.0,
        )
        self.wait(1.0)

        self.play(
            Write(construction_note),
            Create(perpendicular),
            FadeIn(perpendicular_label),
            FadeIn(projection_dot),
            FadeIn(h_label),
            Create(directed_segment),
            run_time=2.0,
        )
        self.wait(1.6)

        self.play(FadeIn(acute_readout, shift=UP * 0.14), run_time=1.0)
        self.wait(2.6)

        self.play(angle.animate.set_value(90 * DEGREES), run_time=4.0, rate_func=smooth)
        self.play(Transform(acute_readout, right_readout), run_time=1.0)
        self.wait(2.4)

        self.play(angle.animate.set_value(125 * DEGREES), run_time=4.2, rate_func=smooth)
        self.play(Transform(acute_readout, obtuse_readout), run_time=1.0)
        self.wait(2.8)

        self.play(FadeOut(construction_note), FadeIn(bridge, shift=LEFT * 0.18), run_time=2.0)
        self.wait(5.2)
