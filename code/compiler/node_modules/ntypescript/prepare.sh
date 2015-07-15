#!/bin/sh
set -e


git submodule update --recursive --init

# Official Microsoft/TypeScript clone
typeScriptDirectory='./TypeScript'

cd $typeScriptDirectory

git clean -xfd
git fetch origin
git reset --hard origin/master

# Fix jakefile to expose the internal APIs to service
< Jakefile.js > Jakefile.new.js sed -E "s/\*stripInternal\*\/ true/\*stripInternal\*\/ false/"
mv Jakefile.new.js Jakefile.js

# Install jake
npm install jake

# Build once with LKG
./node_modules/.bin/jake release tsc --trace
cp ./built/local/* ./bin/

# Rebuild with itself
./node_modules/.bin/jake release clean local --trace

# Copy output
cp ./built/local/* ./bin/tsc ./bin/tsserver ../bin/

# Reset sub typescript
git reset --hard origin/master

# add custom extension
node ../extensions/addExtensions.js
