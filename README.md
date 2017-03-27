# PreJSS Example

<img align="right" width="92" height="104"
     title="Logo of PreJSS, webpack style"
     src="https://raw.githubusercontent.com/axept/prejss/master/docs/logo.png">
     
Isomorphic React.js application with using Server-Side Rendering (SSR), Hot-Module Reloading (HMR), JSS (as the best CSS-in-JSS library) and preJSS to transform CSS to CSS-in-JSS plain objects "on-the-fly".

See more details here:

+ https://github.com/axept/prejss


## Installation

```
git clone git@github.com:axept/prejss-example-app.git
```


## Launch

### Development 

Use HMR features and some other advanced feature to get your development experience better.

1. Install `nodemon` if you did not install it before.

   ```bash
   npm install nodemon -g
   ```

2. Then just launch it:

   ```bash
   npm run start:local
   ```


### Production

1. Get production-optimized builds.

   ```bash
   NODE_ENV=production npm run build
   ```

2. Launch it on your server

   ```bash
   NODE_ENV=production npm run start
   ```

## Feedback

We really love your feedback.

Share your ideas, issues and thoughts here:

+ https://github.com/axept/prejss-example-app/issues/new
