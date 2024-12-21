# Configuration

The configuration file is located at `config.yml` in the installed directory and contains 
an example configuration with extensive documentation. 
Below are the essential fields that you need to modify. 
You can adjust the settings according to your preferences.

```yaml
name: MyShipReader
api: "http://api.example.com:8888"

ship:
  url: "ws://ship.example.com:8080"
```

There is also the option to configure Thalos via command line flags.
See [this](running-the-server#cli-flags) section for more inforation

### General

`name` ([`string`](#string)) - Name of the talos node.

`api` ([`string`](#string)) - Nodeos API Endpoint.

`message_codec` ([`string`](#string)) default: `json`

What codec thalos should use when pushing out messages to redis.

### Ship

`ship.url` ([`string`](#string)) - Url to the nodeos node.

`ship.chain` ([`string`](#string))

name of the chain, if not defined thalos will use the chain id reported from `api`.
This value (or chain_id if undefined) is prepended to channel names, to allow for multiple thalos instances
to run

`ship.irreversible_only` ([`boolean`](#boolean))

If `true`, the ship node will only send transactions once they are considered irreversible.
If `false` the transactions are posted as soon as possible.

`ship.table_deltas` ([`boolean`](#boolean))

If set to `true` thalos will publish table deltas updates to clients.

`ship.start_block_num` ([`integer`](#integer))

Thalos will start streaming blocks starting from this one. if undefined, the currect block reported by `api` is used.

`ship.end_block_num` ([`integer`](#integer))

Thalos will stop streaming when the block number defined by this value will be reached. if undefined thalos will never stop.

`ship.blacklist` ([`ContractList`](#contractlist))

List of contract,actions pairs that Thalos will not process if encountered.

`ship.blacklist_is_whitelist` ([`boolean`](#boolean))

Thalos will treat `ship.blacklist` as a whitelist.

### Redis

`redis.addr` ([`string`](#string)) - Address (and port) to redis server

`redis.user` ([`string`](#string)) - Username to use when authenticating

`redis.password` ([`string`](#string)) - Password to use when authenticating

`redis.db` ([`integer`](#integer)) - Database index to use

`redis.prefix` ([`string`](#string)) - Key prefix, this will be prepended to all channels that thalos is using to avoid name collision

### Cache

These settings control the cache used by Thalos to cache abi definitions and internal state.

`cache.storage` ([`string`](#string) default: `redis`) - Cache storage to use.

Avaible values are: `memory`, `redis`

`cache.options` (`map`) - Options for the cache storage, see section for each cache storage.

#### Memory

No configuration.

#### Redis

`cache.options.stats` ([`boolean`](#string) default: `false`) - True if statistics should be collected

`cache.options.size` ([`number`](#string) default: `1000`) - How many items to store in process local memory for faster lookup of popular items

`cache.options.ttl` ([`number`](#string) default: `10`) - How long (in minutes) each item should be kept in process local memory before being discared (and has to be fetched from redis again.)

### Logging

This block configures how thalos will log information.

`log.filename` ([`string`](#string)) - Filename (without extension)

`log.directory` ([`string`](#string)) - Directory where to store log files.

`log.timeformat` ([`dateformat`](#dateformat)) - Format to rename log files when rotating

`log.max_filesize` ([`integer`](#integer)) - Rotate when the file reaches this size.

`log.max_time` ([`duration_string`](#duration-string)) - Rotate when the file is this old.

### Telegram notifications

These settings control the telegram notification mechanism built into thalos.
if undefined thalos will simple skip this.
If they are defined, thalos will send messages when important events happen.

`telegram.id` ([`string`](#string)) - bot id

`telegram.channel` ([`integer`](#integer)) - channel id to use.


## Datatypes

### string

A sequence of characters.

### integer

A valid integer.

### boolean

Boolean value (`true` or `false`)

### dateformat

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


### duration_string

A duration string is a possibly signed sequence of decimal numbers, each with optional fraction and a unit suffix, such as `300ms`, `-1.5h` or `2h45m`.

Valid time units are `"ns"`, `"us"` (or `"µs"`), `"ms"`, `"s"`, `"m"`, `"h"`.

### ContractList

A array of contract and actions pairs.

Keys (contracts) are of type [`string`](#string) and values are an array of [`string`](#string) (one or more actions).

Action array can hold a special string `*` that matches any action.

The special contract `"*"` matches all contracts. 

**example**:

```yaml
mycontract: [ action1, action2 ]
# or
mycontract:
  - action1
  - action2

# To target all actions on a contract:
mycontract: [ "*" ]

# Matches the transfer and refund actions for all contracts
"*": [ transfer, refund ]
```
