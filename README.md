# Hypermocil
### An itermocil port for Hyper terminal.

I use itermocil a lot, and really missed it in Hyper.  This is my attempt at a port.  It is currently very buggy.  The way to invoke is by echoing the command you would normally send to itermocil, so if you would use

`itermocil my_file`

You would then use

`echo "hypermocil my_file"`.  This is a hacky way of getting around the SESSION_DATA issue and can easily be fixed by creating an entry in the bash_profile which does this echo, so you can get auto-completion.

All itermocil layouts are supported.  Currently only a single window definition, with up to 9 panes can be specified, and they must use the `-commands` array (no single-line commands yet)

Border colors are also hard-coded at the moment (something I will fix shortly).

Basically, this is like early early early alpha.

The accepted file structure:

`my_config.yml`

```
windows:
  - name: hyperterm
    root: ~/workspace/my_workspace
    layout: even-vertical
    panes:
      - commands:
        - echo "pane 1"
        - echo "again here"
      - commands:
        - echo "pane 2"
        - ls -l
      - commands:
        - echo "pane 3"
      - commands:
        - echo "pane 4"
      - commands:
        - echo "pane 5"
      - commands:
        - echo "pane 6"
```

