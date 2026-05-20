---
title: Logs
description: Real-time log streaming page in PiTrac. Service selection, color-coded display, and download controls.
---

# Logs

The Logs page at `/logs` provides real-time log streaming via WebSocket.

## Controls

**Service selector**: dropdown to choose which service to view logs for:

- **PiTrac Camera 1** streams from the pitrac_lm log file (`~/.pitrac/logs/pitrac.log`).
- **PiTrac Web Server** streams from the systemd journal for the `pitrac-web` unit.

**Connection status** shows whether the log WebSocket is connected.

**Action buttons:**

- **Pause / Resume** toggles log streaming (buffered lines are not lost).
- **Clear** clears the log display and resets statistics.
- **Download** downloads the currently displayed log entries as a `.log` file.

## Log Display

Log entries are color-coded based on content:

| Content pattern | CSS class | Typical color |
|----------------|-----------|---------------|
| `ERROR` or `[error]` | `error` | Red |
| `WARN` or `[warning]` | `warning` | Yellow/amber |
| `INFO` or `[info]` | `info` | Blue |
| `DEBUG` or `[debug]` | `debug` | Gray |

The viewer auto-scrolls to the latest entry unless paused. A maximum of 2000 lines are kept in the buffer; older entries are removed.

## Statistics

A stats bar at the bottom of the log viewer shows:

- **Lines**: total number of log entries received.
- **Errors**: count of error-level entries.
- **Warnings**: count of warning-level entries.
