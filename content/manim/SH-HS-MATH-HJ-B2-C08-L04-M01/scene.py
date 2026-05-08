"""Scene skeleton for SH-HS-MATH-HJ-B2-C08-L04-M01.

This file is intentionally a lightweight placeholder. The next resource pass
should replace the title card with the full directed-projection animation.
"""

from manim import *


class DirectedProjectionLengthScene(Scene):
    def construct(self):
        title = Text("投影有向长度导入动画", font_size=38)
        subtitle = Text("场景骨架：作垂线、读有向长度、解释符号", font_size=24)
        subtitle.next_to(title, DOWN)
        note = Text("scene_draft / metadata_ready", font_size=22).next_to(subtitle, DOWN)
        self.play(Write(title), FadeIn(subtitle, shift=DOWN))
        self.play(FadeIn(note, shift=DOWN * 0.3))
        self.wait(1)
        self.play(FadeOut(title), FadeOut(subtitle), FadeOut(note))
