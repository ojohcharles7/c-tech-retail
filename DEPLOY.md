# FasterFood POS — Local Network Deployment (PostgreSQL)

The app runs as a small Node.js server backed by **PostgreSQL**. One PC (the
**host**) runs both the server and the database, and serves the app to every
other machine on your local network.

```
POS terminals  ──HTTP :5501──▶  Host PC
 (browsers)                        ├── server.js   (Node, serves UI + API)
                                   └── PostgreSQL 18 : fasterfood.app_data
                                   pgAdmin 4      (admin GUI, desktop only)
```

Only port **5501** needs to be reachable from the network. Port **5432** is
restricted to `localhost` so the database is never exposed to the LAN.

## Quick start (development / testing)

```bash
npm install
npm start
```

Open one of the printed addresses:
- On the host itself: `http://localhost:5501`
- From other terminals on the same network: `http://<HOST-IP>:5501`

PostgreSQL must be running. It is a Windows service
(`postgresql-x64-18`) set to start automatically.

### First-time host setup

Run once as Administrator:

```
setup-admin.cmd
```

This restarts PostgreSQL (applying `listen_addresses = 'localhost'`) and opens
TCP 5501 in Windows Firewall on all profiles.

## Requirements

- Node.js on the **host** PC only (`node --version`)
- PostgreSQL 18 on the host, service `postgresql-x64-18` running
- Terminals need nothing installed — just a browser
- All terminals must reach the host on port 5501 (same Wi-Fi/router or
  Ethernet)

## Database

| Setting | Value |
|---|---|
| Database | `fasterfood` |
| Table | `app_data` |
| Role | `ffapp` |
| Host / port | `127.0.0.1:5432` |

### Schema

One row per data key. The browser clients still exchange whole JSON values,
so each key is stored as a single `jsonb` document.

```sql
CREATE TABLE app_data (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  version    bigint  NOT NULL DEFAULT 1
);
```

`version` increments on every write. It is used for change detection and is
exposed as the `X-Data-Version` / `ETag` header on `GET /api/data`.

`db.js` creates the table, adds the `updated_at` / `version` columns if they
are missing, seeds any absent data keys with `[]`, and removes the legacy
`ff_testkey` / `ff_session` / `ff_recovery` rows. It runs automatically at
startup, so there is no separate migration step.

### 21 synchronised keys

`ff_users` `ff_inventory` `ff_menu` `ff_sales` `ff_settings` `ff_stock_log`
`ff_audit` `ff_shifts` `ff_voids` `ff_customers` `ff_price_history`
`ff_purchases` `ff_closings` `ff_refunds` `ff_leftovers` `ff_purchase_orders`
`ff_book_orders` `ff_discounts` `ff_promos` `ff_suppliers` `ff_grns`

`ff_session`, `ff_panel`, `ff_report_tab`, `ff_report_period` and
`ff_recovery` are per-terminal browser state and are intentionally **not**
stored in the database.

### Configuration

Overridable with environment variables (defaults shown):

| Variable | Default |
|---|---|
| `PORT` | `5501` |
| `PGHOST` | `127.0.0.1` |
| `PGPORT` | `5432` |
| `PGDATABASE` | `fasterfood` |
| `PGUSER` | `ffapp` |
| `PGPASSWORD` | *(empty — local `trust` auth)* |

## pgAdmin 4

Installed at
`C:\Users\<you>\AppData\Local\Programs\pgAdmin 4\runtime\pgAdmin4.exe`.

Register the server once:

| Field | Value |
|---|---|
| Name | `FasterFood Local` |
| Host | `127.0.0.1` |
| Port | `5432` |
| Maintenance DB | `postgres` |
| Username | `ffapp` |
| Password | *(leave blank — local `trust` auth)* |

Tick **Save password** so it reconnects without prompting.

pgAdmin is an **admin tool only**. It runs on a random local port and no POS
terminal ever connects to it. You can also use `psql` directly:

```
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -h 127.0.0.1 -U ffapp -d fasterfood
```

Handy queries:

```sql
SELECT key, version, updated_at,
       jsonb_array_length(value) AS rows
FROM app_data ORDER BY key;

SELECT key, value FROM app_data WHERE key = 'ff_sales';

SELECT value->>'shopName' FROM app_data WHERE key = 'ff_settings';
```

## Backups

```
backup-db.cmd
```

