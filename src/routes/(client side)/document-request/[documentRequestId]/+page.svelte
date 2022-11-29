<script>
    /** @type {import('./$types').PageData} */
    export let data;

    const {documentRequest} = data;
    console.log(documentRequest);
</script>

<!-- <h1>{documentRequest.id}</h1> -->
<!-- <pre>
    {JSON.stringify(documentRequest, null, 2)}
</pre> -->

<main class="p-4 w-full h-max flex items-center justify-center">
    <section class="bg-neutral p-4 rounded-xl shadow-xl">
        <small class="w-full flex justify-center mb-5">Request id: {documentRequest.id}</small>
        <p>Full Name: {documentRequest.lastName}, {documentRequest.firstName} {documentRequest.middleName}</p>
        <p>Complete Address: {documentRequest.completeAddress}</p>
        <p>Email Address: {documentRequest.email}</p>
        <p>Phone Number: {documentRequest.contactNo}</p>
        <p>Status:</p><p class:text-info={documentRequest.status=="pending"}> {documentRequest.status}</p>
        <!-- <p>{}</p> -->
    </section>
</main>