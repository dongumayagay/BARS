<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { userStore } from "$lib/stores.js"
    import { db } from "$lib/firebase/client.js"
	import { collection, getDoc, where, query, doc } from 'firebase/firestore';

    let contactInfo = {}
    let guardianInfo = {
        guardianship: undefined,
        mother: undefined,
        father: undefined,
        guardian: undefined,
        parentsRelation: undefined,
    }
    let autofill = false;
    
    let othersCivilStatus = "";
    let othersNationality = "";

    const dispatch = createEventDispatcher()

    const today = new Date();
    let dateFormat = today.getDate()
    let monthFormat = (today.getMonth() + 1);

    // the date's number should start with "0" if its value is less than 10 for it to be valid, otherwise the min value will be ignored
    if(dateFormat < 10){
        dateFormat = "0" + dateFormat;
    }

    // the month's number should start with "0" if its value is less than 10 for it to be valid, otherwise the min value will be ignored
    if(monthFormat < 10){
        monthFormat = "0" + monthFormat;
    }
    
    let todayFormat = today.getFullYear() + "-" + monthFormat + "-" + dateFormat;
    
    
    
    function submitHandler() {
        dispatch("next", {
            contactInfo,
            guardianInfo: {
                guardianship: guardianInfo.guardianship??"",
                mother:  guardianInfo.mother??"",
                father: guardianInfo.father??"",
                guardian: guardianInfo.guardian??"",
                parentsRelation: guardianInfo.parentsRelation??"",
            }
        })
    }

    async function getUser(){
        if(!!$userStore){
            const userCredentials = await getDoc(doc(db, "users", $userStore.uid))
            contactInfo = Object.assign(contactInfo, {
                lastName: userCredentials.data().lastName,
                firstName: userCredentials.data().firstName,
                middleName: userCredentials.data().middleName??"",
                suffix: userCredentials.data().suffix??"",
                address: userCredentials.data().address,
                birthdate: userCredentials.data().birthdate,
                email: $userStore.email,
                contactNo: userCredentials.data().contactNo,
                purpose: "",
                civilStatus: (contactInfo.civilStatus === "others" ? othersCivilStatus : contactInfo.civilStatus),
                nationality: (contactInfo.nationality === "others" ? othersNationality : contactInfo.nationality),
            })
        }
    }

    function emptyForm(){
        contactInfo = {
            lastName: "",
            firstName: "",
            middleName: "",
            address: "",
            birthdate: "",
            email: "",
            contactNo: "",
            purpose: "",
            civilStatus: "",
            nationality: "",
        }
    }

    $: console.log($userStore, contactInfo)
    $: console.log(guardianInfo)

    $: if(autofill){ getUser()} else{emptyForm()}

