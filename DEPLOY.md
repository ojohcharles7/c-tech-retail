# FasterFood POS — Local Network Deployment

This app runs as a small Node.js server. One PC (the **host**) stores all
data in a single `db.json` file and serves the app to every other machine
on your local network.

## Quick start (development / testing)

```bash
npm start
```

Open one of the printed addresses:
- On the host itself: `http://localhost:5501`
- From other terminals on the same network: `http://<HOST-IP>:5501`

The first time you log in, defaults (users/inventory/menu) are seeded into
`db.json`. Every terminal now shares the same data in real time.

## Requirements

- Node.js installed on the **host** PC only (`node --version`)
- Terminals need nothing installed — just a browser
- All terminals must be able to reach the host over the network
  (same Wi-Fi/router or Ethernet, or routed VLANs)

## Production (keep the server running)

### Option A — Windows service via NSSM (recommended)

Install [NSSM](https://nssm.cc/download), then run once:

```
nssm install FasterFoodPOS "C:\Program Files\nodejs\node.exe" "C:\path\to\CHARITECH RETAIL 02\server.js"
nssm set FasterFoodPOS AppDirectory "C:\path\to\CHARITECH RETAIL 02"
nssm set FasterFoodPOS AppStdout "C:\path\to\CHARITECH RETAIL 02\server.log"
nssm set FasterFoodPOS AppStderr "C:\path\to\CHARITECH RETAIL 02\server.err.log"
nssm set FasterFoodPOS Start SERVICE_AUTO_START
nssm start FasterFoodPOS
```

Starts at boot, runs even when no user is logged in, restarts on crash.

### Option B — pm2 process manager

```
npm i -g pm2
pm2 start server.js --name fasterfood --cwd "C:\path\to\CHARITECH RETAIL 02"
pm2 save
pm2 startup
```

### Option C — Task Scheduler at logon

Create a task that runs `node "C:\path\to\server.js"` at logon, working
directory set to the project, with "Restart on failure".

## Network setup on the host

1. Give the host a **static IP** (or a DHCP reservation in your router).
2. **Windows Firewall:** allow inbound TCP on port **5501**:
   ```
   netsh advfirewall firewall add rule name="FasterFood POS" dir=in action=allow protocol=TCP localport=5501
   ```
3. Confirm from another machine: `http://<HOST-IP>:5501`

## Backups

The whole database is one file: `db.json`. Back it up daily:

- Windows Task Scheduler + a simple `copy /Y db.json backup\` batch script
- Or map it to a USB drive / cloud sync folder

## Notes

- Port can be changed with `set PORT=5555` before `npm start`
  (or via NSSM's `AppEnvironmentExtra`). Update terminals accordingly.
- If the server is unreachable, the app falls back to single-machine
  `localStorage` mode so it never blocks a sale.
- Data file: `db.json` — do not edit it while the server is running.
