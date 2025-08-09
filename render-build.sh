#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
npm install

# Define Puppeteer cache directory
PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
BUILD_CACHE_DIR=/opt/render/build-cache/puppeteer

# Create cache directories
mkdir -p $PUPPETEER_CACHE_DIR
mkdir -p $BUILD_CACHE_DIR

# Check if Chrome is already cached
if [[ -d "$BUILD_CACHE_DIR" ]] && [[ "$(ls -A $BUILD_CACHE_DIR)" ]]; then
    echo "...Copying Puppeteer Cache from Build Cache"
    cp -R $BUILD_CACHE_DIR/* $PUPPETEER_CACHE_DIR/
else
    echo "...Installing Chrome via Puppeteer"
    # Install Puppeteer and download Chrome
    npx puppeteer browsers install chrome
    
    echo "...Storing Puppeteer Cache in Build Cache"
    # Copy the installed Chrome to build cache for future deploys
    if [[ -d "$PUPPETEER_CACHE_DIR" ]] && [[ "$(ls -A $PUPPETEER_CACHE_DIR)" ]]; then
        cp -R $PUPPETEER_CACHE_DIR/* $BUILD_CACHE_DIR/
    fi
fi