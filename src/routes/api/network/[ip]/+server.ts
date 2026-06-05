import { json, error } from '@sveltejs/kit';

import { isIP, isIPv6 } from 'net';

import { getNetwork } from '$lib/server/database';
import { isIpReserved, IPtoInt } from '$lib/server/ip_utils.js';

export async function GET({ params }) {

    const { ip } = params;

    if (!ip)
        error(400, 'Missing IP address');

    if (isIP(ip) == 0)
        error(400, 'IP is not valid');

    if (isIPv6(ip))
        error(400, 'IPv6 is not supported');

    const ip_int = IPtoInt(ip);
    if (isIpReserved(ip_int))
        return json({ reserved: true });

    const networkRequest = await getNetwork(ip_int);
    if (!networkRequest.success)
        error(500, networkRequest.reason);

    if (!networkRequest.network?.asn)
        error(500, 'ASN not found for network');

    return json({ network: networkRequest.network, datacenter_ids: networkRequest.datacenter_ids });
}

