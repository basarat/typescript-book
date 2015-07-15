#!/bin/sh
set -e

# Get the git commit hash
typeScriptDirectory='./TypeScript'
cd $typeScriptDirectory
commitHash=`git rev-parse HEAD`
cd ..

# Version of this script
toolsVersion="1"

commitVersion="1.$(date +%Y%m%d%H%M).$toolsVersion+$commitHash"
commitName="$(date +%Y-%m-%d) [ci skip] Version: $commitVersion"

# Kick travis
echo $commitName > kicktravis

# Update package.json
< package.json > package.json.new sed -E "s/(\s+\"version\": \")[^\"]+(\",)/\1$commitVersion\2/"
mv package.json.new package.json
echo "Adding to git"
git add -A
git checkout master
git status

# Commit,tag,push,publish
echo "Committing"
git commit -m "$commitName"
git merge HEAD@{1}
echo "Pushing commit"
git push

echo "Tagging"
git tag $commitVersion
echo "Pushing tags"
git push --tags
