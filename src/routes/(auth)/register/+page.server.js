import { encodeBase32LowerCase } from '@oslojs/encoding';
import { fail, redirect } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const load = async (event) => {

    if (event.locals.user) {
        return redirect(302, '/');
    }
    return {};
};

export const actions = {
    register: async (event) => {
        const formData = await event.request.formData();
        const name = formData.get('name');
        const role = formData.get('role');
        const pin = String(formData.get('pin'));
        const expires = new Date(formData.get('expires_at'));

        const userId = generateUserId();

        try {
            await db.insert(table.user).values({ id: userId, name, role, pin, expiresAt: expires });

        } catch (e) {
            return fail(500, { message: e.message });
        }
        return redirect(302, '/login');
    }
};

function generateUserId() {
    // ID with 120 bits of entropy, or about the same as UUID v4.
    const bytes = crypto.getRandomValues(new Uint8Array(15));
    const id = encodeBase32LowerCase(bytes);
    return id;
}
