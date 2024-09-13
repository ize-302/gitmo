# gitmo

> A cli tool that adds appropriate emoji to your commit messages based on conventional commits specification

## About

This cli was built as a simpler alternative to [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli). There is no step to pick an emoji, we simply determine the appropriate emoji to use based on your commit message and include it in your message

## Install

### npm

```bash
npm i -g gitmo
```

## Usage

```bash
gitmo --help
```

```
  An cli tool that adds appropriate emoji
  to your commit message based on conventional commits specification

  Usage
    $ gitmo [option] [command]
  Options
    --commit, -c     Add commit using the gitmo
    --version, -v    Print current installed version
    --update, -u     Update gitmo cli
  Examples
    $ gitmo -c
```

## How to commit

```bash
# Note: This should be done after staging your changes
gitmo -c
```

You get this prompt:

```
? commit message › ENTER COMMIT MESSAGE HERE
```

---

### Resources used

- [Conventional commit types](https://github.com/pvdlg/conventional-commit-types)
- [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli)
