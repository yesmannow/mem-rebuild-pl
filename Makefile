# Makefile for Inspiration + Brand Identity Showcase
# Chains CLI automation for asset fetching, optimization, and preview

.PHONY: showcase fetch optimize metadata palettes spreads preview clean

# Main target: run full pipeline
showcase: fetch optimize metadata palettes spreads preview

# Fetch brand assets from web sources
fetch:
	@echo "Fetching brand assets..."
	@mkdir -p public/assets/brands/{ibm,nasa,standards,rail,sutherland,eames}
	# wget/curl commands would go here for actual fetching
	# For now, placeholder - assets would be downloaded to respective directories

# Optimize images for web
optimize:
	@echo "Optimizing images..."
	# sharp-cli or imagemin commands
	# Example: sharp-cli --input public/assets/brands/*/*.{jpg,png} --output public/assets/brands/optimized/ --resize 1200x800 --format webp

# Extract metadata from assets
metadata:
	@echo "Extracting metadata..."
	# tree -J public/assets/brands > src/data/brands-assets.json
	@echo "Metadata extraction complete"

# Generate color palettes for Spec Chips
palettes:
	@echo "Generating color palettes..."
	# color-thief-cli public/assets/brands/*/*.jpg > src/data/palettes.json
	@echo "Palettes generated"

# Convert PDFs to spread images
spreads:
	@echo "Converting PDFs to spreads..."
	# ImageMagick convert commands
	# Example: convert -density 200 public/assets/brands/*/manual.pdf[0-10] public/assets/brands/%d/spreads/page-%02d.jpg
	@echo "Spreads converted"

# Launch preview server
preview:
	@echo "Launching preview server..."
	npx live-server public --port 8080 --open=/assets/brands/

# Clean generated assets
clean:
	@echo "Cleaning generated assets..."
	rm -rf public/assets/brands/optimized/
	rm -f src/data/brands-assets.json src/data/palettes.json