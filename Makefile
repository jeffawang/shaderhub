.PHONY: pages
pages:
	git branch -D build
	git checkout -b build

	# Create the build, in the ./build directory.
	npm run build

	# Add -f because build is gitignored.
	git add -f build

	git commit -m'build'

	# Delete any local gh-pages branch for the ensuing magic.
	git branch -D gh-pages || true

	# git subtree magic.
	# Only commit the build directory to the gh-pages branch.
	git subtree split --prefix build -b gh-pages

	git checkout gh-pages

	# Set the CNAME, since this is how ghpages configures it...
	/bin/echo -n 'shaderhub.jeffawang.com' > CNAME
	git add CNAME
	git commit -m'CNAME'

	# Then push the gh-pages branch.
	# -f is required because the history is discontinuous.
	git push -f origin gh-pages:gh-pages

	# Go back to the original branch
	git checkout @{-2}