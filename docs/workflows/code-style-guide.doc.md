# Code Style Guide :scroll:

_Our standard for writing code_

# Naming Conventions

## Files Naming

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

## TypeScript Naming

#### Naming styles description:

```ts
// PascalCase (not used)
interface IGetUserByIDResponse {}
type UserUID {}
class UserAPI {}

// StrictPascalCase (used)
interface IGetUserByIdResponse {}
type UserUid {}
class UserApi {}

// camelCase (not used)
function getUserByID(id: number): User {}
public getUserByID(id: number): User {}

// strictCamelCase (used)
function getUserById(id: number): User {}
public getUserById(id: number): User {}
```

1. Interfaces - `StrictPascalCase` with mandatory `I` prefix

1. Types, Classes, Enums - `StrictPascalCase`

1. Class methods - `strictCamelCase`

1. Functions, variables, constants and all kind of arguments - `strictCamelCase`

1. Constants that contain the functional expression of a functional React-component - `StrictPascalCase`

1. All class fields must have an access modifier: `public`, `protected` or `private`

1. The `private` class field name must begin with an underscore `_`

1. Do not use abbreviated names of variables, fields, classes without obvious reasons:

```ts
const res = getUserById(userId); // bad
const response = getUserById(userId); // ok
const userResponse = getUserById(userId); // good
```

# Typescript General

1. Use of `any` type is prohibited
1. Functions and methods must always specify a return type
1. Functions and methods arguments must have a type annotation
1. Each class should be located in a separate file
1. It is better to make functions small: no more than 30-40 lines
1. It is not recommended to pass more than 4 arguments to a function
1. Simplified `if/else` constructs are not allowed
1. Nested ternary operators are not allowed
1. There is recommended to leave an empty line before `return` if there is more than one line of code in the block

# Other

1. Indents: 2 spaces
1. Use single quotes to declare strings
1. Removing unnecessary code is mandatory if `TODO` is not present and there are no obvious reasons to leave it
1. If we leave the code with `TODO`, be sure to create an `issue` and indicate its number in the todo-comment
1. It is recommended to add `JS-doc` comments to all public methods and properties of classes and interfaces, exported functions, and enum-members.
1. It is recommended to comment on non-obvious moments in the code, exceptional situations
1. The use of inline comments `@ts-ignore` is prohibited
1. The use of inline `eslint-disable` comments is permitted only if there is a compelling reason for this. If used, be sure to leave an explanatory comment about the reason
