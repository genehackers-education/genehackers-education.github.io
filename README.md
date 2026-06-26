# Synthetic Biology Outreach Toolkit

Free, hands-on synthetic biology lessons for kids, built by **UChicago Genehackers**, our student iGEM team. The Human Practices team built up a collection of activities and corresponding slide decks over the years, and Max Huang '28 formalized these learning materials, expanded the collection, and integrated everything into this public site.

**Live site → https://genehackers-education.github.io**

## What this is

Nine hands-on lessons that take kids from "what is DNA?" all the way to thinking about how they might design their own engineered organism. They're written for grades 3-6 and for people who aren't necessarily teachers, though teachers may still absolutely use the materials. The facilitator scripts tell you what to say and do, but are not meant to be read off of during lessons. Each lesson comes with a materials list and rough cost (most run on cheap, portable supplies), printable worksheets, and a slide deck.

We built all of it for classroom visits around Chicago, and put it together here so other teams and clubs can run it too.

## Just want the lessons?

You don't need any of the code. Head to the **[download page](https://genehackers-education.github.io/download.html)** and grab the whole toolkit, or just the pieces you want — slides, worksheets, the facilitator guide, and the cost sheet are all there.

## Use it however you want

Everything here is released under **CC0 1.0** (basically the public domain). You can use it, change it, translate it, print it, and put your own club's name and logo on it, for any purpose, with no permission and no credit required.

A shout-out to UChicago Genehackers is always nice, but it's never required. Make it your own.

## What's in this repo

This is the website (plain static HTML/CSS, no build step) plus the toolkit files behind it.

```
*.html        the pages
style.css     styling — brand colors are at the top
site.js       a little JavaScript (mobile menu + analytics/form settings)
assets/       fonts + illustrations
downloads/    the toolkit files people download
```

## Run your own copy

Want to fork this for your own team? It hosts free on GitHub Pages with nothing to install:

1. Copy these files into a new repo named `<your-username>.github.io`.
2. *(Optional)* Open `site.js` and set two things at the top: your [GoatCounter](https://www.goatcounter.com) code (free, privacy-friendly analytics) and your Google Form link for the footer "report back" line. Both are public, client-side values, so they're fine to commit — they're not secrets.
3. In the repo: **Settings → Pages → Deploy from a branch → `main` / root**.
4. About a minute later, it's live at `https://<your-username>.github.io`.

To change wording, edit the `.html` files. To swap a download, drop a new file into `downloads/` with the same name.

## Found it useful, or want to run an event with us?

We'd love to know where these lessons end up — **[tell us here]([https://genehackers-education.github.io/about.html](https://forms.gle/bUFeKZsFfWhidJTp8))**, or reach out if you want to team up.

---

Made by UChicago Genehackers · Free & public domain (CC0)
