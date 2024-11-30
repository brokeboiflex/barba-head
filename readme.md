# Caution!

This repo contains a minimal implementation of a non existing barba-head plugin workaround. It's meant to be hacked to fit your needs. I'm not affiliated with barba nor its creator.

It will break all scripts depending on `DOMContentLoaded` event bc it already fired so You'll have to use a workaround like this:

```js
function deferScriptExecution() {
  console.log("defering");

  if (document.readyState === "loading") {
    console.log("loading");
    //
    document.addEventListener("DOMContentLoaded", init);
  } else {
    console.log("ready");

    // Main function
    init();
  }
}
deferScriptExecution();
```

It will also remove every element from head that doesn't have the `data-critical` attribute.

# Build for static

Originally I used it to make WordPress page faster
`npm run build` will build a script usable with static sites. Just include it in your head with `data-critical` attribute.
