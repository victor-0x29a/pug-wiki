<h1 align="center">
  <br>
  <img src="assets/pug.png"/>
  <br>
  PugWiki
  <br>
</h1>

- Application server-side-rendering using the pug as a render engine;
- At the moment using the mysql as database throught Docker;
- Using SASS to all styles;
- Specs with Jest;
- Husky executing all tests after commit and before the commit the linter;


# Running locally

Install the packages:

- [Docker](https://www.docker.com/);
- [NodeJS](https://nodejs.org/en);

Go to the folder and run:

```
npm i -g yarn
```

And after, run:

```
yarn install
```

Now, to start, run:

```
docker compose up -d
```

And:

```
yarn dev
```
