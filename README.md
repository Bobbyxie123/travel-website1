how to deploy the page 
 1.  yarn add gh-pages --save-dev
 2. package.json:  "homepage": "http://Bobbyxie123.github.io/react--travel",
 3. "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
 4. git remote add origin https://github.com/Bobbyxie123/react--travel.git
 5. git add . 
 6. git commit -m "first commit"
 7. git run deploy 
 8. git push -u origin main