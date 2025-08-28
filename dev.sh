#!/bin/bash
# Quick development server startup script
# Ensures correct Node.js version and clean environment

echo "🚀 Starting Vio La Doula development server..."
echo ""

# Load NVM and use correct Node version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use v20.19.3

echo ""
echo "📁 Working directory: $(pwd)"
echo "🟢 Node version: $(node --version)"
echo "📦 NPM version: $(npm --version)"
echo ""

# Start development server
npm run dev

echo ""
echo "💡 Development server stopped."
echo "💡 Your changes are in the /src directory"
echo "💡 Translation files are in /src/i18n/locales/"