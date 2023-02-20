<script>
    import { userStore } from "$lib/stores.js"
    import { Timestamp } from "firebase/firestore";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let announcementTitle;
    let announcementContent;
    let filesToUpload = [];
    let linkList;
    let required = true;

    function submitHandler() {
        dispatch("submit", {
            announcementTitle,
            announcementContent,
            filesToUpload,
        })
        announcementTitle = "";
        announcementContent = " ";
        filesToUpload = [];
    }

    function changeHandler(file){
        for (let index = 0; index < file.length; index++) {
            const result = filesToUpload.find((item)=> item.file.name === file[index].name)
            if(result){
                result.file = file[index];
            } else {
                filesToUpload = [...filesToUpload, {file: file[index]}]
            }
            
        }
    }

    function resetHandler(event){
        event.target.reset()
        filesToUpload = [];
    }
    
    function deleteImageHandler(index){
        filesToUpload = filesToUpload.filter((element, elementIndex)=> elementIndex !== index)
    }

    function beforeUnload(event) {
        // Cancel the event as stated by the standard.
        if(!!announcementTitle || !!announcementContent || filesToUpload.length > 0){
        event.preventDefault();
            // Chrome requires returnValue to be set.
            event.returnValue = '';
            // more compatibility
            return '...';
        }
    }

</script>
<svelte:window on:beforeunload={beforeUnload}/>

<form class="flex flex-col gap-4" on:submit|preventDefault={submitHandler} on:reset={resetHandler}>
    <section class="bg-neutral w-full lg:w-full p-4 flex flex-col rounded-xl shadow-lg gap-2">
        <div class="w-full pb-4 flex flex-col border-b-[2px] border-base-100">
            <p class="text-xs lg:text-sm">{Timestamp.now().toDate()}</p>
            <p class="text-xs lg:text-sm">Posted by: {$userStore?.email}</p>
        </div>
        <input type="text" 
            placeholder="Type your title here" 
            class="input input-ghost w-full text-center font-bold text-xl focus:bg-inherit placeholder:text-center placeholder:text-inherit placeholder:opacity-70" 
            bind:value={announcementTitle}
            required />
        <textarea class="textarea textarea-ghost w-full focus:bg-inherit placeholder:text-inherit placeholder:opacity-70" 
            rows="5"   
            placeholder="Type here" 
            bind:value={announcementContent} 
            required
        ></textarea>
        <div class="h-max flex flex-wrap gap-5">
            {#each filesToUpload as savedFile, index}
            <div class="min-w-[150px] w-max relative ">
                <div class="min-w-[150px] w-full flex justify-center group relative">
                    <img src={URL.createObjectURL(savedFile.file)} alt={savedFile.file.name} class="w-max h-[150px]">
                    <button type="button" class="opacity-0 bg-black/50 min-w-[150px] w-full absolute top-0 group-hover:opacity-100 transition-all ease-in duration-100 h-[150px]" on:click={()=>dispatch("viewImage", {url: URL.createObjectURL(savedFile.file), alt: savedFile.file.name})}>
                        <p class="text-neutral">Click to view</p>
                    </button>
                </div>
                <button type="button" class="absolute -top-5 -right-5" on:click={()=>deleteImageHandler(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 hover:scale-110 text-error">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>  
            </div>
            {/each}
            <button type="button" class="w-[150px] h-[150px] bg-base-200 flex flex-col items-center justify-center gap-2 relative">
                <input title="Add Photos" type="file" class="opacity-0 absolute w-full h-full cursor-pointer" accept=".jpg, .jpeg, .png, .gif" multiple on:change={(event)=>changeHandler(event.target.files)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5  text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p class="text-inherit">Add Photo</p>
            </button>
        </div>
    </section>
    <div class="flex gap-2">
        <button type="submit" class="btn btn-success flex gap-2">
            <p>Post</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
        </button>
        <button type="reset" class="btn btn-ghost hover:underline hover:bg-transparent">Reset</button>
    </div>
</form>