# [Doctor.com](https://github.com/mahessh77melo/Doctor.com "Visit the repo")

## To begin with-->

bro, if u haven't installed node in ur computer, do so and run `npm install` inside this directory for u to be able to make changes

> Anyway, if u are planning on viewing the html file directly for a quick view, then look for the head part of the `index.html` file and make this change.

```html
<link rel="stylesheet" href="/css/base.css" />
```

## change this to &darr;

```html
<link rel="stylesheet" href="/static/css/base.css" />
```

now copy paste the path of this file in a browser and u are good to go. Revert it back after u have finished the preview. Remember, no functional features will be available in this preview.

## The legitimate way

> After running `npm install` in the server directory, open the command prompt in this directory and type `npm start` and hit enter.
> The browser will start automatically at the 3000 localhost port. Hit a reload if necessary. Test and verify the full functionality.

## Does the Database work??

> Well you can view your own appointment by clicking the _"View my appointment"_ button at the landing page and feeding the details to fetch the same.

> However, there is a better way, there is a file called, **test.js** inside the server folder. You can run `node test.js` in the command line to view all the entries so far in the database. You may very well find your entry there.

## September 17 commit ->

Footer is complete. Application form is yet to be completed.

---

## September 27 commit ->

Set up the Node.js backend and basic routing. Also created a 404 page wtih basic styling.
Served static files without express.js

---

## October 1 commit ->

Bro i finally figured out date time strings and i kind of initialized the form. The input given in the front-end (browser) is available in the console at the backend. (node server console). Check it out and revert back.

---

# October 9 commit

## What has been done:

- Wrote media queries in SCSS.
- Compressed CSS file is ready.
- Facility to view the previously booked appointment.
- DataBase re-enabled.

## What is to be done:

- HTML fillers should be replaced with correct content.
- New Database has to be setup and dbURI should be fetched from mongodb Atlas.
- Way of querying the previous apppiointments may be changed.
- Deployment
