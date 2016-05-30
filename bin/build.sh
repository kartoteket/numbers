#!/bin/bash
cleanbuild()
{
	echo '#######################'
	echo '  Cleaning directories'
	echo '#######################'
	echo ''
	rm -rf dist/*
	echo ''
	echo 'CLEANING DONE!'
	echo ''
}

jsbuild()
{
	echo '#######################'
	echo '  PERFORMING JS BUILD'
	echo '#######################'
	echo ''
	mkdir -p dist/js;
	browserify -t ractivate src/js/main.js  | uglifyjs -m -c > dist/js/main.js
#	uglifyjs src/js/*.js -m -o dist/js/app.js &
#	uglifyjs src/js/*.js -m -c -o dist/js/app.min.js &
	mkdir -p dist/js/vendor;
	cp src/js/vendor/*.js dist/js/vendor/;

	# this is for dev,
	# will be removed once we vae a stage | dev | prod setup
#	cp src/js/main.js dist/js/main.js
	echo ''
	echo 'JS DONE!'
	echo ''
}

cssbuild()
{
	echo '#######################'
	echo '  PERFORMING CSS BUILD'
	echo '#######################'
	echo ''
	node-sass --output-style compressed -o dist/css src/scss
	cp node_modules/leaflet/dist/leaflet.css dist/css
}

postcssbuild()
{
	postcss -u autoprefixer -r dist/css/*
	echo ''
	echo 'CSS DONE!'
	echo ''
}

htmlbuild()
{
	echo '#########################'
	echo '  PERFORMING HTML BUILD'
	echo '#########################'
	echo ''
	cp src/index.html dist/index.html
	echo ''
	echo 'HTML DONE!'
	echo ''
}

# this is the entry point
if test "$1" == "js"
	then
	jsbuild

elif test "$1" == "css"
	then
	cssbuild && postcssbuild

elif test "$1" == "html"
	then
	htmlbuild

elif test "$1" == "clean"
	then
	cleanbuild

elif test "$1" == "help"
	then
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
else
	# lets run these sequentially.
	cleanbuild;
	htmlbuild;
	(cssbuild && postcssbuild);
	jsbuild;

	# optional and quicker by running task in background. but less trancparent and more error prone
	# cleanbuild && (htmlbuild & (cssbuild && postcssbuild) & jsbuild);
fi

#npm run build:css && npm run build:js && npm run build:html