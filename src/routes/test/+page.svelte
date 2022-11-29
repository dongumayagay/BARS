<script>
	import { sendEmail } from '$lib/utils';

	async function clickHandler() {
		const result = await sendEmail({
			to: 'emmanuelcalaycay17@gmail.com',
			subject: 'Test 1',
			html: '<a href="https://bars-git-documents-request-page-dongumayagay.vercel.app/fPNsUHolkZONBSV2yeNX">Click Here</a>'
		});

        console.log(JSON.stringify(result))
        alert("Email sent successfully")
	}
</script>

<button class="btn btn-info" on:click={clickHandler}> send email </button>