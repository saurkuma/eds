# Single-Page Migration to AEM Edge Delivery Services

## How to Turn Off Plan Mode
Plan mode is controlled from your Claude Code interface, not by me. To find and use the toggle:

- **Keyboard shortcut:** Press **`Shift + Tab`** — this cycles through the modes (normal → auto-accept → plan mode). Keep pressing it until the mode indicator no longer says "plan mode."
- **Mode indicator:** Look at the **bottom of your terminal/input box**. When plan mode is on, it shows something like `⏸ plan mode on` or `plan mode`. Pressing `Shift + Tab` changes this label.
- Once the indicator shows normal/execute mode, send any short message (e.g. "go") and I'll immediately begin executing the migration.

> Note: The plan itself is already approved. The only thing blocking execution is the plan-mode toggle still being enabled in your UI. I cannot switch it off from my side — it's a client-side control.

## Overview
Migrate the Squarespace homepage (`https://www.squarespace.com/`) into AEM Edge Delivery Services (EDS). Covers page content, navigation/header, footer, and the original visual design/styling.

**Source URL:** https://www.squarespace.com/
**Scope:** Single page
**Includes:** Page content · Navigation/Header · Footer · Design & styling

## Ready to Execute
The migration workflow is initialized and waiting. Once plan mode is off, execution proceeds through: Project Setup → Identify Page Templates → Page Analysis → Block Generation → Block Mapping → Import Infrastructure → Content Import → (then Design as a separate step).

## Checklist

### Unblock Execution
- [ ] Press `Shift + Tab` in the interface to turn off plan mode
- [ ] Send any message to resume (the approved plan will start running)

### Setup
- [x] Confirm the source page URL — `https://www.squarespace.com/`
- [ ] Project Setup (detect project type, configure block library → `.migration/project.json`)

### Content Migration
- [ ] Identify page templates (`tools/importer/page-templates.json`)
- [ ] Page analysis (sections, sequences, block variants → `migration-work/authoring-analysis.json`)
- [ ] Generate block library (per-page variant code in `blocks/*/`)
- [ ] Block mapping (DOM selectors onto page templates)
- [ ] Generate import infrastructure (parsers + transformers)
- [ ] Run content import (`content/*.plain.html`)

### Navigation / Header
- [ ] Extract header/navigation structure from the source
- [ ] Instrument EDS navigation (desktop, mobile, megamenu)
- [ ] Validate navigation structure and behavior

### Footer
- [ ] Detect and map footer sections
- [ ] Build the EDS footer (desktop + mobile)
- [ ] Validate footer structure and appearance

### Design & Styling
- [ ] Extract design tokens from the source
- [ ] Apply site-level design in EDS
- [ ] Style each migrated block variant to match the original

### Preview & Validation
- [ ] Preview the migrated page locally
- [ ] Visually compare against the original and fix gaps
- [ ] Post-import validation for content completeness
- [ ] Final QA across content, nav, footer, and design

## Notes
- Execution requires **Execute mode** (plan mode off). This plan is already approved; no files have been changed yet.
- The 8 migration tasks are already created and tracked; task #1 is in progress and will continue automatically once plan mode is disabled.
