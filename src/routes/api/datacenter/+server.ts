import { json, error } from '@sveltejs/kit';

import * as database from '$lib/server/database.js';

export async function GET({ url }) {
    console.log("[GET] api/datacenter");
    let asn = url.searchParams.get('asn');
    let country_code = url.searchParams.get('country_code');
    let level: number = parseInt(url.searchParams.get('level') ?? "");

    if (!asn)
        error(400, "ASN is valid");

    if (!country_code && isNaN(level))
        level = 3;
    else if (country_code && isNaN(level))
        level = 1;

    console.log(asn, country_code, level);

    const result = await database.getDatacenters(asn, country_code, level);

    if (!result.success)
        error(400, result.reason);

    return json({ ok: true, facilities: result.facilities });
}
