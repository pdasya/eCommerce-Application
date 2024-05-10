# Code Style Guide :scroll:

_Our standard for writing code_

# Files Naming Conventions

1.  Only `Latin letters`, `dot` (".") and `hyphen` ("-") are allowed

1.  All words in the file or directory name are written in `lowercase`

1.  The naming style is predominantly `kebab-case` wherever applicable

1.  The file name is divided into logical blocks. Logical blocks are separated by dots, and words are separated by hyphens: `word1-word2`.`word1-word2`.`word1`.`ts`. This approach allows you to determine the functional purpose of this file out of context just by the file name:

    - `code-style-guide`.`doc`.`md`
    - `clone-deep.util.ts`
    - `product`.`interface`.`ts`

1.  The names of files related to a component must contain a `component` block:

    - `login-form`.`component`.`tsx`
    - `login-form`.`component`.`module`.`scss`
    - `login-form`.`component`.`test`.`tsx`

1.  For components that are application pages, you should use a `page` block instead of a `component`:
    - `login`.`page`.`tsx`

# Typescript General

1. Use of `any` type is prohibited
1. Simplified `if/else` constructs are not allowed
1. Nested ternary operators are not allowed

# Other

1. Indents: 2 spaces
1. Use single quotes to declare strings
1. It is recommended to comment on non-obvious moments in the code, exceptional situations
