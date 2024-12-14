<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<h1>Login/Register</h1>
<form method="post" action="?/login" use:enhance>
	<label>
		PIN
		<input type="number" name="pin" placeholder="Masukkan PIN 4 angka" maxlength="4" required />
	</label>
	<button>Login</button>
</form>
<a href="/register">Register</a>
<p style="color: red">{form?.message ?? ''}</p>
