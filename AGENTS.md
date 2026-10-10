<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the landscaping home page in the index route, with semantic styling centralized in src/styles.css; this preserves the reference layout consistently.
- Keep photographs as regular imported files under src/assets (no Lovable asset pointers); this keeps images working when the site is self-hosted outside Lovable, e.g. on Vercel.
- Until real business details and enquiry delivery are supplied, label photography as inspiration and download enquiry briefs without claiming bookings or message delivery; this avoids fabricated business claims.
- Keep motion in Framer Motion with user reduced-motion support and CSS interaction transitions; this preserves accessibility across page and dialog animations.
- Derive the favicon from the same generated logo used in the header and footer; this keeps brand assets consistent.
