<script>
    import Official from "./Official.svelte";

    const officialsList = [
        {
            name: "Cherilyn Radam", 
            position: "Barangay Captain", 
            facebook: {
                profileName: "Cherilyn Radam",
                link: "https://www.facebook.com/cherilyn.radam"
            }, 
            email: ""
        },
        {
            name: "Ryan Abellar", 
            position: "Barangay Vice Captain", 
            facebook: {
                profileName: "Ryan Bernardo Abellar",
                link: "https://www.facebook.com/ryan.abellar.184"
            }, 
            email: ""
        },
        {
            name: "Robert Dumas", 
            position: "Secretary", 
            facebook: {
                profileName: "Robert Dumas",
                link: "https://www.facebook.com/robert.james.dumas"
            }, 
            email: ""
        },
        {
            name: "John Emmanuel Calaycay", 
            position: "Administrator", 
            facebook: {
                profileName: "Emmanuel Calaycay",
                link: "https://www.facebook.com/mr.gulaman17"
            }, 
            email: "emmanuelcalaycay17@gmail.com"
        }
    ]
</script>

<svelte:head>
    <title>Homepage - Barangay Officials | B.A.R.S.</title>
</svelte:head>

<section class="lg:overflow-y-auto lg:max-h-[70vh] w-full lg:w-[70%] flex flex-col lg:flex-auto gap-6 items-center">
    {#each officialsList as official}
        <Official officialProfile={official}/>
    {/each}
</section>