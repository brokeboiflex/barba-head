import barba from "@barba/core";
import barbaPrefetch from "@barba/prefetch";
import gsap from "gsap";
barba.use(barbaPrefetch);
barba.hooks.afterLeave(({ current, next }) => {
  if (next.html) {
    const parser = new DOMParser();
    const newPage = parser.parseFromString(next.html, "text/html");

    console.log(newPage.querySelector("head"));
    console.log(document.head);

    // Remove current head except critical elements
    Array.from(document.head.children).forEach((child) => {
      if (!child.hasAttribute("data-critical")) {
        child.remove();
      }
    });

    // Append new head elements
    Array.from(newPage.querySelector("head").children).forEach((newChild) => {
      const tagName = newChild.tagName.toLowerCase();
      if (
        tagName === "script" ||
        tagName === "link" ||
        tagName === "style" ||
        tagName === "meta"
      ) {
        if (
          !document.head.querySelector(
            `[src="${newChild.src}"], [href="${newChild.href}"]`
          )
        ) {
          const clonedNode = newChild.cloneNode(true);
          // If it's a script, re-execute it by appending to the body
          if (tagName === "script") {
            const script = document.createElement("script");
            if (clonedNode.src) {
              script.src = clonedNode.src;
            } else {
              script.textContent = clonedNode.textContent;
            }
            script.async = false;
            document.body.appendChild(script); // Append to body for immediate execution
          } else {
            document.head.appendChild(clonedNode);
          }
        }
      }
    });
  }
});

barba.init({
  debug: true,
  logLevel: "debug",
  transitions: [
    {
      name: "opacity-transition",
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
        });
      },
    },
  ],
});
