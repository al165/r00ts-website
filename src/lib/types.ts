export interface Article {
    id: number,
    title: string,
    url: string,
    description: string,
    date: number,
};

export interface Network {
    id: number,
    network_name: string,
    organisation_name: string,
    description: string,
    ip_start: string,
    start_int: number,
    ip_end: string,
    end_int: number,
    ip_cidr: string,
    asn: number,
    clues: string,
};

export interface Datacenter {
    id: number,
    fac_id: number,
    identified: boolean,
    name: string,
    lat: number,
    lon: number,
    links: string,
    city: string,
    country_code: string,
    last_update: number,
};
