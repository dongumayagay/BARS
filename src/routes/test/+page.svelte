<script>
	import { sendEmail } from '$lib/utils';

	async function clickHandler() {
		const result = await sendEmail({
			to: 'kyleandradebasquena@gmail.com',
			subject: 'Test 1',
			html: '<h1>Hello World</h1>'
		});

        console.log(JSON.stringify(result))
        alert("Email sent successfully")
	}
</script>

<button class="btn btn-info" on:click={clickHandler}> send email </button>