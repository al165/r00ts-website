import { ipCompareFn } from "$lib/ip_utils.js";
import { getAllDatacenters, getDatacentersFromIds, getNetworksFromIds } from "$lib/server/database.js";
import type { Datacenter, Network, Entry } from "$lib/types";

function getNetworkIps(entries: { [key: string]: Entry },) {

    const result: { [key: number]: Entry[] } = {};

    if (!entries) return [];

    for (const [ip, entry] of Object.entries(entries)) {
        if (!entry.network_id) continue;

        if (!result[entry.network_id]) result[entry.network_id] = [];

        result[entry.network_id].push(entries[ip]);
    }

    for (const net_id of Object.keys(result))
        result[parseInt(net_id)].sort((a, b) => ipCompareFn(a.ip, b.ip));

    return result;
}

export async function load({ url }) {
    const showDebug: boolean = url.searchParams.get('debug') ? true : false;
    const data64 = url.searchParams.get('data');

    let datacenters: Datacenter[] = [];
    let data: any;
    let entries: { [key: string]: Entry } = {};
    let pageUrl: string | undefined;
    let networks: { [key: number]: Network } = {};
    let networksDatacenters: { [key: number]: number[] } = {};
    let networkIps: { [key: number]: Entry[] } = {};

    if (data64) {
        try {
            data = JSON.parse(atob(data64));

            if (!data.hasOwnProperty('facility_ids'))
                throw new Error('`data` does not contain facility_ids');

            datacenters = getDatacentersFromIds(data['facility_ids']);

            const network_list = getNetworksFromIds(data['network_ids']);
            network_list.map(net => networks[net.id] = net);
            networksDatacenters = data['network_datacenters'];
            entries = data['entries'];
            pageUrl = data['pageUrl'];

            networkIps = getNetworkIps(entries);


        } catch (err) {
            console.error(err);
        }
    } else {
        datacenters = getAllDatacenters();
    }

    return { datacenters, showDebug, entries, networks, networksDatacenters, pageUrl, networkIps };
}
