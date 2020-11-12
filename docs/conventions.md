Conventions and best practices
==============================

Here are the **conventions** followed by this project.

General: Keep capitals intact in names with acronyms and initialisms in camelCase
---------------------------------------------------------------------------------

For variables that embed acronyms and initialisms such as

 - URL
 - XML
 - HTTP
 - JSON
 - _etc._

When it appears in the middle of an identifier, **capitalize all letters**:

```javascript
// good
function fetchJSON() {
}

// bad
function fetchJson() {
}

// good
let modelID;

// bad
var modelId;
```


General: Always delete commented-out code
-----------------------------------------

Commented-out code should never be committed to `production`. If there
is some reason for keeping around the code that was commented out, **use
git** instead.

### How to delete code, but keep it in history

If you need to comment out some code, make sure your **working copy is
clean**.

    $ git status
    On branch production
    Your branch is up to date with 'origin/production'.

    nothing to commit, working tree clean

Then, **delete the code** 🔥🔥🔥

Next, write a commit with the keyword `remove` Let's say we
just deleted code that implemented an old algorithm for felincating
bjorndingers. Write a message like:

    git commit -am "remove: old algorithm for felincating bjorndingers"


### What if I need that code back?

You probably don't. But just in case you do, you can find the commit
that deleted that code using **git log** and **git revert**.

#### Find the SHA of the commit that deleted the code

First use `git log` to find the commit with that `remove` keyword. You
can get a list of all commits with `remove` in the message with the following
command:

    git log --grep="remove"

```
commit 1e0698367b9b7ef2aae56b9af0073cb051a4192b
Merge: 9728a42 7ff662f
Author: Eddie Antonio Santos <easantos@ualberta.ca>
Date:   Mon Sep 28 15:49:27 2020 -0600

    remove: custom BCP-47 types

commit e7dfbf98d9d45f0e194d6b9162cfe91ae892a02e
Author: Eddie Antonio Santos <easantos@ualberta.ca>
Date:   Mon Sep 28 15:00:13 2020 -0600

    remove: old algorithm for felincating bjorndingers
```

I like to use a more compact display, so I add the `--oneline` argument:

    git log --oneline --grep="remove"

```
1e06983 remove: custom bcp-47 types
e7dfbf9 remove: old algorithm for felincating bjorndingers
```

There are probably too many commits to sift through manually, so you can
add extra keywords by providing `--all-match` and one or more
`--grep="KEYWORD"` arguments. In this example, I seem to recall that
I removed some code that involved “bjorndingers” somehow, so I use the
following command:

    git log --oneline --all-match --grep="remove" --grep="bjorndinger"

```
e7dfbf9 remove: old algorithm for felincating bjorndingers
```

The hexadecimal number to the left is the **git SHA** of the commit that
removed the code we're interested in. Copy this number. So in this case,
I want to copy  `e7dfbf9`.

#### Use `git revert` to undo the delete

Now, using the commit SHA, use `git revert` to undo the delete:

    git revert e7dfbf9

This creates a **new commit** undoing the delete.

### Sources

I'm not the only one who says you should just delete commented-out code.
See here:

 - https://kentcdodds.com/blog/please-dont-commit-commented-out-code
 - https://markhneedham.com/blog/2009/01/17/the-danger-of-commenting-out-code/
 - https://softwareengineering.stackexchange.com/a/190222/284069
 - https://softwareengineering.stackexchange.com/a/213685/284069


JavaScript: Use Airbnb's Naming Conventions
-------------------------------------------

When in doubt, consult [Airbnb's JavaScript style
guide](https://github.com/airbnb/javascript#naming-conventions) for
naming conventions.


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
    display: inline-block;
    box-sizing: border-box; /* let width and height INCLUDE the border and padding */
    width: 20ch;
    max-height: .5vh;
    padding: .75rem .5rem;
    margin: 2rem;
    /* exception: border! */

    /* Anything to do with color */
    color: var(--blue);
    background-color: hsl(var(--blue-hue) 20% 50% / 80%);
    border: 1px solid var(--blue);
    box-shadow: 1px 1px 6px 2px rgb(0 0 0 / 20%);

    /* Text & Typography */
    font-family: var(--main-font);
    line-height: 1.25;
    text-align: end;
    text-transform: uppercase;

    /* Misc */
    transition: transform 1s;
    overflow: hidden;
}
```

`content` should **always** be the first element `::before` or `::after`
pseudo-element selectors, due to its effect on these elements:


```css
::before, ::after {
    content: " ";

    /* everything else... */
}
```

### Sources

These guidelines have been adapted from the following sources:

 - https://gist.github.com/awkale/ad46e2ade70e833fa178
 - https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/
 - https://webdesign.tutsplus.com/articles/outside-in-ordering-css-properties-by-importance--cms-21685
 - https://9elements.com/css-rule-order/


CSS: prefer `rem` to `px` for positioning
-----------------------------------------

The `rem` unit or **`:root` em** is relative to the size of 1em for the
root element of the document (i.e., the `<html>` element)
[[mdn][rem-mdn], [csswg][rem-csswg]].

The advantage of using `rem`s over `px` is that [we can scale the
_entire site_ by scaling the `:root` font-size][css-tricks-rems]. We can even scale the
entire site using media queries (breakpoints) to scale the site for
different display sizes. This also allows the **user's custom
style sheets** and **assistive technologies** the ability to scale the
entire site as desired.

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


### Converting between `px` and `rem`

Since we _want_ the size of a `rem` to change, but often tools produce
units in `px`, use the following **guideline** to convert between the
two:

    16px == 1rem

The entire point of `rem` is that it can change, and there is exactly
one place to change it, but this conversion guideline stems from a few
sources [[1][standardista-rem], [2][font-sizing-with-rem],
[3][rem-converter]]. There is also [a converter][rem-converter].

### Fun fact

[`1px` is not a pixel][px].

[css-tricks-rems]: https://css-tricks.com/rems-ems/
[font-sizing-with-rem]: https://www.sitepoint.com/understanding-and-using-rem-units-in-css/#font-sizing-with-rem-units
[px]: https://drafts.csswg.org/css-values-3/#reference-pixel
[rem-converter]: https://daniellamb.com/experiments/px-to-rem-calc/
[rem-csswg]: https://drafts.csswg.org/css-values-3/#rem
[rem-mdn]: https://developer.mozilla.org/en-US/docs/Web/CSS/length#rem
[standardista-rem]: http://www.standardista.com/px-to-rem-conversion-if-root-font-size-is-16px/


CSS: prefer `em` to `px` for font size
--------------------------------------

[`em` are scaled according to the **current** `font-size`][csswg-em].

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

[csswg-em]: https://drafts.csswg.org/css-values-3/#em


CSS: omit the unit from zero
----------------------------

If you set something to `0px`,  `0em`, `0rem`, `0%`, etc., **omit the unit**.

```css
/* good */
button {
    border: 0;
}

/* bad */
button {
    border: 0px;
}
```
