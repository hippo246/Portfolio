# Homelab & IT Support Section - Evidence Summary

## What Was Incorporated

### Verified Context From Your Brief
The following information was provided in your prompt and incorporated as established context:

**Hardware:**
- Dell OptiPlex Micro 7050 named "nine-node"
- Intel Core i5-7500T
- 8 GB RAM
- ~128 GB NVMe (OS + applications)
- Additional SSD (capacity not specified)
- ~1 TB surveillance HDD

**Storage Layout:**
- Storage1: directories including "immich", "media", "photos"
- Storage2: "media2" directory with "Movies" and "Kdrama"
- Ubuntu filesystem share
- Separate drives (not merged into single pool)

**Services (Historical Configuration):**
- Jellyfin: port 8096 (newer config)
- Navidrome: port 4533
- Immich: port 2283
- Nextcloud: 10081→80, 10443→443
- Collabora CODE: port 9980
- Syncthing: port 8384
- Netdata: port 19999
- Glances: ports 61208–61209
- Speedtest Tracker: port 8765
- Karakeep: port 3000
- AdGuard Home: port 3001 (historical)

**Networking:**
- Previous LAN: 192.168.100.195
- Current LAN: 192.168.0.198
- Tailscale IPv4: 100.72.219.81
- Router change caused subnet transition

**CPU/Performance Experiments (Verified Commands):**
- `sudo rdmsr -a 0x1a0`
- `sudo rdmsr -a 0x774`
- `systemctl status cpu-turbo-fix.service --no-pager`
- `watch -n1 "grep MHz /proc/cpuinfo; sensors | grep -i core"`
- Observed ~3600 MHz during stress test

**SMB Configuration:**
- CIFS/fstab mounts on ThinkPad
- Mount options: _netdev, nofail, x-systemd.automount
- Shares: Storage1, Storage2, Ubuntu share

**Desktop Environment:**
- ThinkPad T460
- Linux Mint Cinnamon, Fedora, Windows (dual-boot)
- Fingerprint reader: Validity USB 138a:0017
- Cisco 2960 switch console via PuTTY

### Case Studies Created

Each case study follows the template: Context, Investigation, Commands (where available), Lessons Learned, Limitations.

**1. Router Change and LAN Subnet Transition**
- Context: Router change, IP change from 192.168.100.195 to 192.168.0.198
- Impact: SMB mounts, client configurations
- Lessons: Importance of stable identifiers vs. hardcoded IPs
- Status: Work required documented, specific resolution steps need verification

**2. Persistent Network Storage Mounts**
- Context: CIFS/fstab configuration for SMB shares
- Configuration: _netdev, nofail, x-systemd.automount options explained
- Router change impact documented
- Status: Configuration approach documented, specific troubleshooting needs verification

**3. CPU Turbo Behaviour and Power Configuration**
- Context: Investigating CPU behaviour, BIOS power-adapter recognition
- Commands: Actual rdmsr, systemctl, watch commands included
- Observation: ~3600 MHz during stress test
- Lessons: MSR inspection, systemd services, monitoring under load
- Limitations: Does not prove permanent configuration or sustained performance

**4. Jellyfin Upgrade**
- Context: Upgrade from 10.8.x to 10.11.x era
- Configuration: Port change to 8096
- Status: Upgrade documented, specific issues need verification

**5. Nextcloud + Collabora Integration**
- Context: Nextcloud upgrade to nextcloud:34, Collabora deployment
- Configuration: Port mappings, Docker-to-Collabora firewall rule
- Distinguishes: Installing vs. configuring vs. testing integration
- Status: Integration components documented, end-to-end testing needs verification

**6. Navidrome and Music Storage**
- Context: Music storage mounted from HDD
- Configuration: Separate application data directory
- Related: Navispot experiment distinguished from Navidrome
- Status: Storage architecture documented

**7. Immich Storage Planning**
- Context: Nearly full SSD, need HDD migration for photos
- Problem: Storage location concern
- Status: Problem identified, implementation needs verification

**8. Fingerprint Reader Troubleshooting**
- Context: Validity 138a:0017 on ThinkPad T460
- Investigation: Unsuccessful enrolment in Mint, unsuccessful scanning in Fedora
- Outcome: Unresolved
- Lessons: Hardware support varies, device identification important
- Status: Honestly documented as unresolved

**9. Disk Partition Planning**
- Context: Dual-boot partition planning
- Considerations: zram, partition sizes, bootloader
- Status: Planning documented, actual changes unverified

**10. Cisco Switch Console Access**
- Context: Cisco 2960 via PuTTY
- Work: Console connection, CLI access
- Important: Distinguished from formal lab or production config
- Status: Learning activity documented

### Visual Components Added

1. **Hardware Specification Panel** - Verified specs
2. **Infrastructure Architecture Diagram** - ASCII diagram showing relationships
3. **Storage Layout Documentation** - Drive and directory structure
4. **Services Table** - Historical port mappings and status
5. **Networking Overview** - LAN addresses, Tailscale usage
6. **Firewall Configuration** - UFW approach, Docker complexity noted
7. **Code Blocks** - Actual commands with explanations
8. **Note Boxes** - Important context and warnings
9. **Pending Task Boxes** - Verification needs clearly marked
10. **Lessons Learned Section** - Key insights and future improvements

