# Windows Troubleshooting Section - Update Summary

## Date: January 2026

## Changes Made

### 1. Updated Windows Section Content

**Removed:**
- Empty troubleshooting categories grid (7 category cards with "No cases documented yet")
- Generic tools list (Task Manager, Device Manager, Event Viewer, PowerShell, SFC, DISM)
- Generic case-study placeholders (Dual-Boot Configuration, Fingerprint Reader Investigation)
- Troubleshooting Methodology subsection (7-step process)
- Integration with Broader IT Skills subsection

**Added:**
- Clear statement that experience is informal assistance to friends, not paid employment
- Note that more experience is focused on Windows 11
- Two documented troubleshooting incidents:
  1. Windows 11 Wi-Fi and Bluetooth Icons Disappearing or Not Working
  2. Windows 11 August 2026 Update — KB5121003 (Update Identifier Supplied by User)

**Updated Format:**
- Changed from case-study-heavy presentation to compact incident cards
- Removed formal case-study structure for more practical, concise format
- Added honest notes distinguishing confirmed actions from diagnostic possibilities

### 2. Updated Résumé

**Removed:**
- Unconfirmed tool claims (Command Prompt, PowerShell, Task Manager, Resource Monitor, Device Manager, Event Viewer, SFC, DISM)
- Generic "Application and driver troubleshooting" claim

**Added:**
- "Informal assistance to friends with connectivity and update issues"
- "Windows update recovery (Safe Mode, update uninstallation)"
- Note that Windows 11 is the primary focus

### 3. Updated CSS

**Removed:**
- `.category-grid` and `.category-card` styles (no longer used)
- `.category-status` and `.status-empty` styles (no longer used)

**Added:**
- `.incident-card` styles for compact incident presentation
- `.status-resolved`, `.status-in-progress`, `.status-unresolved` styles

### 4. Created Private Checklist

**New File:** `WINDOWS_INCIDENT_CHECKLIST.md`

**Purpose:** Private document to help user recognise Windows issues they may have actually handled.

**Content:**
- Windows Updates (stuck updates, problems after specific updates)
- System Performance (slow PC, high resource usage, app crashes)
- Networking & Connectivity (Wi-Fi issues, Bluetooth problems, Ethernet issues)
- Hardware & Drivers (device recognition, audio/microphone/camera, driver errors)
- Storage & File Systems (low disk space, drive access, permissions)
- Startup, Boot & Recovery (startup problems, BSOD, system recovery)
- Applications & System Configuration (installation issues, settings problems, services)

**Instructions:**
- Only add incidents genuinely remembered
- Distinguish actual actions from possibilities
- Be specific about tools and steps
- Leave out uncertain details

---

## Documented Incidents

### Incident 1: Windows 11 Wi-Fi and Bluetooth Icons Disappearing or Not Working

**Environment:** Windows 11

**Problem:** Friends experienced Windows 11 connectivity-related problems involving the Wi-Fi and Bluetooth icons disappearing, becoming unavailable, or not working correctly.

**Relevant Diagnostic Areas:**
- Adapter and driver status
- Device Manager
- Windows services
- Network settings
- Whether issue affects connectivity itself or only the interface

**Status:** Resolved

**Honesty Note:** Specific diagnostic steps and fixes used in this incident require confirmation. The areas listed are diagnostic categories relevant to this type of issue, not confirmed actions taken.

### Incident 2: Windows 11 August 2026 Update — KB5121003

**Environment:** Windows 11

**Problem:** Friends' Windows 11 PCs developed serious problems after installing an update they identified as KB5121003, reportedly released in August 2026. Symptoms included games freezing, games closing unexpectedly, and Blue Screen of Death (BSOD) errors.

**Troubleshooting Approach (Confirmed):**
- Identified the reported timing between the update and the symptoms
- Used Safe Mode as a recovery and diagnostic environment
- Uninstalled the problematic update as a recovery measure

**Recommended Post-Recovery Checks (Not Confirmed):**
- Check Windows Update history
- Confirm system stability
- Test whether the original symptoms return

**Status:** Resolved

**Honesty Note:** The KB identifier "KB5121003" was supplied by the user and requires verification against official Microsoft sources before it can be confirmed as accurate. Not claiming the update was definitively responsible for every symptom without verified evidence.

---

## Claims Requiring User Confirmation

### KB5121003 Update Identifier
- **Status:** Supplied by user, not yet verified
- **Action Required:** Verify against official Microsoft Windows Update history
- **If Unverifiable:** Update portfolio to state "Update identifier supplied by user - requires verification"

### Wi-Fi/Bluetooth Incident Specific Steps
- **Status:** Diagnostic areas listed, but specific steps not confirmed
- **Action Required:** Confirm actual diagnostic steps and fixes used
- **If Unknown:** Keep current honest note explaining this

### Post-Recovery Checks for KB5121003 Incident
- **Status:** Listed as recommended, not confirmed as completed
- **Action Required:** Confirm whether Windows Update history was checked, system stability was confirmed, and symptoms were tested after recovery
- **If Unknown:** Keep current "recommended follow-up" wording

---

## What Was Not Changed

- Homelab section (preserved existing content)
- Projects section (preserved existing content)
- Certificates section (preserved existing content)
- Navigation structure (Windows link remains in menu)
- Overall design and styling (maintained consistency)

---

## Build Status

- ✅ Production build successful
- ✅ No CSS errors
- ✅ All pages build correctly
- ✅ File size reduced (removed empty category cards)

---

## Next Steps for User

1. **Verify KB5121003** - Check official Microsoft sources to confirm this update identifier
2. **Review Incident Checklist** - Use `WINDOWS_INCIDENT_CHECKLIST.md` to identify other genuine Windows incidents
3. **Add Confirmed Incidents** - For any additional incidents remembered, add specific details to the portfolio
4. **Remove Confirmation Notes** - Once KB5121003 is verified, update the note in the portfolio
