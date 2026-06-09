import { getAllDatacenters, getDatacentersFromIds, getNetworksFromIds } from "$lib/server/database.js";
import type { Datacenter, Network, Weather } from "$lib/types";

// const weatherCache: { [key: number]: Weather } = {};

export async function load({ url }) {
    const showDebug: boolean = url.searchParams.get('debug') ? true : false;
    const data64 = url.searchParams.get('data');

    let datacenters: Datacenter[] = [];
    let data;
    let ipData = null;
    let pageUrl: string | undefined;
    let networks: { [key: number]: Network } = {};
    let networksDatacenters = null;

    if (data64) {
        try {
            data = JSON.parse(atob(data64));
            console.log(data);
            datacenters = getDatacentersFromIds(data['facility_ids']);

            const network_list = getNetworksFromIds(data['network_ids']);
            network_list.map(net => networks[net.id] = net);
            networksDatacenters = data['network_datacenters'];
            console.log(networksDatacenters);
            ipData = data['entries'];
            pageUrl = data['pageUrl'];

        } catch (err) {
            console.error(err);
        }
    } else
        datacenters = getAllDatacenters();

    const weatherResults: { [key: number]: Weather } = {};
    // Get weather info
    // const now = Date.now() / 1000;
    // for (const dc of datacenters) {
    //     const { id, lon, lat } = dc;
    //     if (!weatherCache[id] || weatherCache[id].timestamp > now + 60 * 60) {
    //
    //         const params = new URLSearchParams({
    //             latitude: String(lat),
    //             longitude: String(lon),
    //             current: 'weather_code,temperature_2m',
    //             forcast_days: '1'
    //         });
    //
    //         const url = `https://api.open-meteo.com/v1/forecast?${params}`;
    //         console.log(url);
    //
    //         try {
    //             const res = await fetch(url);
    //             const data = await res.json();
    //             const weather: Weather = {
    //                 timestamp: now,
    //                 temp: data.current.temperature_2m,
    //                 weatherCode: data.current.weather_code
    //             }
    //
    //             weatherCache[id] = weather;
    //             weatherResults[id] = weather;
    //         } catch (err) {
    //             console.error(err)
    //             continue;
    //         }
    //
    //
    //
    //     } else {
    //         weatherResults[id] = weatherCache[id];
    //     }
    // }

    return { datacenters, weatherResults, showDebug, ipData, networks, networksDatacenters, pageUrl };
}
