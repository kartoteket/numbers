#!/bin/bash

# this is the entry point
if test "$1" == "js"
	then
	watchify -t aliasify -t ractivate src/js/main.js -o dist/js/main.js --debug --verbose

elif test "$1" == "css"
	then
	node-sass --output-style compressed -o -w dist/css src/scss

elif test "$1" == "html"
	then
	onchange 'src/index.html' -v -- cp src/index.html dist/

elif test "$1" == "assets"
	then
	onchange 'src/assets/*.*' -v -- cp -R src/images/ dist/images/

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
	echo ' type watch.sh -- help for a list of commands'
	echo ''
	echo '#######################'
	echo '       WATCH ALL'
	echo '#######################'

	if test "$1" == 'livereload'
		then
			echo '   WITH LIVE RELOAD'
			echo '#######################'
			node-sass --output-style uncompressed -o dist/css src/scss -w &
			onchange 'src/index.html' -v -- cp src/index.html dist/ &
			watchify -t aliasify -t ractivate src/js/main.js -o dist/js/main.js --debug --verbose &
			onchange 'src/assets/*.*' -v -- cp -R src/images/ dist/images/ &
			livereload ./dist
	else
			node-sass --output-style uncompressed -o dist/css src/scss -w &
			onchange 'src/index.html' -v -- cp src/index.html dist/ &
			watchify -t aliasify -t ractivate src/js/main.js -o dist/js/main.js --debug --verbose &
			onchange 'src/assets/*.*' -v -- cp -R src/images/ dist/images/ &
	fi
fi