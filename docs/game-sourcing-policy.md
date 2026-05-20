# Game Sourcing Policy

Last updated: 2026-05-20

Coopverse should grow as a curated games portal, not as a random iframe dump. A game can be added only when one of these is true:

- `own`: we own the game or have a direct deployment controlled by us.
- `crazygames`: CrazyGames provides an official Embed button/code for that exact game. Do not hide ads, links, copyright notices, or overlay the iframe.
- `gamedistribution`: we have accepted the GameDistribution publisher agreement and use their official game URL/tags/referrer.
- `gamepix`: we have GamePix consent/publisher access and keep the required `sid` tracking parameter.
- `gamezop`: we have a Gamezop partner ID/API token and use their supplied URLs/assets.
- `famobi`: we have a Famobi website/Affiliate ID or written approval for the domain.
- `itch`: the creator or itch.io page exposes the official widget/embed for that project.
- `direct`: we have written permission from the rights holder or the game operator for Coopverse to embed the game.
- `manual`: temporary review state only. Do not keep public games here long term.

Do not add games by scraping game files, hotlinking private CDN URLs, copying screenshots without a license, bypassing frame protections, removing ads, hiding provider branding, or embedding a game from a random domain just because it loads in an iframe.

Before publishing a third-party game:

1. Save the provider/source in the admin `source` field.
2. Use an official thumbnail/asset URL only when the provider grants that right, or create our own simple neutral thumbnail.
3. Write original Spanish and English descriptions. Do not copy provider text verbatim.
4. Confirm the game page has a real detail page, working play URL, correct player count, categories, and no placeholder assets.
5. If the source is `direct`, keep a note outside git with the permission email/date/contact.

SEO rule: add games in small batches with useful category coverage. A large batch of thin iframe pages can hurt quality signals, crawl budget, AdSense review, and user trust.

Current direct-permission backlog after the 2026-05-20 CrazyGames migration:

- `sketchful-io`: needs written permission from Sketchful or a documented official embed.
- `territorial-io`: needs written permission from Territorial.io or a documented official embed.
- `zombs-io`: needs written permission from Zombs.io or a documented official embed.

Permission request template:

> Hi,
>
> I run Coopverse (https://www.coopverse.io), a curated browser-games portal focused on co-op and multiplayer games.
>
> I would like to include [GAME NAME] in the catalog. Would you allow Coopverse to embed the game on its game page using an iframe or your preferred official embed URL, and to use the game name and a thumbnail/logo for the listing?
>
> The game would remain hosted by you or your official provider. Coopverse would not modify the game, hide branding, block ads, or claim ownership. The page may contain Coopverse navigation and ads around the catalog page.
>
> If you prefer a specific embed URL, thumbnail, attribution text, or if embedding is not allowed, please let me know.
>
> Thanks,
> David
