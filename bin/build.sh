#!/bin/bash
cleanbuild()
{
	echo '#######################'
	echo '  Cleaning directories'
	echo '#######################'
	echo ''
	rm -rf dist/*
	echo ''
	echo 'DONE!'
	echo ''
}

jsbuild()
{
	echo '#######################'
	echo '  PERFORMING JS BUILD'
	echo '#######################'
	echo ''
	browserify -t ractivate src/js/main.js | mkdir -p dist/js && uglifyjs src/js/*.js -m -o dist/js/app.js && uglifyjs src/js/*.js -m -c -o dist/js/app.min.js
	echo ''
	echo 'DONE!'
	echo ''
}

cssbuild()
{
	echo '#######################'
	echo '  PERFORMING CSS BUILD'
	echo '#######################'
	echo ''
	node-sass --output-style compressed -o dist/css src/scss
	echo ''
	echo 'DONE!'
	echo ''
}

postcssbuild()
{
	postcss -u autoprefixer -r dist/css/*
}

htmlbuild()
{
	echo '#########################'
	echo '  PERFORMING HTML BUILD'
	echo '#########################'
	echo ''
	cp src/index.html dist/index.html
	echo ''
	echo 'DONE!'
	echo ''
}

# this is the entry point
if test "$1" == "js"
	then
	jsbuild

elif test "$1" == "css"
	then
	cssbuild
	postcssbuild

elif test "$1" == "html"
	then
	htmlbuild

elif test "$1" == "clean"
	then
	cleanbuild

elif test "$1" == "all"
	then
	cleanbuild
	jsbuild
	cssbuild
	postcssbuild
	htmlbuild

else
	echo '#######################'
	echo '  NO COMMAND CHOSEN'
	echo '#######################'
	echo ''
	echo 'Valid commands are'
	echo ''
	echo ' -- js     - Build the js files only'
	echo ' -- css    - Build the css files only'
	echo ' -- html   - Build the html files only'
	echo ' -- all    - Build everything'
	echo ' -- clean  - Clean the repo (cal also use npm run clean)'
	echo ''
	echo ''
fi

#npm run build:css && npm run build:js && npm run build:html