# Redis channels

This document describes the redis channels used by thalos to deliver messages.

## Namespace

First. all channels have a namespace attached to them. this is done to prevent other application to clash with the keys.

The namespace have the following format: `<prefix>::<chain_id>`

* `prefix` is per default `ship` but can be configured to be something else.
* `chain_id` is the chain's id and is used to separate transactions if multiple chains are setup in the same redis database.

## Transactions

All transactions are posted to the following channel:

`<namespace>::transactions`

## Actions

there is 4 types of channels for actions.

The channel where all actions are posted is:

`<namespace>::actions`

Channel where only specific actions are posted:

`<namespace>::actions/name/<action>`

Channel where only actions on a specific `<contract>` is posted:

`<namespace>::actions/contract/<contract>`

Channel where only `<action>` on a specific `<contract>` is posted:

`<namespace>::actions/contract/<contract>/name/<action>`

## Rollback

Rollback mesages are posted to this channel.

`<namespace>::rollback`

## Table delta

Table deltas are posted to the following channels

All deltas:

`<namespace>::tabledeltas`

Only deltas for a specific type.

`<namespace>::tabledeltas/name/<name>`

`<name>` can be one of

* `account_metadata`
* `contract_table`
* `contract_row`
* `contract_index64`
* `resource_usage`
* `resource_limits_state`