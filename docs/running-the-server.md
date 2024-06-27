# Running the server

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

## With systemd

```shell
sudo systemctl enable thalos-server
sudo systemctl start thalos-server
```

After executing these commands, the server should be up and running. You can check the logs at `/var/log/thalos.log` (unless specified otherwise in the configuration), or by running `sudo systemctl status thalos-server`.

> TIP: if you want to modify the arguments passed to thalos-server when starting via systemd, look in the `/etc/sysconfig/thalos-server` file

