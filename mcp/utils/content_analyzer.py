"""
Content Analyzer Utility
Analyzes content for readability, SEO, and engagement
"""

from typing import Dict, List
import re

def analyze_content(content: str, page_type: str, target_keywords: List[str]) -> Dict:
    """
    Analyze content for readability, SEO, and engagement
    """
    # Basic metrics
    words = content.split()
    word_count = len(words)
    reading_time_minutes = word_count / 200  # Average reading speed

    # Count headings
    heading_structure = {
        "h1": len(re.findall(r'<h1[^>]*>', content, re.IGNORECASE)),
        "h2": len(re.findall(r'<h2[^>]*>', content, re.IGNORECASE)),
        "h3": len(re.findall(r'<h3[^>]*>', content, re.IGNORECASE)),
        "h4": len(re.findall(r'<h4[^>]*>', content, re.IGNORECASE))
    }

    # Count images and links
    image_count = len(re.findall(r'<img[^>]*>', content, re.IGNORECASE))
    link_count = len(re.findall(r'<a[^>]*href', content, re.IGNORECASE))

    # Calculate readability (simplified Flesch Reading Ease)
    sentences = re.split(r'[.!?]+', content)
    sentences = [s.strip() for s in sentences if s.strip()]
    sentence_count = len(sentences)

    syllables = sum(count_syllables(word) for word in words)

    if sentence_count > 0 and word_count > 0:
        avg_sentence_length = word_count / sentence_count
        avg_syllables_per_word = syllables / word_count

        # Flesch Reading Ease formula (simplified)
        readability_score = 206.835 - (1.015 * avg_sentence_length) - (84.6 * avg_syllables_per_word)
        readability_score = max(0, min(100, readability_score))
    else:
        readability_score = 50

    # Keyword density
    content_lower = content.lower()
    keyword_density = {}
    for keyword in target_keywords:
        keyword_lower = keyword.lower()
        count = content_lower.count(keyword_lower)
        density = (count / word_count * 100) if word_count > 0 else 0
        keyword_density[keyword] = round(density, 2)

    # Generate recommendations
    recommendations = []
    seo_suggestions = []
    engagement_suggestions = []

    # Word count recommendations
    if page_type == "homepage" and word_count < 300:
        recommendations.append("Homepage content is quite short. Consider adding more value proposition content.")
    elif page_type == "blog-post" and word_count < 800:
        recommendations.append("Blog post is short. Aim for 1000+ words for better SEO.")

    # Heading structure
    if heading_structure["h1"] == 0:
        seo_suggestions.append("Add an H1 heading for better SEO")
    elif heading_structure["h1"] > 1:
        seo_suggestions.append("Use only one H1 heading per page")

    if heading_structure["h2"] < 2:
        recommendations.append("Consider adding more H2 headings to structure content")

    # Readability
    if readability_score < 60:
        engagement_suggestions.append("Content readability is low. Consider simplifying language and shortening sentences.")
    elif readability_score > 80:
        engagement_suggestions.append("Content is very readable. Good for broad audience.")

    # Images
    if image_count == 0:
        engagement_suggestions.append("Add images to improve engagement and break up text")
    elif image_count < word_count / 300:
        engagement_suggestions.append("Consider adding more images (aim for 1 image per 300 words)")

    # Links
    if link_count < 3:
        seo_suggestions.append("Add internal and external links for better SEO")

    # Keywords
    if target_keywords:
        low_density_keywords = [kw for kw, density in keyword_density.items() if density < 1]
        if low_density_keywords:
            seo_suggestions.append(f"Consider increasing keyword density for: {', '.join(low_density_keywords)}")

    # Calculate overall score
    score = calculate_content_score(
        word_count, readability_score, heading_structure,
        image_count, link_count, keyword_density
    )

    return {
        "metrics": {
            "word_count": word_count,
            "reading_time_minutes": round(reading_time_minutes, 1),
            "readability_score": round(readability_score, 1),
            "keyword_density": keyword_density,
            "heading_structure": heading_structure,
            "image_count": image_count,
            "link_count": link_count
        },
        "score": round(score, 1),
        "recommendations": recommendations,
        "seo_suggestions": seo_suggestions,
        "engagement_suggestions": engagement_suggestions
    }

def count_syllables(word: str) -> int:
    """
    Count syllables in a word (simplified)
    """
    word = word.lower().strip()
    if not word:
        return 0

    vowels = "aeiouy"
    syllable_count = 0
    prev_was_vowel = False

    for char in word:
        is_vowel = char in vowels
        if is_vowel and not prev_was_vowel:
            syllable_count += 1
        prev_was_vowel = is_vowel

    # Handle silent e
    if word.endswith('e'):
        syllable_count -= 1

    return max(1, syllable_count)

def calculate_content_score(
    word_count: int,
    readability: float,
    headings: Dict,
    images: int,
    links: int,
    keywords: Dict
) -> float:
    """
    Calculate overall content quality score (0-100)
    """
    score = 0

    # Word count (20 points)
    if word_count >= 1000:
        score += 20
    elif word_count >= 500:
        score += 15
    elif word_count >= 300:
        score += 10

    # Readability (25 points)
    if readability >= 70:
        score += 25
    elif readability >= 60:
        score += 20
    elif readability >= 50:
        score += 15

    # Heading structure (15 points)
    if headings["h1"] == 1:
        score += 5
    if headings["h2"] >= 2:
        score += 5
    if headings["h3"] >= 2:
        score += 5

    # Images (15 points)
    if images >= 3:
        score += 15
    elif images >= 1:
        score += 10

    # Links (15 points)
    if links >= 5:
        score += 15
    elif links >= 3:
        score += 10

    # Keywords (10 points)
    if keywords:
        avg_density = sum(keywords.values()) / len(keywords)
        if 1 <= avg_density <= 3:
            score += 10
        elif avg_density > 0:
            score += 5

    return min(100, score)