Writes a timestamped compressed dump to `backups\` and prunes anything older
than 30 days. To schedule it nightly, run once as Administrator:

```
schtasks /create /tn "FasterFood POS Backup" /tr "\"C:\path\to\MY-RETAIL\backup-db.cmd\"" /sc daily /st 02:00 /ru SYSTEM /rl HIGHEST /f
```

Restore (this **overwrites** current data):

```
pg_restore -h 127.0.0.1 -U postgres -d fasterfood -c --clean backups\fasterfood-YYYYMMDD-HHMMSS.dump
```

`db.json` is no longer written. An old copy is kept in `backups\` purely as an
archive.

## Production (keep the server running)

Install [NSSM](https://nssm.cc/download), then run once as Administrator:

```
nssm install FasterFoodPOS "C:\Program Files\nodejs\node.exe" "C:\path\to\MY-RETAIL\server.js"
nssm set FasterFoodPOS AppDirectory "C:\path\to\MY-RETAIL"
nssm set FasterFoodPOS AppStdout "C:\path\to\MY-RETAIL\server.log"
nssm set FasterFoodPOS AppStderr  "C:\path\to\MY-RETAIL\server.err.log"
nssm set FasterFoodPOS Start SERVICE_AUTO_START
nssm set FasterFoodPOS AppExit Default Restart
sc depend FasterFoodPOS postgresql-x64-18
nssm start FasterFoodPOS
```

`sc depend` makes the POS wait for PostgreSQL at boot. The
`AppExit Default Restart` line restarts the server if it ever crashes.

### Alternatives

**pm2**

```
npm i -g pm2
pm2 start server.js --name fasterfood --cwd "C:\path\to\MY-RETAIL"
pm2 save
pm2 startup
```

**Task Scheduler at logon** — run `node server.js` with the working directory
set to the project and "Restart on failure" enabled.

## Network setup on the host

1. Give the host a **static IP** (or a DHCP reservation in your router) so the
   shared URL never changes.
2. **Windows Firewall** — `setup-admin.cmd` adds this. To do it by hand:
   ```
   netsh advfirewall firewall add rule name="FasterFood POS" dir=in action=allow protocol=TCP localport=5501 profile=any
   ```
3. **PostgreSQL must stay off the network.** `postgresql.conf` has
   `listen_addresses = 'localhost'`, so 5432 is not reachable from the LAN.
   Confirm after any restart:
   ```
   netstat -ano | findstr :5432
   ```
   You should see `127.0.0.1` and `[::1]` only — never `0.0.0.0`.
4. From another machine: `http://<HOST-IP>:5501`

If a terminal cannot find the server, `find-server.html` scans the local
subnet for anything answering `/api/info`.

## Behaviour when PostgreSQL is down

The server does **not** crash. It keeps serving the UI and returns HTTP `503`
for `/api/*`, which makes the browser fall back to its single-machine
`localStorage` mode so a sale is never blocked. Writes made in that state are
queued and replayed once the database returns. Reconnection is automatic —
no restart needed.

Check the current state:

```
curl http://localhost:5501/api/data
```

`200` = connected. `503` = offline, terminals are running standalone.

## API

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/data` | All 21 keys (adds `ETag` / `X-Data-Version`) |
| `GET` | `/api/data/:key` | One key |
| `PUT` | `/api/data/:key` | Replace one key (awaited to commit) |
| `GET` | `/api/events` | SSE live updates |
| `POST` | `/api/heartbeat` | Terminal presence |
| `GET` | `/api/systems` | Connected terminal list |
| `GET` | `/api/info` | Server identity (used by `find-server.html`) |
| `GET` | `/menu` | Customer-facing online menu |

> `PUT` only returns `200` after PostgreSQL has committed. A crash mid-sale can
> no longer lose the last few transactions, which was possible with the old
> debounced file write.

## Troubleshooting

**Terminals can't connect** — check the firewall rule, confirm the host IP
hasn't changed, and try `http://<HOST-IP>:5501/api/info` from the terminal
browser. It should return JSON.

**Server says `OFFLINE (API returning 503)`** — PostgreSQL is not reachable.
Check `Get-Service postgresql-x64-18` and look at `server.log`.

**"password authentication failed"** — the `pg_hba.conf` `trust` rule covers
`127.0.0.1` only, which is what the app uses. If you changed the host setting
to a real network address, either revert it to `localhost` or set a
`PGPASSWORD`.

**Duplicate or odd invoice numbers** — invoice sequences are generated in the
browser. The 1.5-second echo-suppression window means two cashiers saving
simultaneously can still collide. Not a database issue; normalise `ff_sales`
into its own table if this becomes a problem.
