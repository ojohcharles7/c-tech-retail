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

Install **PostgreSQL 18** first (from postgresql.org, accept the defaults —
the installer sets the `postgres` superuser password), install Node.js if you
have not already, then copy this project folder across and run:

```
setup-admin.cmd
```

It **elevates itself**, so a plain double-click is enough — you do not need
right-click → Run as administrator. Add `/S` to run it silently.

It does six things and then starts the server:

1. Verifies `node.exe` and `server.js` are present (edit the `FF_NODE` line at
   the top of the script if Node is somewhere unusual)
2. Stops a POS server that is already running, waits for port 5501 to actually
   clear, and clears a leftover `node.exe` still holding the port
3. Calls `pg-setup.ps1`, which configures PostgreSQL and creates the database
   (see below)
4. Opens TCP 5501 in Windows Firewall on all profiles
5. Registers a **boot-start scheduled task** called `FasterFoodPOS` that runs
   the server as `SYSTEM`, then starts it and waits for port 5501 to answer,
   retrying the start if the scheduler swallows the first request
6. Publishes the current LAN address to `connect.json` and registers the two
   logon tasks described in [What it registers](#what-it-registers)

After this you never start the server by hand again — it comes up with the PC,
before anyone logs in, and the app window opens by itself at every logon.

Every step checks the current state before changing it, so re-running the
script on a working install is safe and reports "already correct".

#### What `pg-setup.ps1` does

Auto-detects the newest PostgreSQL under `C:\Program Files\PostgreSQL`, then:

- sets `listen_addresses = 'localhost'` in `postgresql.conf` (keeps 5432 off
  the LAN) and `trust` for `127.0.0.1` / `::1` in `pg_hba.conf`, backing both
  up into `backups\` first, and restarting the service **only if** something
  actually changed
- creates role `ffapp` and database `fasterfood` owned by it, skipping either
  if it already exists
- restores a dump if you supplied one (see [Move to another PC](#move-to-another-pc))

Run it on its own to preview without changing anything:

```
powershell -ExecutionPolicy Bypass -File pg-setup.ps1 -WhatIfOnly
```

Confirm 5432 is unreachable from the network:

```
netstat -ano | findstr :5432
```

You should see `127.0.0.1` and `[::1]` only, never `0.0.0.0`.

Re-running the script is safe: the firewall rule and the task are both
replaced rather than duplicated.

## Fixed IP

Terminals need a URL that never changes. Do **not** add an extra static IP to
the adapter — reserve the existing address in your router instead. It is the
only approach that does not fight the DHCP server.

1. Open the router admin page at `http://192.168.0.1`.
2. Find **DHCP server → Address reservation / Static lease** (the wording
   varies by brand).
3. Reserve `192.168.0.3` against the host PC's MAC address.
4. Check the DHCP **pool range** first. `192.168.0.3` is inside the default
   range on most routers, so the reservation is what keeps the router from
   handing your address to a different device later.
5. Confirm the reservation took by running `ipconfig` — the address should be
   unchanged after a router reboot.

Terminals then bookmark `http://192.168.0.3:5501` and never touch it again.

If the host is on Wi-Fi and you also want it to survive the router rebooting
before Wi-Fi associates, prefer a **wired** connection for the host PC.

## Requirements

- Node.js on the **host** PC only (`node --version`)
- PostgreSQL 18 on the host, service `postgresql-x64-18` running
- Terminals need nothing installed — just a browser
- All terminals must reach the host on port 5501 (same Wi-Fi/router or
  Ethernet)
- A DHCP reservation for the host address (see **Fixed IP**)

> **Node must be reachable at boot.** This host runs a portable Node install
> from `D:\webapp test run\node.exe` rather than `C:\Program Files\nodejs`.
> That works, but `D:` has to be mounted and ready before the `FasterFoodPOS`
> task fires at startup. If `D:` is a removable or secondary disk, move the
> whole project to a folder on `C:` — a till that only boots when a disk is
> attached is not worth the saving. Update the `FF_NODE` line in
> `setup-admin.cmd` if you do.

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
are missing, and removes the legacy `ff_testkey` / `ff_session` /
`ff_recovery` rows. It runs automatically at startup, so there is no separate
migration step.

`db.js` deliberately does **not** pre-create rows for the 21 keys. A brand new
database is therefore genuinely empty, and the first browser to connect seeds
it: `initStorage()` in `pos.js` fills any key that is absent with
`defaultUsers` / `defaultInventory` / `defaultMenu` / `defaultSettings` and
writes it back through `PUT /api/data/:key`.

> Do not "helpfully" insert `[]` placeholders for these keys. The client only
> seeds a key it finds *missing*, so a placeholder `[]` counts as present and
> suppresses seeding — which leaves a fresh install with no users to log in
> with, no menu and no inventory, and stores `ff_settings` as an empty array
> instead of an object.

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
than 30 days. It dumps as `ffapp`, which owns `app_data` and authenticates via
`trust` on localhost, so it never prompts for a password — important, because
a prompt under Task Scheduler would hang forever.

To schedule it nightly, run once as Administrator:

```
schtasks /create /tn "FasterFood POS Backup" /tr "\"C:\path\to\MY-RETAIL\backup-db.cmd\"" /sc daily /st 02:00 /ru SYSTEM /rl HIGHEST /f
```

Restore by hand (this **overwrites** current data):

```
pg_restore -h 127.0.0.1 -U ffapp -d fasterfood --clean --if-exists --no-owner backups\fasterfood-YYYYMMDD-HHMMSS.dump
```

On a new machine, prefer letting `setup-admin.cmd` do it — see
[Move to another PC](#move-to-another-pc).

`db.json` is no longer written. An old copy is kept in `backups\` purely as an
archive.

## Move to another PC

Moving the live till to a different computer, keeping all data.

### 1. On the OLD computer

```
backup-db.cmd
```

Note the filename it prints, e.g.
`backups\fasterfood-20260926-205017.dump`. Copy **that one file** to the new
PC — a USB stick or a network share. `backups\` is gitignored, so the dump does
not travel through git.

Then **shut the server down** on the old PC. Do this now, not at the end. If
both machines serve at once, terminals silently split across two databases
and the two diverge. Power the old host off once the new one is confirmed
working.

### 2. On the NEW computer

1. Install **PostgreSQL 18** (defaults are fine).
2. Install **Node.js 18 or newer**.
3. Copy the project folder across — clone the repo, or copy the directory.
   You need at least `server.js`, `db.js`, `pos.js`, `pos-1.html`, `style.css`,
   `logo.png`, `log.png`, `find-server.html`, `menu-online.html`,
   `package.json`, `package-lock.json`, `setup-admin.cmd`, `pg-setup.ps1`,
   `connect-info.ps1` and `start-pos.cmd`.
4. Delete `node_modules\` if you copied it, then restore dependencies:
   ```
   npm install
   ```
5. Put the dump next to the project as `restore.dump`, or in
   `backups\install\latest.dump`.
6. Run `setup-admin.cmd` and answer **Y** when offered the restore. It
   elevates itself, so a plain double-click is enough.

It configures PostgreSQL, creates `ffapp` / `fasterfood`, restores the dump,
registers the boot task and the two logon tasks, and starts the server. It
prints the URL terminals should use, detected from the new machine's own
adapter, and the app window opens by itself at every logon.

### 3. Point the terminals at the new PC

The new machine will have a **different IP**. Reserve the new address in the
router and re-enter it on every terminal — or, to keep the existing
`192.168.0.3` URL working, free `.3` in the router first (delete the old
reservation), then reserve `.3` for the new PC's MAC address. DHCP will not
hand out an address you have reserved.

### 4. Verify

```
node e2e-test.js
```

30 checks covering key hydration, a simulated checkout, PostgreSQL durability
and the restore-back step. It expects real data, so it only passes on a
*migrated* install — a brand new empty install will fail the
"real business data intact" checks, which is expected.

Then change the default password. The app ships with `admin` / `123`.

### Rolling back

The old data is still in the dump. To go back, restore that dump on the old PC
the same way. Nothing is lost as long as you keep the file.

## Production (keep the server running)

### One-time install (recommended, no extra software)

Run `setup-admin.cmd` once, as Administrator. It elevates itself, so a plain
double-click is enough. Add `/S` for a silent, unattended run.

```
setup-admin.cmd          # asks before restoring a dump
setup-admin.cmd /S       # silent, keeps any existing data
```

It does the whole job in six steps: check Node.js, stop any running server,
check PostgreSQL, open the firewall port, register the boot task, and publish
the connect address. Re-run it any time — it is safe to run again and repairs
whatever has drifted.

The last run is kept in `install-log.txt`.

### What it registers

Three scheduled tasks, and **no** Startup folder entry:

| Task | Runs as | When | Does |
| --- | --- | --- | --- |
| `FasterFoodPOS` | `SYSTEM` | every boot | `node.exe server.js` on port 5501 |
| `FasterFoodPOS Launcher` | you, **with** admin rights | every logon, 45 s delay | `start-pos.cmd` |
| `FasterFoodPOS App` | you, **without** admin rights | started by the launcher | opens the Edge app window |

The app window is deliberately a **separate, non-elevated** task, so the
browser that shows the POS never runs with administrator rights.

`start-pos.cmd` is the light half of the job. At every logon it:

1. waits for the server to answer on port 5501 (60 s),
2. starts `FasterFoodPOS` itself if the server is not up yet,
3. rewrites `connect.json` with the **current** LAN address,
4. rewrites `Charitech Retail.lnk` in the project folder to match,
5. re-registers `FasterFoodPOS App` with that address and runs it.

Every step is written to `start-pos.log`; a failed step is logged and the
launcher moves on rather than blocking the logon. You can also run
`start-pos.cmd` by hand at any time to redo all of it.

### Scheduled task (details)

The `FasterFoodPOS` task triggers **at startup**, runs as `SYSTEM`, has no
execution time limit, and restarts up to 999 times at 1-minute intervals after
a crash. It is also allowed to start and keep running **on battery power** —
without that, a laptop that is unplugged leaves the task sitting in
`Queued` forever and the server never comes up.

To inspect or control it:

```
schtasks /query /tn "FasterFoodPOS" /v /fo list
schtasks /run   /tn "FasterFoodPOS"
schtasks /end   /tn "FasterFoodPOS"
```

The **Last Run Result** column in Task Scheduler is the place to look when the
server does not come up after a reboot. `0x1` usually means the `node.exe`
path is wrong or its drive was not ready yet. A state of `Queued` with
`0x0` means it never started at all — check the battery setting above.

To re-register it after moving Node or the project, just run
`setup-admin.cmd` again.

> Do not also run `npm start` by hand while the task is running — port 5501 is
> already in use and the second instance will fail to bind.

### NSSM Windows service

Install [NSSM](https://nssm.cc/download), then run once as Administrator. Use
this if you want real service management (stdout/stderr files, `sc depend`).
Skip it if the scheduled task is enough.

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

Note this needs a **Windows service** account to read the project folder. If
your project sits under a user profile (`C:\Users\<you>\...`), either copy it
to a non-profile path such as `C:\FasterFoodPOS` or grant the service account
read access to that folder.

### Alternatives

**pm2**

```
npm i -g pm2
pm2 start server.js --name fasterfood --cwd "C:\path\to\MY-RETAIL"
pm2 save
pm2 startup
```

**Task Scheduler at logon** — same as the default task but triggered on user
logon instead of at startup. The server then stays down whenever nobody is
logged in, which is rarely what you want for a till.

## Network setup on the host

1. Give the host a **fixed address** so the shared URL never changes — see
   [Fixed IP](#fixed-ip). A router DHCP reservation is the recommended way;
   avoid stacking extra static IPs onto the adapter.
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

**Fresh install has no login / empty menu** — the database was seeded with `[]`
placeholders instead of being left empty, so the client's own seeding was
suppressed. See the warning in [Schema](#schema). Clear the placeholders and
reload the page:
```sql
DELETE FROM app_data WHERE key IN ('ff_users','ff_inventory','ff_menu','ff_settings');
```
The next browser to connect re-seeds them with the built-in defaults.

**`pg_restore` fails with "permission denied to create database"** — that is
expected if you run it as `ffapp`. Only `postgres` can create databases;
`pg-setup.ps1` handles this by provisioning as `postgres` and restoring as
`ffapp`.

**`psql` asks for a password during setup** — expected on a fresh install
before `pg_hba.conf` is set to `trust`. Enter the `postgres` superuser
password you chose during the PostgreSQL installer. It is used once, passed via
the environment rather than the command line, and cleared afterwards.

**Server doesn't start after a reboot** — check the task:
```
schtasks /query /tn "FasterFoodPOS" /v /fo list
```
Read **Last Run Result**. `0x1` means the command could not be launched at all,
almost always a wrong `node.exe` path or a drive that was not ready. Fix the
`FF_NODE` line in `setup-admin.cmd` and re-run it. `0x41301` means "task is
currently running", which is what you want to see.

**Server doesn't start, and the task is stuck in `Queued` with `0x0`** — the
task was never allowed to launch. On a laptop this is almost always the
"run only on AC power" setting: Task Scheduler's default blocks a start while
on battery and leaves the task `Queued` indefinitely. `setup-admin.cmd` now
registers the task with `-AllowStartIfOnBatteries -DontStopIfGoingOnBatteries`,
so re-running it fixes this. To confirm the setting on an existing install:
```
schtasks /query /tn "FasterFoodPOS" /xml
```
Look for `DisallowStartIfOnBatteries` and `StopIfGoingOnBatteries` — both
should be absent or `false`.

**Nothing is listening on 5501** — the task never started, or the project
folder moved. Re-run `setup-admin.cmd`.

**The app window does not open at logon** — the launcher keeps its own log:
```
type start-pos.log
```
It records each step and never blocks the logon, so a failed step is safe to
ignore until the next boot. The most common cause is the server not answering
within 60 s, in which case the launcher does not open the app at all rather
than showing a connection error. Check that `FasterFoodPOS` is running first.

**The app opens at the wrong address** — `connect-info.ps1` picks the first
active, non-virtual IPv4 adapter, so on a PC with both Wi-Fi and Ethernet it may
choose the wrong one. Connect to the network the till actually uses, or check
`connect.json` to see what was picked. See [Fixed IP](#fixed-ip).

**Port 5501 already in use** — you are running `npm start` while the
`FasterFoodPOS` task is also running. Stop the manual one:
```
schtasks /end /tn "FasterFoodPOS"
```

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
