<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<h1>Register</h1>
<form method="post" action="?/register" use:enhance>
	<label>
		Nama
		<input type="text" name="name" placeholder="Masukkan nama" required />
	</label>
	<label>
		Role
		<input type="number" name="role" placeholder="Masukkan role" required />
	</label>
	<label>
		PIN
		<input type="number" name="pin" placeholder="Masukkan PIN 4 angka" maxlength="4" required />
	</label>
	<label>
		Expired Time
		<input type="datetime-local" name="expires_at" required />
	</label>
	<button>Register</button>
</form>
<p style="color: red">{form?.message ?? ''}</p>
