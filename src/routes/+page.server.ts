import { fail } from '@sveltejs/kit';

import * as database from '$lib/server/database';

export function load() {
    return database.getArticles();
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const title = data.get('title');
        const url = data.get('url');
        let description = data.get('description');

        if (!title)
            return fail(400, { title, url, missing: 'title' });

        if (!url)
            return fail(400, { title, url, missing: 'url' });

        if (!description)
            description = "";
        else
            description = description.toString();

        database.addArticle(title.toString(), url.toString(), description);

        return { success: true };
    }
}
