# csv-to-lua-watch

Watch for changes to CSV files and convert to Lua

## Building

Build a standalone exe to the dist folder:

```sh
> npm run build
```

## Usage

Open the exe and you will be prompted for which folder containing .csv files to watch, and which folder to output the converted files to (optional), or simply drag the desired folder to watch directly onto the exe

App will initially convert all .csv files it sees in that directory. Subsequent changes to those files will automatically be converted

#### Using standalone from command line:

```sh
> csv-to-lua-watch path-to-csv-directory [path-to-output-directory]
```

#### Node usage:

```sh
> node index.js path-to-csv-directory [path-to-output-directory]
```
