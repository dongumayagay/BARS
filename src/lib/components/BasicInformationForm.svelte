<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { userStore } from "$lib/stores.js"
    import { db } from "$lib/firebase/client.js"
	import { collection, getDoc, where, query, doc } from 'firebase/firestore';
	// import { onMount } from 'svelte/types/runtime/internal/lifecycle';

    export let isDocumentRequest, isRequestForSomeone;

    let contactInfo = {}
    let authorizedRequestor;
    
    let othersCivilStatus = "";
    let othersNationality = "";
    let autofill;

    const phoneNumberPattern = "^(09|639)+\\d{9}$"

    onMount(()=>{
        if(isDocumentRequest){
            if(!isRequestForSomeone){
                if(!!userStore){
                    autofill = true;
                } 
                if($userStore === null) {
                    autofill = false
                }
            } else {
                autofill = false;
            }
        } 
        if(!isDocumentRequest) {
            if(!!$userStore){
                autofill = true;
            } else {
               autofill = false;
            }
        }
    })

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
    
    // async function authorizedRequestorFullName(){
    //         const getUser = await getDoc(doc(db, "users", $userStore.uid));
    //         const fullName =  getUser.data().lastName + ", " + getUser.data().firstName + " " + getUser.data().middleName??"" + getUser.data().suffix??"";
    //         console.log(fullName)
    //         return fullName; 
    // }
    
    function submitHandler() {
        dispatch("next", {
            contactInfo, 
            authorizedRequestor: authorizedRequestor??""
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
            suffix: "",
            address: "",
            birthdate: "",
            email: "",
            contactNo: "",
            purpose: "",
            civilStatus: "",
            nationality: "",
        }
    }

    $: if(autofill){getUser()} else{emptyForm()}

//  $: console.log(JSON.stringify(contactInfo))
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" 
			integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" 
			crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>


<form class="flex flex-1 flex-col gap-5 h-max " on:submit|preventDefault={submitHandler} on:reset={(event)=>event.target.reset()}>
    {#if isRequestForSomeone}
    <div class="flex flex-col gap-4 flex-1">
        <!-- <label for="lastName" class="label">
            <span class="label-text">Authorized Requester's Full Name</span>
            </label> -->
        <h1 class="font-bold text-center">Authorized Requestor's Full Name</h1>
        <input required title="Please enter your full name" type="text" 
            placeholder="Last Name, First Name, M.I. Suffix"
            class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
            bind:value={authorizedRequestor}
            />
    </div>
    {/if}
    <section>
        <h1 class="font-bold text-center">{isRequestForSomeone ? "Subject's " : ""}Basic Information</h1>
    </section>
    {#if !isRequestForSomeone && !!$userStore}
    <div class="form-control">
        <label class="w-max label cursor-pointer flex gap-2 group">
            <input type="checkbox" class="checkbox checkbox-primary" bind:checked={autofill}/>
            <span class="label-text group-hover:underline">Autofill Form</span> 
        </label>
    </div>
    {/if}
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
            <label for="middleName" class="label">
                <span class="label-text">Suffixes</span>
            </label>
            <input  type="text" title="Disregard if not applicable" id="middleName" name="middleName" placeholder="(optional) Jr, Sr, II, III, IV, etc." class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
            bind:value={contactInfo.suffix}
             />
        </div>
        <div class="flex flex-col flex-1">
            <label for="address" class="label">
                <span class="label-text">Complete Address</span>
              </label>
            <!-- <input required title="Please enter your complete address" type="text" id="address" name="address" placeholder="Brgy. United Bayanihan, San Pedro, Laguna" class="input input-bordered input-md input-primary "
            
             /> -->
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
            <div class="flex flex-col flex-1 relative">
                <label for="birthDate" class="label">
                    <span class="label-text">Birthdate</span>
                  </label>
                <input required title="Please enter your last name" type="date" id="birthdate" name="birthdate" placeholder="Type here" min="1890-01-01" max={todayFormat} class="input input-bordered input-md input-primary w-full bg-transparent focus:border-primary focus:outline-offset-[3px] z-20"
                bind:value={contactInfo.birthdate}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 absolute top-[51%] right-[14px] z-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
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
            <input required title="Please enter a valid phone number format: 09*********" pattern={phoneNumberPattern} type="tel" id="contact" name="contact" minlength="11" maxlength="12" placeholder="09*********" class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
                bind:value={contactInfo.contactNo}
            />
        </div>
        {#if !isDocumentRequest}
            <div class="flex flex-col flex-1 ">
                <label for="purpose" class="label">
                    <span class="label-text">Purpose of the Request</span>
                </label>
                <textarea required class="textarea textarea-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]" placeholder="example: Job Requirement" bind:value={contactInfo.purpose}></textarea>
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
