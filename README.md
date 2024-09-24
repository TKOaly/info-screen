# TKO-äly info screen

A simple info screen to show on student room's television.

Displays information about upcoming events as well as Unicafe menus.

Production version is live at https://info.tko-aly.fi.

## Development

```bash
git clone https://github.com/TKOaly/info-screen.git
cd info-screen
npm install
npm run dev
```

## Project structure

Slides are defined as parallel routes in [`src/app/(infoscreen)/layout.tsx`](<src/app/(infoscreen)/layout.tsx>)

Slides refetch intervals are defined in [`src/app/RefetchIntervals.tsx`](src/app/RefetchIntervals.tsx)

Server side functions for fetching slide data are defined in [`src/server`](src/server)
