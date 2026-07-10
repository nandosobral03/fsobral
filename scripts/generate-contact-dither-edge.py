from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "images" / "impression-sunrise-dither.png"
OUTPUT = ROOT / "public" / "images" / "impression-sunrise-edge-dissolve.png"

BAYER_8 = (
    (0, 48, 12, 60, 3, 51, 15, 63),
    (32, 16, 44, 28, 35, 19, 47, 31),
    (8, 56, 4, 52, 11, 59, 7, 55),
    (40, 24, 36, 20, 43, 27, 39, 23),
    (2, 50, 14, 62, 1, 49, 13, 61),
    (34, 18, 46, 30, 33, 17, 45, 29),
    (10, 58, 6, 54, 9, 57, 5, 53),
    (42, 26, 38, 22, 41, 25, 37, 21),
)


def main() -> None:
    image = Image.open(SOURCE).convert("RGBA")
    width, height = image.size
    pixels = image.load()
    horizontal_decay = width * 0.075
    vertical_decay = height * 0.12

    for y in range(height):
        for x in range(width):
            edge_coverage = min(
                x / horizontal_decay,
                (width - 1 - x) / horizontal_decay,
                y / vertical_decay,
                (height - 1 - y) / vertical_decay,
                1,
            )
            threshold = (BAYER_8[y % 8][x % 8] + 0.5) / 64
            red, green, blue, _ = pixels[x, y]
            pixels[x, y] = (
                red,
                green,
                blue,
                255 if edge_coverage >= threshold else 0,
            )

    image.save(OUTPUT, optimize=True)


if __name__ == "__main__":
    main()
