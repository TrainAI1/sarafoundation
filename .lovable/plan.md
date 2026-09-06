## Goal
Remove decorative “vibe-coded” styling across the public site and admin interface while preserving content, navigation, forms, accessibility, and existing functionality.

## Visual cleanup
- Remove every decorative sparkle icon and replace it only where an icon communicates a real action or subject; otherwise use no icon.
- Remove gradient, mesh, glow, glass-card, blurred-orb, floating/bounce, hover-scale, tilted-card, and exaggerated shadow treatments.
- Replace oversized rounded cards and pill-like labels with flatter editorial sections, restrained borders, small corner radii, and square/compact icon treatments.
- Simplify highlighted heading fragments to normal brand-colour text without gradient helper names.
- Standardise buttons, menus, forms, popups, cards, and programme sections around the existing blue/cyan tokens with restrained interaction states.

## Site-wide component changes
- Update the shared design utilities first so repeated cards, buttons, headings, badges, navigation menus, and overlays become consistent everywhere.
- Clean page-specific styling that bypasses shared utilities, including the home carousel, CAP, FLIP, EJP, partnership, donation, contact, volunteer, news, report, success, and admin screens.
- Keep necessary circular shapes for avatars, radio controls, switches, loaders, and icon-only floating actions; these are functional controls rather than decoration.
- Keep meaningful status/rating stars in the admin tools, but remove all sparkle/wand-style decoration.

## Validation
- Scan the codebase again to ensure no sparkle icons, decorative gradients, glass utilities, blurred orbs, glow utilities, or decorative float/scale treatments remain.
- Verify the public home, CAP, FLIP, EJP, news, and admin login views on desktop and mobile for clean layout, readable text, working menus, and no overlap.
- Run the relevant automated checks and fix any regressions introduced by the visual cleanup.