//  $: console.log(JSON.stringify(contactInfo))
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" 
			integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" 
			crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<form class="flex flex-1 flex-col gap-5 h-max " on:submit|preventDefault={submitHandler} on:reset={(event)=>event.target.reset()}>
    <section>
        <h1 class="font-bold text-center">Child's Basic Information</h1>
    </section>
    <div class="form-control">
        <label class="w-max label cursor-pointer flex gap-2 group">
            <input type="checkbox" class="checkbox checkbox-primary" bind:checked={autofill}/>
            <span class="label-text group-hover:underline">Autofill Form</span> 
        </label>
    </div>
    <section class="flex flex-col gap-4">
        <div class="flex flex-col flex-1">
            <label for="lastName" class="label">
                <span class="label-text">Last Name</span>
                </label>
            <input required title="Please enter your last name" type="text" 
                placeholder="ex: Dela Cruz"
                class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
                bind:value={contactInfo.lastName}
                />
        </div>
        <div class="flex flex-col flex-1">
            <label for="firstName" class="label">
                <span class="label-text">First Name</span>
                </label>
            <input required title="Please enter your first name" type="text" id="firstName" name="firstName" placeholder="ex: Juan" class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
                bind:value={contactInfo.firstName}
             />
        </div>
        <div class="flex flex-col flex-1">
            <label for="middleName" class="label">
                <span class="label-text">Middle Name</span>
            </label>
            <input  type="text" title="Disregard if not applicable" id="middleName" name="middleName" placeholder="(optional)" class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
            bind:value={contactInfo.middleName}
             />
        </div>
        <div class="flex flex-col flex-1">
            <label for="address" class="label">
                <span class="label-text">Complete Address</span>
              </label>
            <textarea required title="Please enter your complete address" class="textarea textarea-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]" placeholder="Lot **, Blk **, Brgy. United Bayanihan, San Pedro City, Laguna" bind:value={contactInfo.address}></textarea>
        </div>
        <div class="group flex flex-col flex-1 ">
            <label for="email" class="label">
                <span class="label-text">Contact Email Address</span>
              </label>
            <input required title="Please enter your valid Email address" type="email" id="email" name="email" placeholder="example@email.com" class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
            bind:value={contactInfo.email}
             />
        </div>
        <section class="flex flex-row gap-2">
            <div class="flex flex-col flex-1 ">
                <label for="birthDate" class="label">
                    <span class="label-text">Birthdate</span>
                </label>
                <input required title="Please enter your last name" type="date" id="birthdate" name="birthdate" placeholder="Type here" min="1890-01-01" max={todayFormat} class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
                bind:value={contactInfo.birthdate}
                />
            </div>
        </section>
        <section>
            <div class="flex flex-col flex-1 ">
                <label for="civilStatus" class="label">
                    <span class="label-text">Civil Status</span>
                </label>
                <div class="w-full flex justify-between gap-2">
                    <select class="select select-bordered focus:bg-transparent border-primary select-ghost" required bind:value={contactInfo.civilStatus}>
                        <option value="Single" selected>Single</option>
                        <option value="Married" >Married</option>
                        <option value="Separated" >Separated</option>
                        <option value="Widowed" >Widowed</option>
                        <option value="others" >Others</option>
                    </select>
                    {#if contactInfo.civilStatus === "others"}
                        <input required type="text" id="specify" class="w-full lg:w-max bg-transparent border-b-2 focus:bg-transparent text-center" placeholder="Please specify" bind:value={othersCivilStatus}>
                    {/if}
                </div>
            </div>
        </section>
        <section>
            <div class="flex flex-col flex-1 ">
                <label for="civilStatus" class="label">
                    <span class="label-text">Nationality</span>
                  </label>
                  <div class="w-full flex justify-between gap-2">
                    <select class="select select-bordered focus:bg-transparent border-primary select-ghost" required bind:value={contactInfo.nationality}>
                      <option value="Filipino" selected>Filipino</option>
                      <option value="others" >Others</option>
                  </select>
                  {#if contactInfo.nationality === "others"}
                    <input required type="text" id="specify" class="w-full lg:w-max bg-transparent border-b-2 focus:bg-transparent text-center" placeholder="Please specify" bind:value={othersNationality}>
                  {/if}
                </div>
            </div>
        </section>
        <div class="flex flex-col flex-1 ">
            <label for="contact" class="label">
                <span class="label-text">Phone Number</span>
            </label>
            <input required title="Please enter your valid phone number" type="tel" id="contact" name="contact" placeholder="09** *** ****" maxlength="11" class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
                bind:value={contactInfo.contactNo}
            />
        </div>
    </section>

    <section>
        <h1 class="font-bold text-center">Guardian/s' Basic Information</h1>
    </section>
    <section class="flex flex-col gap-4">
        <div class="flex flex-col">
            <label for="#guardianship" class="label label-text">Type of guardianship:</label>
            <select id="guardianship" class="select select-ghost select-bordered border-primary bg-transparent" bind:value={guardianInfo.guardianship}>
                <option value="parents" selected>Both Parents</option>
                <option value="singleParent">Single Parent</option>
                <option value="guardian">Guardian</option>
            </select>
        </div>
        {#if guardianInfo.guardianship === "parents"}
            <div class="flex flex-col">
                <label for="#father" class="label label-text">Father's Name</label>
                <input required type="text" id="father" class="input input-ghost input-bordered border-primary bg-transparent" placeholder="Type here" bind:value={guardianInfo.father}>
                <label for="#father" class="label-text-alt text-error">Format: Last Name, First Name, Middle Initial</label>
            </div>
            <div class="flex flex-col">
                <label for="#mother" class="label label-text">Mother's Name (Last Name, First Name, Middle Initial)</label>
                <input required type="text" id="mother" class="input input-ghost input-bordered border-primary bg-transparent" placeholder="Type here" bind:value={guardianInfo.mother}>
                <label for="#mother" class="label-text-alt text-error">Format: Last Name, First Name, Middle Initial</label>
            </div>
        {/if}
        {#if guardianInfo.guardianship === "singleParent"}
        <div class="w-full flex flex-1 gap-1">
            <select id="relation"  class="w-max select select-ghost select-bordered border-primary bg-transparent" bind:value={guardianInfo.parentsRelation}>
                <option value="mother" selected>Mother</option>
                <option value="father">Father</option>
            </select>
            {#if guardianInfo.parentsRelation === "father"}
                <div class="flex flex-col">
                    <!-- <label for="#father" class="label label-text">Father's Name</label> -->
                    <input required type="text" id="father" class="input input-ghost input-bordered border-primary bg-transparent" placeholder="Type here" bind:value={guardianInfo.father}>
                    <label for="#father" class="label-text-alt text-error">Format: Last Name, First Name, Middle Initial</label>
                </div>
            {:else}
                <div class="flex flex-col">
                    <!-- <label for="#mother" class="label label-text">Mother's Name</label> -->
                    <input required type="text" id="mother" class="input input-ghost input-bordered border-primary bg-transparent" placeholder="Type here" bind:value={guardianInfo.mother}>
                    <label for="#mother" class="label-text-alt text-error">Format: Last Name, First Name, Middle Initial</label>
                </div>
            {/if}
        </div>
        {/if}
        {#if guardianInfo.guardianship === "guardian"}
        <div class="flex flex-col">
            <label for="#guardian" class="label label-text">Guardian's Name</label>
            <input id="guardian" class="input input-ghost input-bordered border-primary bg-transparent" bind:value={guardianInfo.guardian}>
            <label for="#guardian" class="label-text-alt text-error">Format: Last Name, First Name, Middle Initial</label>
        </div>
        {/if}
    </section>
    <section class="flex gap-4">
        <button type="submit" class="btn btn-primary flex gap-2">
            <p>Next</p> 
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button type="reset">Clear Form</button>
    </section>
</form>
