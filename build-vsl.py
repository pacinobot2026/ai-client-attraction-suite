"""
VSL Video Builder for AI Client Attraction Suite
- Dark background, white text (green for emphasis)
- Auto-fit font sizes based on word count
- Word-level timestamp sync
- Punchy pacing
"""

import json
import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

# Config
WIDTH = 1920
HEIGHT = 1080
BG_COLOR = (10, 10, 10)  # Near black
TEXT_COLOR = (255, 255, 255)  # White
EMPHASIS_COLOR = (34, 197, 94)  # Green (#22c55e)
OUTPUT_DIR = "slides"
AUDIO_PATH = "vsl-audio.mp3"
JSON_PATH = "whisper-output.json"

# Emphasis words/phrases to highlight in green
EMPHASIS_WORDS = {
    'ai', 'coaching', 'coaches', 'clients', 'leads', 'content', 'autopilot',
    '$997', '997', 'nine ninety-seven', 'guarantee', '30 days', '30-day',
    'free', 'bonus', 'bonuses', 'discovery call', 'email', 'emails',
    'module', 'system', 'suite', 'attraction', 'automated', 'automation'
}

def get_font(size):
    font_paths = [
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/calibri.ttf",
    ]
    for path in font_paths:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def get_font_size(word_count):
    if word_count <= 4:
        return 120
    elif word_count <= 8:
        return 90
    elif word_count <= 14:
        return 65
    else:
        return 50

def should_emphasize(word):
    clean = word.lower().strip('.,!?')
    return clean in EMPHASIS_WORDS or any(e in clean for e in ['$', '%', 'ai'])

def create_slide(text, slide_num, word_count):
    img = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    font_size = get_font_size(word_count)
    font = get_font(font_size)
    
    text = text.strip()
    words = text.split()
    
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    max_width = WIDTH - 200
    while text_width > max_width and font_size > 30:
        font_size -= 5
        font = get_font(font_size)
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    
    x = (WIDTH - text_width) // 2
    y = (HEIGHT - text_height) // 2
    
    has_emphasis = any(should_emphasize(w) for w in words)
    
    if has_emphasis and len(words) > 1:
        current_x = x
        for word in words:
            color = EMPHASIS_COLOR if should_emphasize(word) else TEXT_COLOR
            draw.text((current_x, y), word + " ", font=font, fill=color)
            word_bbox = draw.textbbox((0, 0), word + " ", font=font)
            current_x += word_bbox[2] - word_bbox[0]
    else:
        color = EMPHASIS_COLOR if has_emphasis else TEXT_COLOR
        draw.text((x, y), text, font=font, fill=color)
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filepath = os.path.join(OUTPUT_DIR, f"slide_{slide_num:04d}.png")
    img.save(filepath, "PNG")
    return filepath

def split_into_segments(words_data, target_words=6):
    """Split word-level data into slide segments"""
    segments = []
    current_segment = []
    current_start = None
    
    for word_info in words_data:
        if current_start is None:
            current_start = word_info['start']
        
        current_segment.append(word_info['word'])
        
        # Check if we should end segment
        text = word_info['word']
        is_sentence_end = text.rstrip().endswith(('.', '!', '?'))
        
        if len(current_segment) >= target_words or is_sentence_end:
            segments.append({
                'text': ' '.join(current_segment),
                'start': current_start,
                'end': word_info['end'],
                'word_count': len(current_segment)
            })
            current_segment = []
            current_start = None
    
    # Don't forget last segment
    if current_segment:
        segments.append({
            'text': ' '.join(current_segment),
            'start': current_start,
            'end': words_data[-1]['end'],
            'word_count': len(current_segment)
        })
    
    return segments

def build_video():
    print("Loading Whisper data...")
    with open(JSON_PATH, 'r') as f:
        data = json.load(f)
    
    words = data.get('words', [])
    if not words:
        print("No word-level data found!")
        return
    
    print(f"Found {len(words)} words")
    
    # Split into segments
    segments = split_into_segments(words)
    print(f"Created {len(segments)} segments")
    
    # Generate slides
    print("Generating slides...")
    slide_info = []
    for i, seg in enumerate(segments):
        filepath = create_slide(seg['text'], i, seg['word_count'])
        duration = seg['end'] - seg['start']
        # Minimum duration of 0.5s
        duration = max(duration, 0.5)
        slide_info.append({
            'path': filepath,
            'duration': duration
        })
        print(f"  Slide {i+1}: {seg['text'][:40]}... ({duration:.2f}s)")
    
    # Create FFmpeg concat file
    print("Creating video...")
    concat_file = "concat_list.txt"
    with open(concat_file, 'w') as f:
        for slide in slide_info:
            f.write(f"file '{slide['path']}'\n")
            f.write(f"duration {slide['duration']}\n")
        # Add last file again (FFmpeg quirk)
        f.write(f"file '{slide_info[-1]['path']}'\n")
    
    # Build video with FFmpeg
    output_file = "vsl-video.mp4"
    cmd = [
        'ffmpeg', '-y',
        '-f', 'concat', '-safe', '0', '-i', concat_file,
        '-i', AUDIO_PATH,
        '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '192k',
        '-shortest',
        output_file
    ]
    
    subprocess.run(cmd, check=True)
    print(f"\nVideo created: {output_file}")
    
    # Get file size
    size_mb = os.path.getsize(output_file) / (1024 * 1024)
    print(f"Size: {size_mb:.2f} MB")

if __name__ == "__main__":
    build_video()
