## Tailwind Starter

1. ``` npm init ```

2. 
``` 
npm install -D tailwindcss

npx tailwindcss init 
```

3. 
index.html
```
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

4. styles/style.css

```

@tailwind base;
@tailwind components;
@tailwind utilities;


```


5. Configuration tailwind.config.js

tailwind.config.js

```

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./pages/**/*.html/"],
  theme: {
    extend: {},
  },
  plugins: [],
}


```

6. watching pages

```
npx tailwindcss -i ./styles/index.css -o ./styles/output.css --watch

```
