<script>
    import InfoForm from "../../../lib/components/InfoForm.svelte";
</script>

<section class="px-4 py-6 lg:px-0">
    <form class="grid grid-cols-1 gap-6 p-4 rounded-lg form-control bg-neutral lg:grid-cols-11">
            <div class="lg:col-span-5">
                <InfoForm />
            </div>
            <div class="lg:col-span-3">

            </div>
            <div class="lg:col-span-3">

            </div>

        <section class="lg:col-span-3">
            <div class="flex gap-3">
                <button type="button"
                    class="btn btn-primary">
                    Validate
                </button>
                <button type="reset"
                    class="hover:underline hover:underline-offset-2">
                    Clear Form
                </button>
            </div>
        </section>

 </form>
</section>