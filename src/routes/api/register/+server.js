import { fail } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import * as auth from '$lib/server/auth';

export async function POST(event) {
	const formData = await event.request.json();
	const { name, role, pin, expiredTime } = formData;

	if (!validateName(name)) {
		return fail(400, { message: 'Nama tidak valid.' });
	}
	if (!validateRole(role)) {
		return fail(400, { message: 'Role tidak valid.' });
	}
	if (!validatePin(pin)) {
		return fail(400, { message: 'PIN harus terdiri dari 4 angka.' });
	}
	if (!validateExpiredTime(expiredTime)) {
		return fail(400, { message: 'Expired Time tidak valid.' });
	}

	const userId = uuidv4(); // Generate a unique user ID using UUID

	try {
		// Convert expiredTime to a Date object
		const expiresAt = new Date(expiredTime);

		// Simpan pengguna baru tanpa hashing PIN
		await db.insert(table.user).values({ id: userId, name, role, pin, expiresAt }); // Simpan pengguna baru
		// const sessionToken = auth.generateSessionToken();
		// const session = await auth.createSession(sessionToken, userId);
		// auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} catch (e) {
		console.error(e); // Log kesalahan untuk debugging
		return fail(500, { message: 'Terjadi kesalahan saat mendaftar.' });
	}

	return new Response(JSON.stringify({ message: 'Pendaftaran berhasil!' }), { status: 201 });
}

// Validasi fungsi tetap sama
function validateName(name) {
	return typeof name === 'string' && name.length > 0; // Validasi nama
}

function validateRole(role) {
	return typeof role === 'string' && role.length > 0; // Validasi role
}

function validatePin(pin) {
	return (
		typeof pin === 'string' &&
		pin.length === 4 &&
		/^\d{4}$/.test(pin) // Memastikan PIN terdiri dari 4 angka
	);
}

function validateExpiredTime(expiredTime) {
	const date = new Date(expiredTime);
	return !isNaN(date.getTime()) && date > new Date(); // Memastikan expired time valid dan di masa depan
}
