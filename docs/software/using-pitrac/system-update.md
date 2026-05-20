---
title: System Update
description: Pull the latest PiTrac code from GitHub and rebuild from the browser, without SSH'ing into the Pi.
---

# System Update

The System Update page at `/update` pulls the latest code from GitHub and rebuilds PiTrac from the browser, so you do not need to SSH into the Pi for routine updates. Access it from the main menu (three-dot icon) > **System Update**.

!!! info "Prerequisites"
    The update page only works after PiTrac has been installed via `sudo ./build.sh dev` at least once. That initial install writes `/etc/pitrac/environment` (which tells the web server where the repo and build script live) and installs a sudoers rule that lets the web server run `build.sh dev` without a password. If you visit the page before running the installer, every operation returns an error asking you to run the installer first.

## Status Grid

A grid at the top of the page shows:

- **Current Branch**: the branch currently checked out in the repo.
- **Current Commit**: short hash of `HEAD`.
- **Last Build**: timestamp of the most recent completed build.
- **Last Check**: timestamp of the most recent "Check for Updates" run.
- **Warning** (conditional): appears if the repo has uncommitted local changes or is in detached HEAD state. Updates may fail in these states; commit/stash your changes or check out a branch first.

## Branch Selector and Actions

A **Branch** dropdown lists every remote branch with the relative age of its last commit. The branch currently checked out is marked `(current)`.

Action buttons (context-sensitive):

- **Check for Updates** is always available. Runs `git fetch` against `origin` and counts commits on the selected branch that are not yet in your local `HEAD`.
- **Update & Rebuild** is shown when the selected branch matches the current branch. Enabled only after a check reports new commits. Runs `git pull --ff-only` and then `sudo build.sh dev` (incremental build).
- **Switch Branch & Rebuild** replaces the Update button when you pick a different branch from the dropdown. Checks out the selected branch, pulls, and runs `sudo build.sh dev force` (clean rebuild).
- **Cancel** appears only while an update is in progress. Sends SIGTERM to the build process group and marks the update as cancelled.

Only one check or update can run at a time. Concurrent requests are rejected with an error banner.

## Available Commits

When a check finds new commits on the selected branch, a panel lists each one with:

- Short commit hash
- Commit message
- Author and relative time (e.g., "2 days ago")

## Build Output

Once you start an update, a live build log appears. Lines are color-coded by source prefix:

| Prefix | Source | Typical color |
|--------|--------|---------------|
| `[GIT]` | Output from `git pull` | Git color |
| `[UPDATE]` | Update manager status lines | Highlighted |
| `[BUILD]` | Streaming output from `build.sh` | Default |
| `[ERROR]` | Any failure message | Red |

A **Clear** button blanks the log display (it does not stop the update). Up to 500 log lines are kept server-side; the page polls the last 50 every 1.5 seconds while an update runs.

## What Happens During an Update

1. `git fetch` runs against `origin`. If a branch switch was requested, `git checkout <branch>` runs next.
2. `git pull --ff-only` applies the new commits. If the pull is not fast-forward (e.g., because of local changes), the update fails with a clear error.
3. `sudo build.sh dev` (or `dev force` for a branch switch or forced rebuild) runs. `build.sh` itself restarts the `pitrac-web` service when it finishes.
4. The page notices the server going away and starts polling `/health` (every 1.5 seconds for up to 60 seconds) until the service is back.
5. Once reachable, the page refreshes status and branches and shows **Update complete! Server restarted.**

If the build takes longer than 10 minutes it is killed and the update is marked failed. If you close or reload the tab while a build is running, the build continues on the server. When you reopen the page, it picks up the in-progress state and resumes streaming the log.
