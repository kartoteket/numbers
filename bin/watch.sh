#!/bin/bash

# this is the entry point
if test "$1" == "js"
	then
	watchify -t ractivate src/js/main.js -o dist/js/main.js --debug --verbose

elif test "$1" == "css"
	then
	node-sass --output-style compressed -o -w dist/css src/scss

elif test "$1" == "html"
	then
	onchange 'src/index.html' -v -- cp src/index.html dist/

elif test "$1" == "assets"
	then
	onchange 'src/assets/*.*' -v -- cp -R src/images/ dist/images/

elif test "$1" == "all"
	then
	echo 'all'

elif test "$1" == "help"
	then

	echo '#######################'
	echo '  COMMANDS AVAILABLE'
	echo '#######################'
	echo ''
	echo ' -- js     - Only watch js files'
	echo ' -- html   - Only watch html files'
	echo ' -- all    - Build everything'
	echo ' -- help   - This screen'
	echo '           - No arguments, watch all'
	echo ''
	echo ' any arguments in combination with "livereload" will trigger livereload'
	echo ' example:'
	echo '         watch -- js livereload'
	echo ' will listen to changes to all js files and trigger livereload in browser'

else
	echo '#######################'
	echo '       WATCH ALL'
	echo '#######################'
	echo ''
	onchange 'src/index.html' -v -- cp src/index.html dist/ &
	watchify -t ractivate src/js/main.js -o dist/js/main.js --debug --verbose &
	onchange 'src/assets/*.*' -v -- cp -R src/images/ dist/images/ &
	node-sass --output-style compressed -o dist/css src/scss -w 
fi

if test "$1" == "livereload" -o "$2" == "livereload"
	then
	echo '#######################'
	echo '  LIVE RELOAD ENABLED'
	echo '#######################'
	echo ''
	livereload ./dist
fi
