# Configure and run the server

The configuration file is located at `config.yml` in the installed directory and contains an example configuration with extensive documentation. Below are the essential fields that you need to modify. You can adjust the settings according to your preferences.

```yaml
name: MyShipReader
api: "http://api.example.com:8888"

ship:
  url: "ws://ship.example.com:8080"
```

## Start using scripts

Start the server using the `start.sh` script.

```shell
./start.sh
```

The logs can be found in `logs` directory (unless specified otherwise in the configuration).

Stopping the server again is as simple as running.

```shell
./stop.sh
```

## Starting Manually

If desired, Thalos can also be started manually for quick configuration testing.

```shell
./bin/thalos-server
```

or if you want to specify another config file then the default

```shell
./bin/thalos-server --config /path/to/thalos.yml
```
