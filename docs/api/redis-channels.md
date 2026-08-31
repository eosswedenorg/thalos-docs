# Redis channels

This document describes the Redis Pub/Sub channels used by Thalos.

## Channel key format

All published channels are namespaced to avoid collisions:

`<prefix>::<chain_id>::<channel-path>`

- `prefix`: defaults to `ship` (config: `redis.prefix`)
- `chain_id`: chain id from API by default, or overridden with `ship.chain`
- `channel-path`: one of the paths below

If no chain id is available, Thalos uses an all-zero fallback chain id internally.

## Channel paths

### Heartbeat

`<namespace>::heartbeat`

Published periodically (every 10 blocks) so subscribers can detect liveness.

### Transactions

`<namespace>::transactions`

Contains `TransactionTrace` messages.

### Actions

Thalos publishes each action trace to up to 4 channels:

- All actions:

  `<namespace>::actions`

- By action name:

  `<namespace>::actions/name/<action>`

- By contract:

  `<namespace>::actions/contract/<contract>`

- By contract + action:

  `<namespace>::actions/contract/<contract>/name/<action>`

### Rollback

`<namespace>::rollback`

Contains `RollbackMessage` messages when microfork rollbacks are detected.

### Table deltas

- All table deltas:

  `<namespace>::tabledeltas`

- Table deltas by SHIP delta name:

  `<namespace>::tabledeltas/name/<name>`

`<name>` is the table delta name received from SHIP (for example `contract_row`,
`contract_table`, `resource_usage`, `resource_limits_state`).

## Notes

- `transactions`, `actions`, and `tabledeltas` output can be enabled/disabled via config/flags.
- If `ship.table_delta_whitelist` is configured, only matching `contract_row` deltas are published.
