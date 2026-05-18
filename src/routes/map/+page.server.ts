export function load() {

    // TODO: load from database
    const datacentersGeoJson = {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'properties': {
                        'description': '<strong>A datacenter is here</strong>',
                        'url': 'img1.png'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [4.9508, 52.3571]
                    }
                },
                {
                    'type': 'Feature',
                    'properties': {
                        'description': '<strong>Equinix AM3 - Amsterdam, Science Park</strong><p>Equinix, Inc.</p><p></p>',
                        'url': 'img2.png'
                    },
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [4.9614, 52.3546]
                    }
                }
            ]
        }
    }

    return datacentersGeoJson;
}
