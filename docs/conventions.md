Conventions and best practices
==============================

Here are the **conventions** followed by this project.

General: Names with acronyms and initialisms in camelCase
---------------------------------------------------------

For variables that embed acronyms and initialisms such as

 - URL
 - XML
 - HTTP
 - JSON
 - etc.

When it appears in the middle of an identifier, **only capitalize the first letter**:

```javascript
// good
function fetchJson() {
}
// bad
function fetchJSON() {
}
```


CSS: ordering declarations in CSS rulesets
------------------------------------------

Try to stick to the following order of grouping of declarations in CSS:


```css
div {
    /* Positioning */
    position: relative;
    top: 1rem;    /* order from top, right, bottom, left (like most shorthand properties */
    right: 1rem;
    z-index: 20;

    /* Display & Box model */
    display: flex;
    box-sizing: border-box; /* width INCLUDES the border and padding */
    width: 20ch;
    max-height: .5vh;
    padding: .75rem .5rem;
    margin: 2rem;
    /* exception: border! */

    /* Anything to do with color */
    color: var(--blue);
    background-color: hsl(340deg 10% 50% / 80%);
    border: 1px solid
    box-shadow: 1px 1px 2px rgb(0 0 0 / 20%);

    /* Text & Typography */
    font-family: var(--main-font);
    line-height: 1.25;
    text-align: start;
    text-transform: uppercase;

    /* Misc */
    transition: transform 1s;
    transform: rotate(2deg);
    overflow: none;
}
```

`content` should **always** be the first element `::before` or `::after`
pseudo-element selectors, due to its effect on these elements:


```css
::before, ::after {
    content: " ";

    /* everythiong else... */
}
```

### Sources

These guidelines have been adapted from the following sources:

 - https://gist.github.com/awkale/ad46e2ade70e833fa178
 - https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/
 - https://webdesign.tutsplus.com/articles/outside-in-ordering-css-properties-by-importance--cms-21685
 - https://9elements.com/css-rule-order/


CSS: for positioning, prefer `rem` to `px`
---------------------------------------

The `rem` unit or **:root em** is relative to the size of 1em for the
root element of the document (i.e., the `<html>` element)
([mdn][rem-mdn], [csswg][rem-csswg]),

The advantage of using `rem`s over `px` is that [we can scale the
_entire site_ by scaling the `:root` font-size][css-tricks-rems]. We can even scale the
entire site using media queries (breakpoints) to scale the site for
different display sizes.

This also allows the user's custom stylesheets and assistive
technologies the ability to scale the entire site as well.

Use `rem`s for setting **margin** and non-text positioning:


```css
/* good */
article {
    margin-top: .5rem;
    padding: 1rem;
}

/* bad */
article {
    margin-top: 8px;
    padding: 16px;
}
```


### Converting between px and `rem`

Since we _want_ the size of a `rem` to change, but often tools produce
units in px, use the following guideline to convert between the two:

> `16px == 1rem`

The entire point of `rem` is that it can change, and there is exactly
one place to change it, but this conversion guideline stems from a few
sources ([1][standardista-rem], [2][font-sizing-with-rem],
[3][rem-converter]). There is also [a converter][rem-converter].

### Fun fact

[`1px` is not a pixel][px].

[css-tricks-rems]: https://css-tricks.com/rems-ems/
[font-sizing-with-rem]: https://www.sitepoint.com/understanding-and-using-rem-units-in-css/#font-sizing-with-rem-units
[px]: https://drafts.csswg.org/css-values-3/#reference-pixel
[rem-converter]: https://daniellamb.com/experiments/px-to-rem-calc/
[rem-csswg]: https://drafts.csswg.org/css-values-3/#rem
[rem-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/length#rem
[standardista-rem]: http://www.standardista.com/px-to-rem-conversion-if-root-font-size-is-16px/


CSS: for font-size, prefer `em` to `px`
---------------------------------------

`em` are scaled according to the **current** font-size.

So if you are styling a `<small>` element, you want it to be small
_relative to its surrounding text_.

Hence:

```css
/* good */
small {
    font-size: 0.75em;
}

/* bad */
small {
    font-size: 12px;
}
```

See also this [CSS tricks article][css-tricks-rems].


CSS: omit the unit from zero
----------------------------

If you set something to `0px`,  `0em`, `0rem`, etc., omit the unit.

```css
.good {
    border: 0;
}

.bad {
    border: 0px;
}
```
