import { json } from '@sveltejs/kit';

export function GET({ request, getClientAddress }) {
    return json({
        clientAddress: getClientAddress(),
        headers: Object.fromEntries(request.headers)
    });
}