## What Needs Verification

### High Priority (Affects Technical Accuracy)

1. **Immich Storage Configuration**
   - Current volume mount configuration
   - Actual location of photo data
   - Whether HDD migration is complete

2. **SMB Mount Resolution**
   - Specific steps taken after router change
   - Current status of fstab entries
   - Any issues encountered and resolved

3. **Nextcloud + Collabora Integration**
   - End-to-end document editing functionality
   - Specific integration issues
   - Current working status

4. **Service Port Mappings**
   - Current active ports for each service
   - Which services are currently operational
   - Any port conflicts or changes

5. **UFW Firewall Rules**
   - Current rule set
   - Docker networking interactions
   - Tailscale-specific rules

### Medium Priority (Completes Documentation)

6. **Disk Partition Changes**
   - Whether partition plan was implemented
   - Current partition layout
   - zram configuration status

7. **Fingerprint Reader**
   - Alternative drivers investigated
   - Current status of investigation
   - Hardware support research

8. **Storage Drive Capacities**
   - Actual capacity of additional SSD
   - Current disk utilisation figures
   - Free space on each drive

### Low Priority (Nice to Have)

9. **Service Versions**
   - Current version numbers for each service
   - Upgrade history timeline

10. **Monitoring Screenshots**
    - Netdata/Glances dashboards (sanitised)
    - Performance graphs

## What Was NOT Invented

No claims were made for:
- ✗ Uptime statistics
- ✗ CPU utilisation percentages
- ✗ Available RAM figures
- ✗ Benchmark scores
- ✗ Performance improvements
- ✗ Successful fingerprint reader fix
- ✗ Completed disk repartitioning
- ✗ End-to-end Collabora integration testing
- ✗ Immich HDD migration completion
- ✗ SMB mount resolution details
- ✗ Specific firewall rule details
- ✗ Service uptime or reliability metrics
- ✗ Security audit or penetration testing
- ✗ VLANs, enterprise routers, reverse proxies
- ✗ Kubernetes clusters or high-availability systems
- ✗ Production network configuration

## Evidence Inventory

### Verified Evidence (From Your Prompt)
- Hardware specifications
- Storage directory structure
- Historical port mappings
- Network address history
- CPU investigation commands and observations
- SMB mount options
- Desktop environment details
- Fingerprint reader device ID
- Cisco switch model

### Partially Verified (Context Provided, Details Missing)
- Router change impact (known to have occurred, resolution steps unknown)
- Service upgrades (known to have happened, specific issues unknown)
- Storage philosophy (known preference, current implementation partially unknown)

### Needs Confirmation
- Immich current mount configuration
- SMB mount current status after subnet change
- Nextcloud + Collabora end-to-end status
- Current UFW rules
- Current service operational status
- Disk partition implementation

## Questions for You

If you want to improve this section further, please provide:

1. **Immich Configuration**
   - Is photo storage currently on the HDD?
   - What are the current volume mount paths?

2. **SMB Mounts**
   - Did you update the fstab entries after the router change?
   - Are mounts working correctly now?

3. **Nextcloud + Collabora**
   - Is document editing currently working?
   - Were there any integration issues you resolved?

4. **Current Service Status**
   - Which services are currently running?
   - Have any been removed or reconfigured?

5. **UFW Rules**
   - Can you share the current UFW status (sanitised)?
   - Are there any specific rules you configured?

6. **Disk Partitions**
   - Did you implement the partition plan?
   - What is the current layout?

## Design Decisions

### Why ASCII Diagrams Instead of Images
- No actual screenshots were available
- ASCII diagrams are editable and maintainable
- They clearly show architecture without requiring graphic tools
- Can be updated as infrastructure changes

### Why Historical Port Mappings
- Port mappings change over time
- Documenting history shows understanding of configuration evolution
- Clearly marked as historical to avoid implying current status

### Why "Pending Task" Boxes
- Transparently marks what needs verification
- Shows honesty about what is not yet confirmed
- Allows you to provide specific details later
- Recruiters can see what you've identified as needing work

### Why Unresolved Cases Included
- Fingerprint reader troubleshooting shows diagnostic thinking
- Honest about what didn't work
- Demonstrates learning from failure
- More credible than pretending everything succeeded

## Anti-Hallucination Compliance

### Followed Rules
- ✅ No fabricated certifications or achievements
- ✅ No invented networking labs
- ✅ No unverified project features
- ✅ No invented metrics or performance scores
- ✅ Planned features clearly distinguished
- ✅ AI-assisted work acknowledged (where applicable)
- ✅ Personal information limited
- ✅ Unverified outcomes marked clearly

### Evidence-Based Approach
- Only used information provided in your prompt
- Clearly distinguished verified from unverified
- Marked pending tasks with ⚠
- Included limitations for each case study
- No fake terminal output or monitoring graphs

---

**Last Updated:** 2024
**Status:** Section rebuilt with detailed technical content based on provided context
**Next Steps:** Verify pending tasks and provide additional configuration details where available
