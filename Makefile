.PHONY: pages
pages:
	git branch -D build || true
	git checkout -b build

	# Create the build, in the ./build directory.
	yarn export

	# Add -f because build is gitignored.
	git add -f out

	git commit -m'build'

	# Delete any local gh-pages branch for the ensuing magic.
	git branch -D gh-pages || true

	# git subtree magic.
	# Only commit the build directory to the gh-pages branch.
	git subtree split --prefix out -b gh-pages

	git checkout gh-pages

	# Set the CNAME, since this is how ghpages configures it...
	/bin/echo -n 'shaderhub.jeffawang.com' > CNAME
	# Touch .nojekyll for gh-pages (otherwise _next/... paths return 404)
	touch .nojekyll
	git add CNAME .nojekyll
	git commit -m'CNAME, .nojekyll'

	# Then push the gh-pages branch.
	# -f is required because the history is discontinuous.
	git push -f origin gh-pages:gh-pages

	# Go back to the original branch
	git checkout @{-2}
