[![npm version](https://badge.fury.io/js/emojicode-transpiler.svg)](https://badge.fury.io/js/emojicode-transpiler)

# emojicode-transpiler
Readability of [Emojicode](https://github.com/emojicode/emojicode) is high, but productivity of Emojicode is low because of the difficulty of emoji input. emojicode-transpiler will make coding with Emojicode much easier!



## Installation

```
npm install -g emojicode-transpiler
```



## Usage

1. Create an Emojicode source file based on [Emojicode syntax](https://www.emojicode.org/docs/) and  [Transpilation Table](#transpilation-table).

    ```
    // hello.🍇
    
    :checkered_flag: {
      :grinning: "Hello World!" ;
    }
    ```

2. Execute emojicode-transpiler with command `et`.

  ```
  et hello.🍇
  ```
  
  Result would be like this.
  
  ```
  💭 hello.🍇
  
  🏁 🍇
    😀 🔤Hello World!🔤 ❗️
  🍉
  ```



## Transpilation Table

| emoji | traditional coding keyword | GFM keyword                |
| ----- | -------------------------- | -------------------------- |
| ❌     | `\`                        | `:x:`                      |
| ❗️     | `;`                        | `:exclamation:`            |
| 🍇     | `{`                        | `:grapes:`                 |
| 🍉     | `}`                        | `:watermelon:`             |
| 🔤     | `"`                        | `:abc:`                    |
| 🍪     | ```                        | `:cookie:`                 |
| 💭     | `//`                       | `:thought_balloon:`        |
| 💭🔜    | `/*`                       | ~~none~~                   |
| 🔚💭    | `*/`                       | ~~none~~                   |
| 📗     | `/**`                      | `:green_book:`             |
| 📗     | `**/`                      | `:green_book:`             |
| 📘     | `/***`                     | `:blue_book:`              |
| 📘     | `***/`                     | `:blue_book:`              |
| 🤜     | `(`                        | `:fist_right:`             |
| 🤛     | `)`                        | `:fist_left:`              |
| ➕     | `+`                        | `:heavy_plus_sign:`        |
| ➖     | `-`                        | `:heavy_minus_sign:`       |
| ✖️     | `*`                        | `:heavy_multiplication_x:` |
| ➗     | `/`                        | `:heavy_division_sign:`    |
| 🍨     | `l[`                       | `:ice_cream:`              |
| 🍯     | `d[`                       | `:honey_pot:`              |
| 🍆     | `]`                        | `:eggplant:`               |
| 🍬     | `:`                        | `:candy:`                  |
| 🍺     | `unwrap`                   | `:beer:`                   |
| 🏁     | `main`                     | `:checkered_flag:`         |
| 😀     | `print`                    | `:grinning:`               |
| 🖍     | `$`                        | `:crayon:`                 |
| 🖍🆕    | `var`                      | ~~none~~                   |
| ➡️     | `->`                       | `:right_arrow:`            |
| 👍     | `true`                     | `:thumbsup:`               |
| 👎     | `false`                    | `:thumbsdown:`             |
| 👌     | `boolean`                  | `:ok_hand:`                |
| 💧     | `char`                     | `:droplet:`                |
| 🔢     | `long`                     | `:1234:`                   |
| 💯     | `double`                   | `:100:`                    |
| 🔡     | `string`                   | `:abcd:`                   |
| ↪️     | `if`                       | ~~none~~                   |
| 🙅     | `else`                     | `:no_good:`                |
| 🔂     | `for`                      | `:repeat_one:`             |
| 🔁     | `while`                    | `:repeat:`                 |
| ⏩     | `range`                    | `:fast_forward:`           |
| ⏭     | `step`                     | `:next_track_button:`      |
| 🙌     | `=`                        | `:raised_hands:`           |
| ▶️     | `>`                        | `:arrow_forward:`          |
| ▶️🙌    | `>=`                       | ~~none~~                   |
| ◀️     | `<`                        | `:arrow_backward:`         |
| ◀️🙌    | `<=`                       | ~~none~~                   |
| 🐇     | `class`                    | `:rabbit2:`                |



## What you should aware

Every **traditional coding keyword**s are separated with whitespace characters. It's because [Emojicode allows any letters for variable names except of whitespace](https://www.emojicode.org/docs/reference/variables.html). So, it can seem little bit awkward, but you have to separator every keyword if it is a **traditional coding keyword**. 

For example, you should not write codes like this.

```
main {
  print "awsome!";
}
```

Instead, you should separate a double quote and a semicolon like below.

```
main {
  print "awsome!" ;
}
```

On the other hand, there is no limitation for gfm keywords. You can write codes like this.

```
main {
  :grinning: :abc:awsome!:abc::exclamation:
}
```



## Reference

- Making Log (Korean): <https://enhanced.kr/postviewer/133>
- Emojicode documentation: <https://www.emojicode.org/docs/>
