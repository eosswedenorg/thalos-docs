---
next:
  text: Configuration
  link: /docs/configuration
---


# Installation

There are several ways to install thalos, via package manager, downloading a pre-built binary or building directly from source.

## Package Managers

* [Debian/Ubuntu based (apt)](/docs/installation/debian)

## Manually

### Bundled binaries

You can get the latest archive package [here](https://github.com/eosswedenorg/thalos/releases/latest)

Simply download using your web browser or via curl:

```shell
curl -Ls https://github.com/eosswedenorg/thalos/releases/download/<version>/thalos-server-<version>-linux-amd64.tar.gz | tar -z --one-top-level=thalos -xvf -
```

::: info
Using curl command above, the files are extracted into the `thalos` subdirectory of the current directory where the command is run.
:::

### Compiling from source

You will need golang version `1.21` or later to compile the source.

#### Compile using make

```shell
make
```

or using go directly if you dont have make installed.

```shell
go build -o build/thalos-server cmd/thalos/main.go
```

#### Install

After building the binary you can install it along with basic config file and start/stop scripts using `install.sh`

```shell
./install.sh /path/to/your/directory/of/choice
```
