# Contributing

Thanks for helping improve GitHub Profile Booster.

The project is now centered on **goal-aware, evidence-first GitHub profile improvement**. Contributions should make the tools more useful, explainable, safe or accessible — not simply add more decorative widgets.

## Good contributions

- Improve a career-goal scoring heuristic.
- Add a new career lens with a clear rationale.
- Improve repository ranking or freshness logic.
- Make recommendations more precise and less generic.
- Improve README generation without inventing unsupported claims.
- Add badge or stack examples that remain focused and readable.
- Improve profile templates or public-repo ideas.
- Add translations.
- Improve keyboard navigation, accessibility or mobile layouts.
- Add real before/after examples with the owner's permission.
- Fix bugs, unclear wording or broken links.

## Heuristic changes

If you change the Optimizer, Career Signal Map or Audit scoring:

1. Explain **what signal you are trying to measure**.
2. Explain why the new rule is better than the existing one.
3. Avoid treating stars, followers or commit volume as direct measures of engineering ability.
4. Avoid claims about employability, hiring probability or professional competence.
5. Prefer signals that are observable and explainable from public GitHub data.
6. Keep recommendations actionable: a user should understand what they can improve next.

## Evidence-first rules

Generated text should not invent:

- Private projects.
- Experience not visible in public data.
- Technologies not supported by user input or public repositories.
- Stars, followers, contributions or other metrics.
- Job titles or academic credentials that were not supplied or visible.

When evidence is weak, say so instead of filling the gap with confident copy.

## Safety and privacy

- Keep examples safe and generic.
- Do not include private project code.
- Do not include passwords, API keys, tokens, database URLs or personal data.
- Browser tools should avoid collecting or storing form data unless the behavior is explicitly documented.
- Public-profile analysis must stay limited to public information.

## Pull requests

Prefer small pull requests with a clear title.

Explain:

- What changed.
- Who benefits.
- How you tested it.
- Whether scoring or ranking behavior changed.

## Local editing

The project is mostly static HTML, JavaScript, Markdown and SVG, so no build step is currently required.

Before opening a pull request:

- Open changed HTML pages in a browser.
- Test mobile-width layouts when relevant.
- Check browser console errors.
- Test at least one real public GitHub username for analysis changes.
- Verify empty/error states and GitHub API rate-limit messages.
- Check relative links.
- Make sure public badge/image URLs render correctly.
- Read generated Markdown before submitting.
