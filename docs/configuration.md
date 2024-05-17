# Configuration

The configuration file is located at `config.yml` in the installed directory and contains an example configuration with extensive documentation. Below are the essential fields that you need to modify. You can adjust the settings according to your preferences.

```yaml
name: MyShipReader
api: "http://api.example.com:8888"

ship:
  url: "ws://ship.example.com:8080"
```

### General

`name` (`string`) - Name of the talos node.

`api` (`string`) - Nodeos API Endpoint.

`message_codec` (`string`) default: `json`

What codec thalos should use when pushing out messages to redis.

### Ship

`ship.url` (`string`) - Url to the nodeos node.

`ship.chain` (`string`)

name of the chain, if not defined thalos will use the chain id reported from `api`.
This value (or chain_id if undefined) is prepended to channel names, to allow for multiple thalos instances
to run

`ship.irreversible_only` (`boolean`)

If `true`, the ship node will only send transactions once they are considered irreversible.
If `false` the transactions are posted as soon as possible.

`ship.start_block_num` (`integer`)

Thalos will start streaming blocks starting from this one. if undefined, the currect block reported by `api` is used.

`ship.end_block_num` (`integer`)

Thalos will stop streaming when the block number defined by this value will be reached. if undefined thalos will never stop.

### Redis

`redis.addr` (`string`) - Address (and port) to redis server

`redis.user` (`string`) - Username to use when authenticating

`redis.password` (`string`) - Password to use when authenticating

`redis.db` (`integer`) - Database index to use

`redis.prefix` (`string`) - Key prefix, this will be prepended to all channels that thalos is using to avoid name collision

### Logging

This block configures how thalos will log information.

`log.filename` (`string`) - Filename (without extension)

`log.directory` (`string`) - Directory where to store log files.

`log.timeformat` (`dateformat`) - Format to rename log files when rotating

`log.max_filesize` (`integer`) - Rotate when the file reaches this size.

`log.max_time` (`duration_string`) - Rotate when the file is this old.

### Telegram notifications

These settings control the telegram notification mechanism built into thalos.
if undefined thalos will simple skip this.
If they are defined, thalos will send messages when important events happen.

`telegram.id` (`string`) - bot id

`telegram.channel` (`integer`) - channel id to use.


## Datatypes

`string`

A sequence of characters.

`integer`

A valid integer.

`boolean`

Boolean value (`true` or `false`)

`dateformat`

The dateformat type is a `string` but describes a date format in go.

Go uses a different approach then other languages. usually you can format a date like `2023-03-22` like
`YYYY-MM-DD`. Go however uses a **reference time** when parsing time. that is just a single point in time.

    Mon Jan 2 15:04:05 MST 2006

| Format       | Description                                 | Example          |
| ------------ | ------------------------------------------- | ---------------- |
| **Date**     | -                                           | -                |
| `2006`       | Full year                                   | 2018,1989        |
| `06`         | 2-digit year                                | 18, 89           |
| `Jan`        | Three letter word of month                  | Oct, Jun         |
| `January`    | Full name of month                          | April, September |
| `2`          | Day in month without leading zero           | 1 to 31          |
| `02`,`_2`    | Day in moth with leading zero               | 01 to 31         |
| `002`,`__2`  | Day in year                                 | 002              |
| `Mon`        | Three letter word for day in week           | Tue, Fri         |
| `Monday`     | Full name of day in week                    | Friday, Saturday |
| **Time**     | -                                           | -                |
| `15`         | Hour in 24-format                           | 12,23            |
| `3`,`03`     | Hour in 12-format with/without leading zero | 2, 07            |
| `PM`         | AM/PM Mark                                  | AM               |
| `4`,`04`     | Minute with/without leading zero            | 08, 45           |
| `5`,`05`     | Second with/without leading zero            | 01, 59           |
| **Timezone** | -                                           | -                |
| `-0700`      | ±hhmm                                       | -0100            |
| `-07:00`     | ±hh:mm                                      | +04:00           |
| `-07`        | ±hh                                         | +10              |
| `-070000`    | ±hhmmss                                     | +053000          |
| `-07:07:07`  | ±hh:mm:ss                                   | -02:30:12        |
| `MST`        | Named timezone                              | CEST, GMT        |


`duration_string`

A duration string is a possibly signed sequence of decimal numbers, each with optional fraction and a unit suffix, such as `300ms`, `-1.5h` or `2h45m`.

Valid time units are `"ns"`, `"us"` (or `"µs"`), `"ms"`, `"s"`, `"m"`, `"h"`.
