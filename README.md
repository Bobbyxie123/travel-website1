how to deploy the page 
 1.  yarn add gh-pages --save-dev
 2. package.json:  "homepage": "http://Bobbyxie123.github.io/react--travel",
 3. "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
 4. 