# ACL

Redis ACLs let you control **which commands** and **which channels/keys** each user can access.
For Thalos, this is the main way to safely separate:

- subscriber access (read from Thalos channels)
- server access (publish messages + state/cache reads/writes)

## Recommended user model

For a simple setup, use two users:

- `default` (or `thalos-client`) for subscribers
- `thalos` for thalos-server

::: warning IMPORTANT
Use strong passwords. `ACL GENPASS` is recommended:
<https://redis.io/docs/latest/commands/acl-genpass/>
:::

## Example ACL rules

Update `ship::*` if you use a different `redis.prefix`.

```conf
user default on >client_password resetkeys resetchannels &ship::* -@all +@connection +subscribe +psubscribe +unsubscribe +punsubscribe
user thalos on >server_password resetkeys resetchannels ~ship::* &ship::* -@all +@connection +get +set +publish
```

### Why both `~...` and `&...`?

- `~pattern` controls key access
- `&pattern` controls Pub/Sub channel access

They are separate controls in Redis ACL.

## External ACL file

Store ACL rules in a dedicated file, then reference it from `redis.conf`:

```conf
aclfile /etc/redis/users.acl
```

## Thalos tooling

Thalos includes an ACL helper:

```sh
thalos-tools redis-acl
```

You can customize generated users/prefix with flags such as:

- `--server`
- `--client`
- `--prefix`
- `--cleartext`

Review generated rules before applying them in production.

## Verify permissions

Test that subscriber credentials can only access allowed channels:

```sh
redis-cli --user default --pass client_password
```

Then try:

- `SUBSCRIBE ship::1234::actions` ✅
- `SUBSCRIBE some_other_prefix::1234::actions` ❌ (`NOPERM` expected)
- `SET random_key value` ❌ (`NOPERM` expected)

## Thalos config

After ACL setup, configure thalos-server with the server user:

```yaml
redis:
  user: thalos
  password: server_password
```

## Useful links

- [Redis ACL documentation](https://redis.io/docs/latest/operate/oss_and_stack/management/security/acl/)
- [ACL SETUSER command](https://redis.io/docs/latest/commands/acl-setuser/)
- [ACL CAT command](https://redis.io/docs/latest/commands/acl-cat/)
- [Redis Pub/Sub](https://redis.io/docs/latest/develop/pubsub/)
