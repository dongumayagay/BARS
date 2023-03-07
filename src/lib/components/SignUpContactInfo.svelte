<script>
    import { createEventDispatcher } from 'svelte';

    export let signUpStep;

    const dispatch = createEventDispatcher()

    const today = new Date();
    let dateFormat = today.getDate()
    let monthFormat = (today.getMonth() + 1);

    let othersCivilStatus;
    let othersNationality;

    // the date's number should start with "0" if its value is less than 10 for it to be valid, otherwise the min value will be ignored
    if(dateFormat < 10){
        dateFormat = "0" + dateFormat;
    }

    // the month's number should start with "0" if its value is less than 10 for it to be valid, otherwise the min value will be ignored
    if(monthFormat < 10){
        monthFormat = "0" + monthFormat;
    }
    
    let todayFormat = today.getFullYear() + "-" + monthFormat + "-" + dateFormat;
    
    let contactInfo = {
        lastName: "",
        firstName: "",
        middleName: "",
        suffix: "",
        address: "",
        birthdate: "",
        contactNo: "",
        civilStatus: "",
        nationality: "",
    }
    
    function submitHandler() {
        dispatch("next", {
            contactInfo
        })
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" 
			integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" 
			crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>


<form class="w-[85vw] lg:w-[40vw] h-max bg-neutral flex flex-1 flex-col gap-5 p-4 rounded-xl shadow-lg" on:submit|preventDefault={submitHandler} on:reset={(event)=>event.target.reset()} class:hidden={signUpStep !== 1} on:scroll|stopPropagation>
    <section>
        <h1 class="font-bold text-center">Basic Information</h1>
    </section>
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
            <textarea required title="Please enter your complete address" class="textarea textarea-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]" placeholder="Lot **, Blk **, Brgy. United Bayanihan, San Pedro City, Laguna" bind:value={contactInfo.address}></textarea>
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
        <div class="flex flex-col flex-1">
            <label for="contact" class="label">
                <span class="label-text">Phone Number</span>
              </label>
            <input required title="Please enter your valid phone number" type="tel" id="contact" name="contact" placeholder="09** *** ****" maxlength="11" class="input input-bordered input-md input-primary w-full bg-neutral focus:border-primary focus:outline-offset-[3px]"
            bind:value={contactInfo.contactNo}
              />
        </div>
    </section>
    
    <section class="flex gap-4">
        <button type="submit" class="btn btn-primary flex gap-2">
            <p>Next</p> 
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button type="reset">Clear Form</button>
    </section>
</form>
