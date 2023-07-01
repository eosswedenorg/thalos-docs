---
next:
  text: Configuration
  link: /docs/configuration
---

# Debian

The following documentation assumes that you have already set up a `redis` server, a `leap SHIP` node, and a running `leap API` node.

## 1. Installing the package

### Using Sw/edens apt repository

First, obtain the key.

```sh
sudo apt-get install software-properties-common
curl -sS https://apt.eossweden.org/key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/eossweden-2023.gpg > /dev/null
```

Next, install the package.

#### For bash shell

```shell
sudo apt-add-repository -y "deb [arch=amd64] https://apt.eossweden.org/main `lsb_release -cs` stable"
sudo apt-get install thalos
```

#### For fish shell

```shell
sudo apt-add-repository -y "deb [arch=amd64] https://apt.eossweden.org/main "(lsb_release -cs)" stable"
sudo apt-get install thalos
```

### Manual installation

Alternatively, you can manually install the package by downloading the .deb file from the [latest](https://github.com/eosswedenorg/thalos/releases/latest) release.

```shell
curl https://github.com/eosswedenorg/thalos/releases/download/<version>/thalos_<version>_amd64.deb
sudo apt-get install ./thalos_<version>_amd64.deb
```

## 2. Configuration

The configuration file is located at `/etc/thalos/config.yml` and contains an example configuration with extensive documentation.

See [Configuration](/docs/configuration) for more information

## 3. Starting the Server via systemd

```shell
sudo systemctl enable thalos-server
sudo systemctl start thalos-server
```

After executing these commands, the server should be up and running. You can check the logs at `/var/log/thalos.log` (unless specified otherwise in the configuration), or by running `sudo systemctl status thalos-server`.

### Starting Manually

If desired, Thalos can also be started manually for quick configuration testing or in cases where running systemd is not preferable:

```shell
/usr/bin/thalos-server --config /etc/thalos/thalos.yml
```
